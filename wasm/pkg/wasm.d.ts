/* tslint:disable */
/* eslint-disable */
export function initPanicHook(): void;
export function initThreadPool(num_threads: number): Promise<any>;
export function wbg_rayon_start_worker(receiver: number): void;
export interface WasmEncryptionPublicKey {
  n: string;
  g: string;
}

export interface WasmInput {
  pkEnc: WasmEncryptionPublicKey;
  nullifier: string;
  proposalId: string;
  voteEnc: string[];
  vote: string[];
  rEnc: string[];
}

export interface CircuitStats {
  advice: number;
  lookup: number;
  fixed: number;
  instance: number;
  k: number;
}

export interface CircuitConfig {
  k: number;
  numAdvice: number;
  numLookupAdvice: number;
  numInstance: number;
  numLookupBits: number;
  numVirtualInstance: number;
}

export class Bn254Fq2Point {
  private constructor();
  free(): void;
  c0(): Bn254FqPoint;
  c1(): Bn254FqPoint;
}
/**
 * We use 3 limbs with 88 bits each.
 * NOT constrained to be less than the prime.
 */
export class Bn254FqPoint {
  private constructor();
  free(): void;
  to_circuit_value_256(lib_wasm: Halo2LibWasm): JsCircuitValue256;
}
export class Bn254G1AffinePoint {
  private constructor();
  free(): void;
  x(): Bn254FqPoint;
  y(): Bn254FqPoint;
}
export class Bn254G2AffinePoint {
  private constructor();
  free(): void;
  x(): Bn254Fq2Point;
  y(): Bn254Fq2Point;
}
export class Halo2LibWasm {
  free(): void;
  /**
   * Takes in CircuitValue256 in hi-lo form and loads internal CircuitBn254Fq type (we use 3 limbs of 88 bits).
   * This function does not range check `hi,lo` to be `uint128` in case it's already done elsewhere.
   */
  load_bn254_fq(val: JsCircuitValue256): Bn254FqPoint;
  /**
   * Doesn't range check limbs of g1_point.
   * Does not allow you to load identity point.
   */
  load_bn254_g1(point: JsCircuitBn254G1Affine): Bn254G1AffinePoint;
  /**
   * `g1_points` should be array of `CircuitBn254G1Affine` in hi-lo form.
   * This function does not range check `hi,lo` to be `uint128` in case it's already done elsewhere.
   * Prevents any g1_points from being identity.
   */
  bn254_g1_sum(g1_points: Array<any>): Bn254G1AffinePoint;
  /**
   * `g1_point_1` and `g1_point_2` are `CircuitBn254G1Affine` points in hi-lo form.
   * This function does not range check `hi,lo` to be `uint128` in case it's already done elsewhere
   * and also it constraints that g1_point_1.x != g1_point_2.x
   * Prevents any g1_points from being identity.
   */
  bn254_g1_sub_unequal(
    g1_point_1: JsCircuitBn254G1Affine,
    g1_point_2: JsCircuitBn254G1Affine
  ): Bn254G1AffinePoint;
  /**
   * Doesn't range check limbs of g2_point.
   * Does not allow you to load identity point.
   */
  load_bn254_g2(point: JsCircuitBn254G2Affine): Bn254G2AffinePoint;
  /**
   * `g2_points` should be array of `CircuitBn254G2Affine` in hi-lo form.
   * This function does not range check `hi,lo` to be `uint128` in case it's already done elsewhere.
   * Prevents any g2_points from being identity.
   */
  bn254_g2_sum(g2_points: Array<any>): Bn254G2AffinePoint;
  /**
   * Verifies that e(lhs_g1, lhs_g2) = e(rhs_g1, rhs_g2) by checking e(lhs_g1, lhs_g2)*e(-rhs_g1, rhs_g2) === 1
   * Returns [CircuitValue] for the result as a boolean (1 if signature verification is successful).
   * None of the points should be identity.
   */
  bn254_pairing_check(
    lhs_g1: Bn254G1AffinePoint,
    lhs_g2: Bn254G2AffinePoint,
    rhs_g1: Bn254G1AffinePoint,
    rhs_g2: Bn254G2AffinePoint
  ): number;
  /**
   * Doesn't range check limbs of point.
   * Pubkey is a point on
   */
  load_secp256k1_pubkey(point: JsCircuitSecp256k1Affine): Secp256k1AffinePoint;
  /**
   * Assumes all `JsCircuitValue256` limbs have been range checked to be `u128`.
   */
  verify_secp256k1_ecdsa_signature(
    pubkey: Secp256k1AffinePoint,
    r: JsCircuitValue256,
    s: JsCircuitValue256,
    msg_hash: JsCircuitValue256
  ): number;
  ecdsa_benchmark(sk: bigint, msg_hash: bigint, k: bigint): number;
  to_js_circuit_value_256(hi: number, lo: number): JsCircuitValue256;
  to_js_circuit_bn254_g1_affine(
    x: JsCircuitValue256,
    y: JsCircuitValue256
  ): JsCircuitBn254G1Affine;
  to_js_circuit_bn254_fq2(
    c0: JsCircuitValue256,
    c1: JsCircuitValue256
  ): JsCircuitBn254Fq2;
  to_js_circuit_bn254_g2_affine(
    x: JsCircuitBn254Fq2,
    y: JsCircuitBn254Fq2
  ): JsCircuitBn254G2Affine;
  to_js_circuit_secp256k1_affine(
    x: JsCircuitValue256,
    y: JsCircuitValue256
  ): JsCircuitSecp256k1Affine;
  constructor(circuit: Halo2Wasm);
  config(): void;
  add(a: number, b: number): number;
  sub(a: number, b: number): number;
  neg(a: number): number;
  mul(a: number, b: number): number;
  mul_add(a: number, b: number, c: number): number;
  mul_not(a: number, b: number): number;
  assert_bit(a: number): void;
  div_unsafe(a: number, b: number): number;
  assert_is_const(a: number, b: string): void;
  inner_product(a: Uint32Array, b: Uint32Array): number;
  sum(a: Uint32Array): number;
  and(a: number, b: number): number;
  or(a: number, b: number): number;
  not(a: number): number;
  dec(a: number): number;
  select(a: number, b: number, sel: number): number;
  or_and(a: number, b: number, c: number): number;
  bits_to_indicator(a: Uint32Array): Uint32Array;
  idx_to_indicator(a: number, b: string): Uint32Array;
  select_by_indicator(a: Uint32Array, indicator: Uint32Array): number;
  select_from_idx(a: Uint32Array, idx: number): number;
  is_zero(a: number): number;
  is_equal(a: number, b: number): number;
  num_to_bits(a: number, num_bits: string): Uint32Array;
  constrain_equal(a: number, b: number): void;
  range_check(a: number, b: string): void;
  check_less_than(a: number, b: number, size: string): void;
  check_less_than_safe(a: number, b: string): void;
  is_less_than(a: number, b: number, size: string): number;
  is_less_than_safe(a: number, b: string): number;
  div_mod(a: number, b: string, size: string): Uint32Array;
  /**
   * Returns a 256-bit hi-lo pair from a single CircuitValue
   *
   * See `check_hi_lo` for what is constrained.
   *
   * * `a`: the CircuitValue to split into hi-lo
   */
  to_hi_lo(a: number): Uint32Array;
  /**
   * Returns a single CircuitValue from a hi-lo pair
   *
   * NOTE: this can fail if the hi-lo pair is greater than the Fr modulus.
   * See `check_hi_lo` for what is constrained.
   *
   * * `hi`: the high 128 bits of the CircuitValue
   * * `lo`: the low 128 bits of the CircuitValue
   */
  from_hi_lo(hi: number, lo: number): number;
  div_mod_var(
    a: number,
    b: number,
    a_size: string,
    b_size: string
  ): Uint32Array;
  pow_var(a: number, b: number, max_bits: string): number;
  poseidon(a: Uint32Array): number;
  witness(val: string): number;
  constant(val: string): number;
  make_public(circuit: Halo2Wasm, a: number, col: number): void;
  log(circuit: Halo2Wasm, a: number): void;
  value(a: number): string;
  lookup_bits(): number;
}
export class Halo2Wasm {
  free(): void;
  constructor();
  clear(): void;
  clearInstances(): void;
  verify(proof: Uint8Array): void;
  getInstances(col: number): Uint32Array;
  setInstances(instances: Uint32Array, col: number): void;
  useInstances(): void;
  getInstanceValues(col: number): any;
  config(config: CircuitConfig): void;
  getCircuitStats(): CircuitStats;
  getVk(): Uint8Array;
  getPartialVk(): Uint8Array;
  getPk(): Uint8Array;
  assignInstances(): void;
  mock(): void;
  loadParams(params: Uint8Array): void;
  loadVk(vk: Uint8Array): void;
  loadPk(pk: Uint8Array): void;
  genVk(): void;
  genPk(): void;
  prove(): Uint8Array;
  /**
   * For console logging only.
   */
  log(a: string): void;
}
export class JsCircuitBn254Fq2 {
  free(): void;
  constructor(c0: JsCircuitValue256, c1: JsCircuitValue256);
  c0: JsCircuitValue256;
  c1: JsCircuitValue256;
}
export class JsCircuitBn254G1Affine {
  free(): void;
  constructor(x: JsCircuitValue256, y: JsCircuitValue256);
  x: JsCircuitValue256;
  y: JsCircuitValue256;
}
export class JsCircuitBn254G2Affine {
  free(): void;
  constructor(x: JsCircuitBn254Fq2, y: JsCircuitBn254Fq2);
  x: JsCircuitBn254Fq2;
  y: JsCircuitBn254Fq2;
}
export class JsCircuitSecp256k1Affine {
  free(): void;
  constructor(x: JsCircuitValue256, y: JsCircuitValue256);
  x: JsCircuitValue256;
  y: JsCircuitValue256;
}
/**
 * When this type is used, it is **ASSUMED** that the corresponding `hi,lo` [AssignedValue]s have been range checked to be 128 bits each.
 */
export class JsCircuitValue256 {
  free(): void;
  constructor(hi: number, lo: number);
  hi: number;
  lo: number;
}
export class MyCircuit {
  free(): void;
  constructor(circuit: Halo2Wasm);
  run_with_input(input: WasmInput): void;
  run(): void;
}
export class Secp256k1AffinePoint {
  private constructor();
  free(): void;
  x(): Secp256k1FpPoint;
  y(): Secp256k1FpPoint;
}
/**
 * We use 3 limbs with 88 bits each.
 * NOT constrained to be less than the prime.
 */
export class Secp256k1FpPoint {
  private constructor();
  free(): void;
  to_circuit_value_256(lib_wasm: Halo2LibWasm): JsCircuitValue256;
}
/**
 * We use 3 limbs with 88 bits each.
 * NOT constrained to be less than the prime.
 */
export class Secp256k1FqPoint {
  private constructor();
  free(): void;
  to_circuit_value_256(lib_wasm: Halo2LibWasm): JsCircuitValue256;
}
export class wbg_rayon_PoolBuilder {
  private constructor();
  free(): void;
  numThreads(): number;
  receiver(): number;
  build(): void;
}

export type InitInput =
  | RequestInfo
  | URL
  | Response
  | BufferSource
  | WebAssembly.Module;

export interface InitOutput {
  readonly __wbg_mycircuit_free: (a: number, b: number) => void;
  readonly mycircuit_new: (a: number) => number;
  readonly mycircuit_run_with_input: (a: number, b: any) => void;
  readonly mycircuit_run: (a: number) => void;
  readonly __wbg_halo2wasm_free: (a: number, b: number) => void;
  readonly halo2wasm_new: () => number;
  readonly halo2wasm_clear: (a: number) => void;
  readonly halo2wasm_clearInstances: (a: number) => void;
  readonly halo2wasm_verify: (a: number, b: number, c: number) => void;
  readonly halo2wasm_getInstances: (a: number, b: number) => [number, number];
  readonly halo2wasm_setInstances: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => void;
  readonly halo2wasm_useInstances: (a: number) => void;
  readonly halo2wasm_getInstanceValues: (a: number, b: number) => any;
  readonly halo2wasm_config: (a: number, b: any) => void;
  readonly halo2wasm_getCircuitStats: (a: number) => any;
  readonly halo2wasm_getVk: (a: number) => [number, number];
  readonly halo2wasm_getPartialVk: (a: number) => [number, number];
  readonly halo2wasm_getPk: (a: number) => [number, number];
  readonly halo2wasm_assignInstances: (a: number) => void;
  readonly halo2wasm_mock: (a: number) => void;
  readonly halo2wasm_loadParams: (a: number, b: number, c: number) => void;
  readonly halo2wasm_loadVk: (a: number, b: number, c: number) => void;
  readonly halo2wasm_loadPk: (a: number, b: number, c: number) => void;
  readonly halo2wasm_genVk: (a: number) => void;
  readonly halo2wasm_genPk: (a: number) => void;
  readonly halo2wasm_prove: (a: number) => [number, number];
  readonly halo2wasm_log: (a: number, b: number, c: number) => void;
  readonly initPanicHook: () => void;
  readonly __wbg_bn254fqpoint_free: (a: number, b: number) => void;
  readonly bn254fqpoint_to_circuit_value_256: (a: number, b: number) => number;
  readonly __wbg_bn254fq2point_free: (a: number, b: number) => void;
  readonly bn254fq2point_c0: (a: number) => number;
  readonly bn254fq2point_c1: (a: number) => number;
  readonly __wbg_bn254g1affinepoint_free: (a: number, b: number) => void;
  readonly bn254g1affinepoint_x: (a: number) => number;
  readonly bn254g1affinepoint_y: (a: number) => number;
  readonly __wbg_bn254g2affinepoint_free: (a: number, b: number) => void;
  readonly bn254g2affinepoint_x: (a: number) => number;
  readonly bn254g2affinepoint_y: (a: number) => number;
  readonly __wbg_secp256k1affinepoint_free: (a: number, b: number) => void;
  readonly secp256k1affinepoint_x: (a: number) => number;
  readonly secp256k1affinepoint_y: (a: number) => number;
  readonly __wbg_jscircuitvalue256_free: (a: number, b: number) => void;
  readonly __wbg_get_jscircuitvalue256_hi: (a: number) => number;
  readonly __wbg_set_jscircuitvalue256_hi: (a: number, b: number) => void;
  readonly __wbg_get_jscircuitvalue256_lo: (a: number) => number;
  readonly __wbg_set_jscircuitvalue256_lo: (a: number, b: number) => void;
  readonly jscircuitvalue256_new: (a: number, b: number) => number;
  readonly __wbg_jscircuitbn254fq2_free: (a: number, b: number) => void;
  readonly __wbg_get_jscircuitbn254fq2_c0: (a: number) => number;
  readonly __wbg_set_jscircuitbn254fq2_c0: (a: number, b: number) => void;
  readonly __wbg_get_jscircuitbn254fq2_c1: (a: number) => number;
  readonly __wbg_set_jscircuitbn254fq2_c1: (a: number, b: number) => void;
  readonly jscircuitbn254fq2_new: (a: number, b: number) => number;
  readonly __wbg_jscircuitbn254g2affine_free: (a: number, b: number) => void;
  readonly __wbg_get_jscircuitbn254g2affine_x: (a: number) => number;
  readonly __wbg_set_jscircuitbn254g2affine_x: (a: number, b: number) => void;
  readonly __wbg_get_jscircuitbn254g2affine_y: (a: number) => number;
  readonly __wbg_set_jscircuitbn254g2affine_y: (a: number, b: number) => void;
  readonly jscircuitbn254g2affine_new: (a: number, b: number) => number;
  readonly halo2libwasm_load_bn254_fq: (a: number, b: number) => number;
  readonly halo2libwasm_load_bn254_g1: (a: number, b: number) => number;
  readonly halo2libwasm_bn254_g1_sum: (a: number, b: any) => number;
  readonly halo2libwasm_bn254_g1_sub_unequal: (
    a: number,
    b: number,
    c: number
  ) => number;
  readonly halo2libwasm_load_bn254_g2: (a: number, b: number) => number;
  readonly halo2libwasm_bn254_g2_sum: (a: number, b: any) => number;
  readonly halo2libwasm_bn254_pairing_check: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly halo2libwasm_load_secp256k1_pubkey: (a: number, b: number) => number;
  readonly halo2libwasm_verify_secp256k1_ecdsa_signature: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly halo2libwasm_ecdsa_benchmark: (
    a: number,
    b: bigint,
    c: bigint,
    d: bigint
  ) => number;
  readonly halo2libwasm_to_js_circuit_value_256: (
    a: number,
    b: number,
    c: number
  ) => number;
  readonly halo2libwasm_to_js_circuit_bn254_fq2: (
    a: number,
    b: number,
    c: number
  ) => number;
  readonly halo2libwasm_to_js_circuit_bn254_g2_affine: (
    a: number,
    b: number,
    c: number
  ) => number;
  readonly __wbg_halo2libwasm_free: (a: number, b: number) => void;
  readonly halo2libwasm_new: (a: number) => number;
  readonly halo2libwasm_config: (a: number) => void;
  readonly halo2libwasm_add: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_sub: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_neg: (a: number, b: number) => number;
  readonly halo2libwasm_mul: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_mul_add: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => number;
  readonly halo2libwasm_mul_not: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_assert_bit: (a: number, b: number) => void;
  readonly halo2libwasm_div_unsafe: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_assert_is_const: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => void;
  readonly halo2libwasm_inner_product: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly halo2libwasm_sum: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_and: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_or: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_not: (a: number, b: number) => number;
  readonly halo2libwasm_dec: (a: number, b: number) => number;
  readonly halo2libwasm_select: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => number;
  readonly halo2libwasm_or_and: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => number;
  readonly halo2libwasm_bits_to_indicator: (
    a: number,
    b: number,
    c: number
  ) => [number, number];
  readonly halo2libwasm_idx_to_indicator: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => [number, number];
  readonly halo2libwasm_select_by_indicator: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly halo2libwasm_select_from_idx: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => number;
  readonly halo2libwasm_is_zero: (a: number, b: number) => number;
  readonly halo2libwasm_is_equal: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_num_to_bits: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => [number, number];
  readonly halo2libwasm_constrain_equal: (
    a: number,
    b: number,
    c: number
  ) => void;
  readonly halo2libwasm_range_check: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => void;
  readonly halo2libwasm_check_less_than: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => void;
  readonly halo2libwasm_check_less_than_safe: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => void;
  readonly halo2libwasm_is_less_than: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly halo2libwasm_is_less_than_safe: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => number;
  readonly halo2libwasm_div_mod: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => [number, number];
  readonly halo2libwasm_to_hi_lo: (a: number, b: number) => [number, number];
  readonly halo2libwasm_from_hi_lo: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_div_mod_var: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
    g: number
  ) => [number, number];
  readonly halo2libwasm_pow_var: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly halo2libwasm_poseidon: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_witness: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_constant: (a: number, b: number, c: number) => number;
  readonly halo2libwasm_make_public: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => void;
  readonly halo2libwasm_log: (a: number, b: number, c: number) => void;
  readonly halo2libwasm_value: (a: number, b: number) => [number, number];
  readonly halo2libwasm_lookup_bits: (a: number) => number;
  readonly halo2libwasm_to_js_circuit_bn254_g1_affine: (
    a: number,
    b: number,
    c: number
  ) => number;
  readonly halo2libwasm_to_js_circuit_secp256k1_affine: (
    a: number,
    b: number,
    c: number
  ) => number;
  readonly jscircuitbn254g1affine_new: (a: number, b: number) => number;
  readonly jscircuitsecp256k1affine_new: (a: number, b: number) => number;
  readonly __wbg_get_jscircuitbn254g1affine_x: (a: number) => number;
  readonly __wbg_get_jscircuitbn254g1affine_y: (a: number) => number;
  readonly __wbg_get_jscircuitsecp256k1affine_x: (a: number) => number;
  readonly __wbg_get_jscircuitsecp256k1affine_y: (a: number) => number;
  readonly secp256k1fppoint_to_circuit_value_256: (
    a: number,
    b: number
  ) => number;
  readonly secp256k1fqpoint_to_circuit_value_256: (
    a: number,
    b: number
  ) => number;
  readonly __wbg_secp256k1fppoint_free: (a: number, b: number) => void;
  readonly __wbg_secp256k1fqpoint_free: (a: number, b: number) => void;
  readonly __wbg_set_jscircuitbn254g1affine_x: (a: number, b: number) => void;
  readonly __wbg_set_jscircuitbn254g1affine_y: (a: number, b: number) => void;
  readonly __wbg_set_jscircuitsecp256k1affine_x: (a: number, b: number) => void;
  readonly __wbg_set_jscircuitsecp256k1affine_y: (a: number, b: number) => void;
  readonly __wbg_jscircuitbn254g1affine_free: (a: number, b: number) => void;
  readonly __wbg_jscircuitsecp256k1affine_free: (a: number, b: number) => void;
  readonly __wbg_wbg_rayon_poolbuilder_free: (a: number, b: number) => void;
  readonly wbg_rayon_poolbuilder_numThreads: (a: number) => number;
  readonly wbg_rayon_poolbuilder_receiver: (a: number) => number;
  readonly wbg_rayon_poolbuilder_build: (a: number) => void;
  readonly initThreadPool: (a: number) => any;
  readonly wbg_rayon_start_worker: (a: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly memory: WebAssembly.Memory;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (
    a: number,
    b: number,
    c: number,
    d: number
  ) => number;
  readonly __wbindgen_thread_destroy: (
    a?: number,
    b?: number,
    c?: number
  ) => void;
  readonly __wbindgen_start: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput, memory?: WebAssembly.Memory, thread_stack_size?: number }} module - Passing `SyncInitInput` directly is deprecated.
 * @param {WebAssembly.Memory} memory - Deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(
  module:
    | {
        module: SyncInitInput;
        memory?: WebAssembly.Memory;
        thread_stack_size?: number;
      }
    | SyncInitInput,
  memory?: WebAssembly.Memory
): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput>, memory?: WebAssembly.Memory, thread_stack_size?: number }} module_or_path - Passing `InitInput` directly is deprecated.
 * @param {WebAssembly.Memory} memory - Deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init(
  module_or_path?:
    | {
        module_or_path: InitInput | Promise<InitInput>;
        memory?: WebAssembly.Memory;
        thread_stack_size?: number;
      }
    | InitInput
    | Promise<InitInput>,
  memory?: WebAssembly.Memory
): Promise<InitOutput>;
