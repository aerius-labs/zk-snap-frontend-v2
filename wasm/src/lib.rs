use num_bigint::BigUint;
use num_traits::Num;
use serde::{ Deserialize, Serialize };
use tsify::Tsify;
use voter::{ voter_circuit, EncryptionPublicKey, VoterCircuitInput };
use voter_tests::generate_random_voter_circuit_inputs;
use wasm_bindgen::prelude::*;
use std::{ cell::RefCell, rc::Rc };
use halo2_wasm::{
    halo2_base::{ gates::{ circuit::builder::BaseCircuitBuilder, RangeChip }, utils::ScalarField, AssignedValue }, halo2_proofs::halo2curves::ff::PrimeField, halo2lib::ecc::Bn254Fr as Fr, Halo2Wasm
};
#[derive(Tsify, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WasmEncryptionPublicKey {
    pub n: String,
    pub g: String,
}
#[derive(Tsify, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct WasmInput {
    pk_enc: WasmEncryptionPublicKey,
    nullifier: String,
    proposal_id: String,
    vote_enc: Vec<String>,
    vote: Vec<String>,
    r_enc: Vec<String>,
}
impl WasmInput {
    fn parse_fr(hex_str: &str) -> Fr {
        let hex_str = hex_str.strip_prefix("0x").unwrap_or(hex_str);
        let biguint = BigUint::from_str_radix(hex_str, 16).unwrap();
        Fr::from_bytes_le(
            &biguint.to_bytes_le()
        )
    }
    fn parse_biguint(hex_str: &str) -> BigUint {
        BigUint::from_str_radix(&hex_str[2..], 16).unwrap()
    }
    pub fn to_voter_input(&self) -> VoterCircuitInput<Fr> {
        VoterCircuitInput {
            pk_enc: EncryptionPublicKey {
                n: Self::parse_biguint(&self.pk_enc.n),
                g: Self::parse_biguint(&self.pk_enc.g),
            },
            nullifier: Self::parse_fr(&self.nullifier),
            proposal_id: Self::parse_fr(&self.proposal_id),
            vote_enc: self.vote_enc.iter()
                .map(|x| Self::parse_biguint(x))
                .collect(),
            vote: self.vote.iter()
                .map(|x| Self::parse_fr(x))
                .collect(),
            r_enc: self.r_enc.iter()
                .map(|x| Self::parse_biguint(x))
                .collect(),
        }
    }
}
#[wasm_bindgen]
pub struct MyCircuit {
    range: RangeChip<Fr>,
    builder: Rc<RefCell<BaseCircuitBuilder<Fr>>>,
}
#[wasm_bindgen]
impl MyCircuit {
    #[wasm_bindgen(constructor)]
    pub fn new(circuit: &Halo2Wasm) -> Self {
        let builder = Rc::clone(&circuit.circuit);
        let lookup_bits = match builder.borrow_mut().lookup_bits() {
            Some(x) => x,
            None => panic!("Lookup bits not found"),
        };
        let lookup_manager = builder.borrow_mut().lookup_manager().clone();
        let range = RangeChip::<Fr>::new(lookup_bits, lookup_manager);
        MyCircuit {
            range,
            builder: Rc::clone(&circuit.circuit),
        }
    }
    pub fn run_with_input(&mut self, input: WasmInput) {
        let mut builder_borrow = self.builder.borrow_mut();
        let ctx = builder_borrow.main(0);
        let mut public_inputs = Vec::<AssignedValue<Fr>>::new();
        voter_circuit(ctx, &self.range, input.to_voter_input(), &mut public_inputs);
        builder_borrow.assigned_instances[0].extend_from_slice(&public_inputs);
    }
    pub fn run(&mut self) {
        let mut builder_borrow = self.builder.borrow_mut();
        let ctx = builder_borrow.main(0);
        let input = generate_random_voter_circuit_inputs();
        let mut public_inputs = Vec::<AssignedValue<Fr>>::new();
        voter_circuit(ctx, &self.range, input, &mut public_inputs);
        builder_borrow.assigned_instances[0].extend_from_slice(&public_inputs);
    }
}