/* tslint:disable */
/* eslint-disable */
export const __wbg_mycircuit_free: (a: number, b: number) => void;
export const mycircuit_new: (a: number) => number;
export const mycircuit_run_with_input: (a: number, b: any) => void;
export const mycircuit_run: (a: number) => void;
export const __wbg_halo2wasm_free: (a: number, b: number) => void;
export const halo2wasm_new: () => number;
export const halo2wasm_clear: (a: number) => void;
export const halo2wasm_clearInstances: (a: number) => void;
export const halo2wasm_verify: (a: number, b: number, c: number) => void;
export const halo2wasm_getInstances: (a: number, b: number) => [number, number];
export const halo2wasm_setInstances: (
  a: number,
  b: number,
  c: number,
  d: number
) => void;
export const halo2wasm_useInstances: (a: number) => void;
export const halo2wasm_getInstanceValues: (a: number, b: number) => any;
export const halo2wasm_config: (a: number, b: any) => void;
export const halo2wasm_getCircuitStats: (a: number) => any;
export const halo2wasm_getVk: (a: number) => [number, number];
export const halo2wasm_getPartialVk: (a: number) => [number, number];
export const halo2wasm_getPk: (a: number) => [number, number];
export const halo2wasm_assignInstances: (a: number) => void;
export const halo2wasm_mock: (a: number) => void;
export const halo2wasm_loadParams: (a: number, b: number, c: number) => void;
export const halo2wasm_loadVk: (a: number, b: number, c: number) => void;
export const halo2wasm_loadPk: (a: number, b: number, c: number) => void;
export const halo2wasm_genVk: (a: number) => void;
export const halo2wasm_genPk: (a: number) => void;
export const halo2wasm_prove: (a: number) => [number, number];
export const halo2wasm_log: (a: number, b: number, c: number) => void;
export const initPanicHook: () => void;
export const __wbg_bn254fqpoint_free: (a: number, b: number) => void;
export const bn254fqpoint_to_circuit_value_256: (
  a: number,
  b: number
) => number;
export const __wbg_bn254fq2point_free: (a: number, b: number) => void;
export const bn254fq2point_c0: (a: number) => number;
export const bn254fq2point_c1: (a: number) => number;
export const __wbg_bn254g1affinepoint_free: (a: number, b: number) => void;
export const bn254g1affinepoint_x: (a: number) => number;
export const bn254g1affinepoint_y: (a: number) => number;
export const __wbg_bn254g2affinepoint_free: (a: number, b: number) => void;
export const bn254g2affinepoint_x: (a: number) => number;
export const bn254g2affinepoint_y: (a: number) => number;
export const __wbg_secp256k1affinepoint_free: (a: number, b: number) => void;
export const secp256k1affinepoint_x: (a: number) => number;
export const secp256k1affinepoint_y: (a: number) => number;
export const __wbg_jscircuitvalue256_free: (a: number, b: number) => void;
export const __wbg_get_jscircuitvalue256_hi: (a: number) => number;
export const __wbg_set_jscircuitvalue256_hi: (a: number, b: number) => void;
export const __wbg_get_jscircuitvalue256_lo: (a: number) => number;
export const __wbg_set_jscircuitvalue256_lo: (a: number, b: number) => void;
export const jscircuitvalue256_new: (a: number, b: number) => number;
export const __wbg_jscircuitbn254fq2_free: (a: number, b: number) => void;
export const __wbg_get_jscircuitbn254fq2_c0: (a: number) => number;
export const __wbg_set_jscircuitbn254fq2_c0: (a: number, b: number) => void;
export const __wbg_get_jscircuitbn254fq2_c1: (a: number) => number;
export const __wbg_set_jscircuitbn254fq2_c1: (a: number, b: number) => void;
export const jscircuitbn254fq2_new: (a: number, b: number) => number;
export const __wbg_jscircuitbn254g2affine_free: (a: number, b: number) => void;
export const __wbg_get_jscircuitbn254g2affine_x: (a: number) => number;
export const __wbg_set_jscircuitbn254g2affine_x: (a: number, b: number) => void;
export const __wbg_get_jscircuitbn254g2affine_y: (a: number) => number;
export const __wbg_set_jscircuitbn254g2affine_y: (a: number, b: number) => void;
export const jscircuitbn254g2affine_new: (a: number, b: number) => number;
export const halo2libwasm_load_bn254_fq: (a: number, b: number) => number;
export const halo2libwasm_load_bn254_g1: (a: number, b: number) => number;
export const halo2libwasm_bn254_g1_sum: (a: number, b: any) => number;
export const halo2libwasm_bn254_g1_sub_unequal: (
  a: number,
  b: number,
  c: number
) => number;
export const halo2libwasm_load_bn254_g2: (a: number, b: number) => number;
export const halo2libwasm_bn254_g2_sum: (a: number, b: any) => number;
export const halo2libwasm_bn254_pairing_check: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
) => number;
export const halo2libwasm_load_secp256k1_pubkey: (
  a: number,
  b: number
) => number;
export const halo2libwasm_verify_secp256k1_ecdsa_signature: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
) => number;
export const halo2libwasm_ecdsa_benchmark: (
  a: number,
  b: bigint,
  c: bigint,
  d: bigint
) => number;
export const halo2libwasm_to_js_circuit_value_256: (
  a: number,
  b: number,
  c: number
) => number;
export const halo2libwasm_to_js_circuit_bn254_fq2: (
  a: number,
  b: number,
  c: number
) => number;
export const halo2libwasm_to_js_circuit_bn254_g2_affine: (
  a: number,
  b: number,
  c: number
) => number;
export const __wbg_halo2libwasm_free: (a: number, b: number) => void;
export const halo2libwasm_new: (a: number) => number;
export const halo2libwasm_config: (a: number) => void;
export const halo2libwasm_add: (a: number, b: number, c: number) => number;
export const halo2libwasm_sub: (a: number, b: number, c: number) => number;
export const halo2libwasm_neg: (a: number, b: number) => number;
export const halo2libwasm_mul: (a: number, b: number, c: number) => number;
export const halo2libwasm_mul_add: (
  a: number,
  b: number,
  c: number,
  d: number
) => number;
export const halo2libwasm_mul_not: (a: number, b: number, c: number) => number;
export const halo2libwasm_assert_bit: (a: number, b: number) => void;
export const halo2libwasm_div_unsafe: (
  a: number,
  b: number,
  c: number
) => number;
export const halo2libwasm_assert_is_const: (
  a: number,
  b: number,
  c: number,
  d: number
) => void;
export const halo2libwasm_inner_product: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
) => number;
export const halo2libwasm_sum: (a: number, b: number, c: number) => number;
export const halo2libwasm_and: (a: number, b: number, c: number) => number;
export const halo2libwasm_or: (a: number, b: number, c: number) => number;
export const halo2libwasm_not: (a: number, b: number) => number;
export const halo2libwasm_dec: (a: number, b: number) => number;
export const halo2libwasm_select: (
  a: number,
  b: number,
  c: number,
  d: number
) => number;
export const halo2libwasm_or_and: (
  a: number,
  b: number,
  c: number,
  d: number
) => number;
export const halo2libwasm_bits_to_indicator: (
  a: number,
  b: number,
  c: number
) => [number, number];
export const halo2libwasm_idx_to_indicator: (
  a: number,
  b: number,
  c: number,
  d: number
) => [number, number];
export const halo2libwasm_select_by_indicator: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
) => number;
export const halo2libwasm_select_from_idx: (
  a: number,
  b: number,
  c: number,
  d: number
) => number;
export const halo2libwasm_is_zero: (a: number, b: number) => number;
export const halo2libwasm_is_equal: (a: number, b: number, c: number) => number;
export const halo2libwasm_num_to_bits: (
  a: number,
  b: number,
  c: number,
  d: number
) => [number, number];
export const halo2libwasm_constrain_equal: (
  a: number,
  b: number,
  c: number
) => void;
export const halo2libwasm_range_check: (
  a: number,
  b: number,
  c: number,
  d: number
) => void;
export const halo2libwasm_check_less_than: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
) => void;
export const halo2libwasm_check_less_than_safe: (
  a: number,
  b: number,
  c: number,
  d: number
) => void;
export const halo2libwasm_is_less_than: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
) => number;
export const halo2libwasm_is_less_than_safe: (
  a: number,
  b: number,
  c: number,
  d: number
) => number;
export const halo2libwasm_div_mod: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
) => [number, number];
export const halo2libwasm_to_hi_lo: (a: number, b: number) => [number, number];
export const halo2libwasm_from_hi_lo: (
  a: number,
  b: number,
  c: number
) => number;
export const halo2libwasm_div_mod_var: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  g: number
) => [number, number];
export const halo2libwasm_pow_var: (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
) => number;
export const halo2libwasm_poseidon: (a: number, b: number, c: number) => number;
export const halo2libwasm_witness: (a: number, b: number, c: number) => number;
export const halo2libwasm_constant: (a: number, b: number, c: number) => number;
export const halo2libwasm_make_public: (
  a: number,
  b: number,
  c: number,
  d: number
) => void;
export const halo2libwasm_log: (a: number, b: number, c: number) => void;
export const halo2libwasm_value: (a: number, b: number) => [number, number];
export const halo2libwasm_lookup_bits: (a: number) => number;
export const halo2libwasm_to_js_circuit_bn254_g1_affine: (
  a: number,
  b: number,
  c: number
) => number;
export const halo2libwasm_to_js_circuit_secp256k1_affine: (
  a: number,
  b: number,
  c: number
) => number;
export const jscircuitbn254g1affine_new: (a: number, b: number) => number;
export const jscircuitsecp256k1affine_new: (a: number, b: number) => number;
export const __wbg_get_jscircuitbn254g1affine_x: (a: number) => number;
export const __wbg_get_jscircuitbn254g1affine_y: (a: number) => number;
export const __wbg_get_jscircuitsecp256k1affine_x: (a: number) => number;
export const __wbg_get_jscircuitsecp256k1affine_y: (a: number) => number;
export const secp256k1fppoint_to_circuit_value_256: (
  a: number,
  b: number
) => number;
export const secp256k1fqpoint_to_circuit_value_256: (
  a: number,
  b: number
) => number;
export const __wbg_secp256k1fppoint_free: (a: number, b: number) => void;
export const __wbg_secp256k1fqpoint_free: (a: number, b: number) => void;
export const __wbg_set_jscircuitbn254g1affine_x: (a: number, b: number) => void;
export const __wbg_set_jscircuitbn254g1affine_y: (a: number, b: number) => void;
export const __wbg_set_jscircuitsecp256k1affine_x: (
  a: number,
  b: number
) => void;
export const __wbg_set_jscircuitsecp256k1affine_y: (
  a: number,
  b: number
) => void;
export const __wbg_jscircuitbn254g1affine_free: (a: number, b: number) => void;
export const __wbg_jscircuitsecp256k1affine_free: (
  a: number,
  b: number
) => void;
export const __wbg_wbg_rayon_poolbuilder_free: (a: number, b: number) => void;
export const wbg_rayon_poolbuilder_numThreads: (a: number) => number;
export const wbg_rayon_poolbuilder_receiver: (a: number) => number;
export const wbg_rayon_poolbuilder_build: (a: number) => void;
export const initThreadPool: (a: number) => any;
export const wbg_rayon_start_worker: (a: number) => void;
export const __wbindgen_exn_store: (a: number) => void;
export const __externref_table_alloc: () => number;
export const __wbindgen_export_2: WebAssembly.Table;
export const __wbindgen_free: (a: number, b: number, c: number) => void;
export const memory: WebAssembly.Memory;
export const __wbindgen_malloc: (a: number, b: number) => number;
export const __wbindgen_realloc: (
  a: number,
  b: number,
  c: number,
  d: number
) => number;
export const __wbindgen_thread_destroy: (
  a?: number,
  b?: number,
  c?: number
) => void;
export const __wbindgen_start: (a: number) => void;
