import { startWorkers } from './snippets/wasm-bindgen-rayon-61c530a5c67cc8eb/src/workerHelpers.js';

let wasm;

function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_2.set(idx, obj);
  return idx;
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}

const cachedTextDecoder =
  typeof TextDecoder !== 'undefined'
    ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true })
    : {
        decode: () => {
          throw Error('TextDecoder not available');
        },
      };

if (typeof TextDecoder !== 'undefined') {
  cachedTextDecoder.decode();
}

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
  if (
    cachedUint8ArrayMemory0 === null ||
    cachedUint8ArrayMemory0.buffer !== wasm.memory.buffer
  ) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().slice(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder =
  typeof TextEncoder !== 'undefined'
    ? new TextEncoder('utf-8')
    : {
        encode: () => {
          throw Error('TextEncoder not available');
        },
      };

const encodeString = function (arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length,
  };
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8ArrayMemory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3), 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
  if (
    cachedDataViewMemory0 === null ||
    cachedDataViewMemory0.buffer !== wasm.memory.buffer
  ) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == 'number' || type == 'boolean' || val == null) {
    return `${val}`;
  }
  if (type == 'string') {
    return `"${val}"`;
  }
  if (type == 'symbol') {
    const description = val.description;
    if (description == null) {
      return 'Symbol';
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == 'function') {
    const name = val.name;
    if (typeof name == 'string' && name.length > 0) {
      return `Function(${name})`;
    } else {
      return 'Function';
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = '[';
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ', ' + debugString(val[i]);
    }
    debug += ']';
    return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }
  if (className == 'Object') {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return 'Object(' + JSON.stringify(val) + ')';
    } catch (_) {
      return 'Object';
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}

function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
  if (
    cachedUint32ArrayMemory0 === null ||
    cachedUint32ArrayMemory0.buffer !== wasm.memory.buffer
  ) {
    cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function passArray32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4, 4) >>> 0;
  getUint32ArrayMemory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

export function initPanicHook() {
  wasm.initPanicHook();
}

/**
 * @param {number} num_threads
 * @returns {Promise<any>}
 */
export function initThreadPool(num_threads) {
  const ret = wasm.initThreadPool(num_threads);
  return ret;
}

/**
 * @param {number} receiver
 */
export function wbg_rayon_start_worker(receiver) {
  wasm.wbg_rayon_start_worker(receiver);
}

const Bn254Fq2PointFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_bn254fq2point_free(ptr >>> 0, 1)
      );

export class Bn254Fq2Point {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Bn254Fq2Point.prototype);
    obj.__wbg_ptr = ptr;
    Bn254Fq2PointFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Bn254Fq2PointFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_bn254fq2point_free(ptr, 0);
  }
  /**
   * @returns {Bn254FqPoint}
   */
  c0() {
    const ret = wasm.bn254fq2point_c0(this.__wbg_ptr);
    return Bn254FqPoint.__wrap(ret);
  }
  /**
   * @returns {Bn254FqPoint}
   */
  c1() {
    const ret = wasm.bn254fq2point_c1(this.__wbg_ptr);
    return Bn254FqPoint.__wrap(ret);
  }
}

const Bn254FqPointFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_bn254fqpoint_free(ptr >>> 0, 1)
      );
/**
 * We use 3 limbs with 88 bits each.
 * NOT constrained to be less than the prime.
 */
export class Bn254FqPoint {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Bn254FqPoint.prototype);
    obj.__wbg_ptr = ptr;
    Bn254FqPointFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Bn254FqPointFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_bn254fqpoint_free(ptr, 0);
  }
  /**
   * @param {Halo2LibWasm} lib_wasm
   * @returns {JsCircuitValue256}
   */
  to_circuit_value_256(lib_wasm) {
    _assertClass(lib_wasm, Halo2LibWasm);
    const ret = wasm.bn254fqpoint_to_circuit_value_256(
      this.__wbg_ptr,
      lib_wasm.__wbg_ptr
    );
    return JsCircuitValue256.__wrap(ret);
  }
}

const Bn254G1AffinePointFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_bn254g1affinepoint_free(ptr >>> 0, 1)
      );

export class Bn254G1AffinePoint {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Bn254G1AffinePoint.prototype);
    obj.__wbg_ptr = ptr;
    Bn254G1AffinePointFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Bn254G1AffinePointFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_bn254g1affinepoint_free(ptr, 0);
  }
  /**
   * @returns {Bn254FqPoint}
   */
  x() {
    const ret = wasm.bn254g1affinepoint_x(this.__wbg_ptr);
    return Bn254FqPoint.__wrap(ret);
  }
  /**
   * @returns {Bn254FqPoint}
   */
  y() {
    const ret = wasm.bn254g1affinepoint_y(this.__wbg_ptr);
    return Bn254FqPoint.__wrap(ret);
  }
}

const Bn254G2AffinePointFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_bn254g2affinepoint_free(ptr >>> 0, 1)
      );

export class Bn254G2AffinePoint {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Bn254G2AffinePoint.prototype);
    obj.__wbg_ptr = ptr;
    Bn254G2AffinePointFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Bn254G2AffinePointFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_bn254g2affinepoint_free(ptr, 0);
  }
  /**
   * @returns {Bn254Fq2Point}
   */
  x() {
    const ret = wasm.bn254g2affinepoint_x(this.__wbg_ptr);
    return Bn254Fq2Point.__wrap(ret);
  }
  /**
   * @returns {Bn254Fq2Point}
   */
  y() {
    const ret = wasm.bn254g2affinepoint_y(this.__wbg_ptr);
    return Bn254Fq2Point.__wrap(ret);
  }
}

const Halo2LibWasmFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_halo2libwasm_free(ptr >>> 0, 1)
      );

export class Halo2LibWasm {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Halo2LibWasmFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_halo2libwasm_free(ptr, 0);
  }
  /**
   * Takes in CircuitValue256 in hi-lo form and loads internal CircuitBn254Fq type (we use 3 limbs of 88 bits).
   * This function does not range check `hi,lo` to be `uint128` in case it's already done elsewhere.
   * @param {JsCircuitValue256} val
   * @returns {Bn254FqPoint}
   */
  load_bn254_fq(val) {
    _assertClass(val, JsCircuitValue256);
    var ptr0 = val.__destroy_into_raw();
    const ret = wasm.halo2libwasm_load_bn254_fq(this.__wbg_ptr, ptr0);
    return Bn254FqPoint.__wrap(ret);
  }
  /**
   * Doesn't range check limbs of g1_point.
   * Does not allow you to load identity point.
   * @param {JsCircuitBn254G1Affine} point
   * @returns {Bn254G1AffinePoint}
   */
  load_bn254_g1(point) {
    _assertClass(point, JsCircuitBn254G1Affine);
    var ptr0 = point.__destroy_into_raw();
    const ret = wasm.halo2libwasm_load_bn254_g1(this.__wbg_ptr, ptr0);
    return Bn254G1AffinePoint.__wrap(ret);
  }
  /**
   * `g1_points` should be array of `CircuitBn254G1Affine` in hi-lo form.
   * This function does not range check `hi,lo` to be `uint128` in case it's already done elsewhere.
   * Prevents any g1_points from being identity.
   * @param {Array<any>} g1_points
   * @returns {Bn254G1AffinePoint}
   */
  bn254_g1_sum(g1_points) {
    const ret = wasm.halo2libwasm_bn254_g1_sum(this.__wbg_ptr, g1_points);
    return Bn254G1AffinePoint.__wrap(ret);
  }
  /**
   * `g1_point_1` and `g1_point_2` are `CircuitBn254G1Affine` points in hi-lo form.
   * This function does not range check `hi,lo` to be `uint128` in case it's already done elsewhere
   * and also it constraints that g1_point_1.x != g1_point_2.x
   * Prevents any g1_points from being identity.
   * @param {JsCircuitBn254G1Affine} g1_point_1
   * @param {JsCircuitBn254G1Affine} g1_point_2
   * @returns {Bn254G1AffinePoint}
   */
  bn254_g1_sub_unequal(g1_point_1, g1_point_2) {
    _assertClass(g1_point_1, JsCircuitBn254G1Affine);
    var ptr0 = g1_point_1.__destroy_into_raw();
    _assertClass(g1_point_2, JsCircuitBn254G1Affine);
    var ptr1 = g1_point_2.__destroy_into_raw();
    const ret = wasm.halo2libwasm_bn254_g1_sub_unequal(
      this.__wbg_ptr,
      ptr0,
      ptr1
    );
    return Bn254G1AffinePoint.__wrap(ret);
  }
  /**
   * Doesn't range check limbs of g2_point.
   * Does not allow you to load identity point.
   * @param {JsCircuitBn254G2Affine} point
   * @returns {Bn254G2AffinePoint}
   */
  load_bn254_g2(point) {
    _assertClass(point, JsCircuitBn254G2Affine);
    var ptr0 = point.__destroy_into_raw();
    const ret = wasm.halo2libwasm_load_bn254_g2(this.__wbg_ptr, ptr0);
    return Bn254G2AffinePoint.__wrap(ret);
  }
  /**
   * `g2_points` should be array of `CircuitBn254G2Affine` in hi-lo form.
   * This function does not range check `hi,lo` to be `uint128` in case it's already done elsewhere.
   * Prevents any g2_points from being identity.
   * @param {Array<any>} g2_points
   * @returns {Bn254G2AffinePoint}
   */
  bn254_g2_sum(g2_points) {
    const ret = wasm.halo2libwasm_bn254_g2_sum(this.__wbg_ptr, g2_points);
    return Bn254G2AffinePoint.__wrap(ret);
  }
  /**
   * Verifies that e(lhs_g1, lhs_g2) = e(rhs_g1, rhs_g2) by checking e(lhs_g1, lhs_g2)*e(-rhs_g1, rhs_g2) === 1
   * Returns [CircuitValue] for the result as a boolean (1 if signature verification is successful).
   * None of the points should be identity.
   * @param {Bn254G1AffinePoint} lhs_g1
   * @param {Bn254G2AffinePoint} lhs_g2
   * @param {Bn254G1AffinePoint} rhs_g1
   * @param {Bn254G2AffinePoint} rhs_g2
   * @returns {number}
   */
  bn254_pairing_check(lhs_g1, lhs_g2, rhs_g1, rhs_g2) {
    _assertClass(lhs_g1, Bn254G1AffinePoint);
    var ptr0 = lhs_g1.__destroy_into_raw();
    _assertClass(lhs_g2, Bn254G2AffinePoint);
    var ptr1 = lhs_g2.__destroy_into_raw();
    _assertClass(rhs_g1, Bn254G1AffinePoint);
    var ptr2 = rhs_g1.__destroy_into_raw();
    _assertClass(rhs_g2, Bn254G2AffinePoint);
    var ptr3 = rhs_g2.__destroy_into_raw();
    const ret = wasm.halo2libwasm_bn254_pairing_check(
      this.__wbg_ptr,
      ptr0,
      ptr1,
      ptr2,
      ptr3
    );
    return ret >>> 0;
  }
  /**
   * Doesn't range check limbs of point.
   * Pubkey is a point on
   * @param {JsCircuitSecp256k1Affine} point
   * @returns {Secp256k1AffinePoint}
   */
  load_secp256k1_pubkey(point) {
    _assertClass(point, JsCircuitSecp256k1Affine);
    var ptr0 = point.__destroy_into_raw();
    const ret = wasm.halo2libwasm_load_secp256k1_pubkey(this.__wbg_ptr, ptr0);
    return Secp256k1AffinePoint.__wrap(ret);
  }
  /**
   * Assumes all `JsCircuitValue256` limbs have been range checked to be `u128`.
   * @param {Secp256k1AffinePoint} pubkey
   * @param {JsCircuitValue256} r
   * @param {JsCircuitValue256} s
   * @param {JsCircuitValue256} msg_hash
   * @returns {number}
   */
  verify_secp256k1_ecdsa_signature(pubkey, r, s, msg_hash) {
    _assertClass(pubkey, Secp256k1AffinePoint);
    var ptr0 = pubkey.__destroy_into_raw();
    _assertClass(r, JsCircuitValue256);
    var ptr1 = r.__destroy_into_raw();
    _assertClass(s, JsCircuitValue256);
    var ptr2 = s.__destroy_into_raw();
    _assertClass(msg_hash, JsCircuitValue256);
    var ptr3 = msg_hash.__destroy_into_raw();
    const ret = wasm.halo2libwasm_verify_secp256k1_ecdsa_signature(
      this.__wbg_ptr,
      ptr0,
      ptr1,
      ptr2,
      ptr3
    );
    return ret >>> 0;
  }
  /**
   * @param {bigint} sk
   * @param {bigint} msg_hash
   * @param {bigint} k
   * @returns {number}
   */
  ecdsa_benchmark(sk, msg_hash, k) {
    const ret = wasm.halo2libwasm_ecdsa_benchmark(
      this.__wbg_ptr,
      sk,
      msg_hash,
      k
    );
    return ret >>> 0;
  }
  /**
   * @param {number} hi
   * @param {number} lo
   * @returns {JsCircuitValue256}
   */
  to_js_circuit_value_256(hi, lo) {
    const ret = wasm.halo2libwasm_to_js_circuit_value_256(
      this.__wbg_ptr,
      hi,
      lo
    );
    return JsCircuitValue256.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} x
   * @param {JsCircuitValue256} y
   * @returns {JsCircuitBn254G1Affine}
   */
  to_js_circuit_bn254_g1_affine(x, y) {
    _assertClass(x, JsCircuitValue256);
    var ptr0 = x.__destroy_into_raw();
    _assertClass(y, JsCircuitValue256);
    var ptr1 = y.__destroy_into_raw();
    const ret = wasm.halo2libwasm_to_js_circuit_bn254_fq2(
      this.__wbg_ptr,
      ptr0,
      ptr1
    );
    return JsCircuitBn254G1Affine.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} c0
   * @param {JsCircuitValue256} c1
   * @returns {JsCircuitBn254Fq2}
   */
  to_js_circuit_bn254_fq2(c0, c1) {
    _assertClass(c0, JsCircuitValue256);
    var ptr0 = c0.__destroy_into_raw();
    _assertClass(c1, JsCircuitValue256);
    var ptr1 = c1.__destroy_into_raw();
    const ret = wasm.halo2libwasm_to_js_circuit_bn254_fq2(
      this.__wbg_ptr,
      ptr0,
      ptr1
    );
    return JsCircuitBn254Fq2.__wrap(ret);
  }
  /**
   * @param {JsCircuitBn254Fq2} x
   * @param {JsCircuitBn254Fq2} y
   * @returns {JsCircuitBn254G2Affine}
   */
  to_js_circuit_bn254_g2_affine(x, y) {
    _assertClass(x, JsCircuitBn254Fq2);
    var ptr0 = x.__destroy_into_raw();
    _assertClass(y, JsCircuitBn254Fq2);
    var ptr1 = y.__destroy_into_raw();
    const ret = wasm.halo2libwasm_to_js_circuit_bn254_g2_affine(
      this.__wbg_ptr,
      ptr0,
      ptr1
    );
    return JsCircuitBn254G2Affine.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} x
   * @param {JsCircuitValue256} y
   * @returns {JsCircuitSecp256k1Affine}
   */
  to_js_circuit_secp256k1_affine(x, y) {
    _assertClass(x, JsCircuitValue256);
    var ptr0 = x.__destroy_into_raw();
    _assertClass(y, JsCircuitValue256);
    var ptr1 = y.__destroy_into_raw();
    const ret = wasm.halo2libwasm_to_js_circuit_bn254_fq2(
      this.__wbg_ptr,
      ptr0,
      ptr1
    );
    return JsCircuitSecp256k1Affine.__wrap(ret);
  }
  /**
   * @param {Halo2Wasm} circuit
   */
  constructor(circuit) {
    _assertClass(circuit, Halo2Wasm);
    const ret = wasm.halo2libwasm_new(circuit.__wbg_ptr);
    this.__wbg_ptr = ret >>> 0;
    Halo2LibWasmFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  config() {
    wasm.halo2libwasm_config(this.__wbg_ptr);
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  add(a, b) {
    const ret = wasm.halo2libwasm_add(this.__wbg_ptr, a, b);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  sub(a, b) {
    const ret = wasm.halo2libwasm_sub(this.__wbg_ptr, a, b);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @returns {number}
   */
  neg(a) {
    const ret = wasm.halo2libwasm_neg(this.__wbg_ptr, a);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  mul(a, b) {
    const ret = wasm.halo2libwasm_mul(this.__wbg_ptr, a, b);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @returns {number}
   */
  mul_add(a, b, c) {
    const ret = wasm.halo2libwasm_mul_add(this.__wbg_ptr, a, b, c);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  mul_not(a, b) {
    const ret = wasm.halo2libwasm_mul_not(this.__wbg_ptr, a, b);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   */
  assert_bit(a) {
    wasm.halo2libwasm_assert_bit(this.__wbg_ptr, a);
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  div_unsafe(a, b) {
    const ret = wasm.halo2libwasm_div_unsafe(this.__wbg_ptr, a, b);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {string} b
   */
  assert_is_const(a, b) {
    const ptr0 = passStringToWasm0(
      b,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2libwasm_assert_is_const(this.__wbg_ptr, a, ptr0, len0);
  }
  /**
   * @param {Uint32Array} a
   * @param {Uint32Array} b
   * @returns {number}
   */
  inner_product(a, b) {
    const ptr0 = passArray32ToWasm0(a, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray32ToWasm0(b, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_inner_product(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1
    );
    return ret >>> 0;
  }
  /**
   * @param {Uint32Array} a
   * @returns {number}
   */
  sum(a) {
    const ptr0 = passArray32ToWasm0(a, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_sum(this.__wbg_ptr, ptr0, len0);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  and(a, b) {
    const ret = wasm.halo2libwasm_and(this.__wbg_ptr, a, b);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  or(a, b) {
    const ret = wasm.halo2libwasm_or(this.__wbg_ptr, a, b);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @returns {number}
   */
  not(a) {
    const ret = wasm.halo2libwasm_not(this.__wbg_ptr, a);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @returns {number}
   */
  dec(a) {
    const ret = wasm.halo2libwasm_dec(this.__wbg_ptr, a);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} sel
   * @returns {number}
   */
  select(a, b, sel) {
    const ret = wasm.halo2libwasm_select(this.__wbg_ptr, a, b, sel);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @returns {number}
   */
  or_and(a, b, c) {
    const ret = wasm.halo2libwasm_or_and(this.__wbg_ptr, a, b, c);
    return ret >>> 0;
  }
  /**
   * @param {Uint32Array} a
   * @returns {Uint32Array}
   */
  bits_to_indicator(a) {
    const ptr0 = passArray32ToWasm0(a, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_bits_to_indicator(this.__wbg_ptr, ptr0, len0);
    var v2 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v2;
  }
  /**
   * @param {number} a
   * @param {string} b
   * @returns {Uint32Array}
   */
  idx_to_indicator(a, b) {
    const ptr0 = passStringToWasm0(
      b,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_idx_to_indicator(
      this.__wbg_ptr,
      a,
      ptr0,
      len0
    );
    var v2 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v2;
  }
  /**
   * @param {Uint32Array} a
   * @param {Uint32Array} indicator
   * @returns {number}
   */
  select_by_indicator(a, indicator) {
    const ptr0 = passArray32ToWasm0(a, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray32ToWasm0(indicator, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_select_by_indicator(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1
    );
    return ret >>> 0;
  }
  /**
   * @param {Uint32Array} a
   * @param {number} idx
   * @returns {number}
   */
  select_from_idx(a, idx) {
    const ptr0 = passArray32ToWasm0(a, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_select_from_idx(
      this.__wbg_ptr,
      ptr0,
      len0,
      idx
    );
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @returns {number}
   */
  is_zero(a) {
    const ret = wasm.halo2libwasm_is_zero(this.__wbg_ptr, a);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  is_equal(a, b) {
    const ret = wasm.halo2libwasm_is_equal(this.__wbg_ptr, a, b);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {string} num_bits
   * @returns {Uint32Array}
   */
  num_to_bits(a, num_bits) {
    const ptr0 = passStringToWasm0(
      num_bits,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_num_to_bits(this.__wbg_ptr, a, ptr0, len0);
    var v2 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v2;
  }
  /**
   * @param {number} a
   * @param {number} b
   */
  constrain_equal(a, b) {
    wasm.halo2libwasm_constrain_equal(this.__wbg_ptr, a, b);
  }
  /**
   * @param {number} a
   * @param {string} b
   */
  range_check(a, b) {
    const ptr0 = passStringToWasm0(
      b,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2libwasm_range_check(this.__wbg_ptr, a, ptr0, len0);
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {string} size
   */
  check_less_than(a, b, size) {
    const ptr0 = passStringToWasm0(
      size,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2libwasm_check_less_than(this.__wbg_ptr, a, b, ptr0, len0);
  }
  /**
   * @param {number} a
   * @param {string} b
   */
  check_less_than_safe(a, b) {
    const ptr0 = passStringToWasm0(
      b,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2libwasm_check_less_than_safe(this.__wbg_ptr, a, ptr0, len0);
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {string} size
   * @returns {number}
   */
  is_less_than(a, b, size) {
    const ptr0 = passStringToWasm0(
      size,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_is_less_than(
      this.__wbg_ptr,
      a,
      b,
      ptr0,
      len0
    );
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {string} b
   * @returns {number}
   */
  is_less_than_safe(a, b) {
    const ptr0 = passStringToWasm0(
      b,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_is_less_than_safe(
      this.__wbg_ptr,
      a,
      ptr0,
      len0
    );
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {string} b
   * @param {string} size
   * @returns {Uint32Array}
   */
  div_mod(a, b, size) {
    const ptr0 = passStringToWasm0(
      b,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      size,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_div_mod(
      this.__wbg_ptr,
      a,
      ptr0,
      len0,
      ptr1,
      len1
    );
    var v3 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v3;
  }
  /**
   * Returns a 256-bit hi-lo pair from a single CircuitValue
   *
   * See `check_hi_lo` for what is constrained.
   *
   * * `a`: the CircuitValue to split into hi-lo
   * @param {number} a
   * @returns {Uint32Array}
   */
  to_hi_lo(a) {
    const ret = wasm.halo2libwasm_to_hi_lo(this.__wbg_ptr, a);
    var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * Returns a single CircuitValue from a hi-lo pair
   *
   * NOTE: this can fail if the hi-lo pair is greater than the Fr modulus.
   * See `check_hi_lo` for what is constrained.
   *
   * * `hi`: the high 128 bits of the CircuitValue
   * * `lo`: the low 128 bits of the CircuitValue
   * @param {number} hi
   * @param {number} lo
   * @returns {number}
   */
  from_hi_lo(hi, lo) {
    const ret = wasm.halo2libwasm_from_hi_lo(this.__wbg_ptr, hi, lo);
    return ret >>> 0;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {string} a_size
   * @param {string} b_size
   * @returns {Uint32Array}
   */
  div_mod_var(a, b, a_size, b_size) {
    const ptr0 = passStringToWasm0(
      a_size,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      b_size,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_div_mod_var(
      this.__wbg_ptr,
      a,
      b,
      ptr0,
      len0,
      ptr1,
      len1
    );
    var v3 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v3;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {string} max_bits
   * @returns {number}
   */
  pow_var(a, b, max_bits) {
    const ptr0 = passStringToWasm0(
      max_bits,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_pow_var(this.__wbg_ptr, a, b, ptr0, len0);
    return ret >>> 0;
  }
  /**
   * @param {Uint32Array} a
   * @returns {number}
   */
  poseidon(a) {
    const ptr0 = passArray32ToWasm0(a, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_poseidon(this.__wbg_ptr, ptr0, len0);
    return ret >>> 0;
  }
  /**
   * @param {string} val
   * @returns {number}
   */
  witness(val) {
    const ptr0 = passStringToWasm0(
      val,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_witness(this.__wbg_ptr, ptr0, len0);
    return ret >>> 0;
  }
  /**
   * @param {string} val
   * @returns {number}
   */
  constant(val) {
    const ptr0 = passStringToWasm0(
      val,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.halo2libwasm_constant(this.__wbg_ptr, ptr0, len0);
    return ret >>> 0;
  }
  /**
   * @param {Halo2Wasm} circuit
   * @param {number} a
   * @param {number} col
   */
  make_public(circuit, a, col) {
    _assertClass(circuit, Halo2Wasm);
    wasm.halo2libwasm_make_public(this.__wbg_ptr, circuit.__wbg_ptr, a, col);
  }
  /**
   * @param {Halo2Wasm} circuit
   * @param {number} a
   */
  log(circuit, a) {
    _assertClass(circuit, Halo2Wasm);
    wasm.halo2libwasm_log(this.__wbg_ptr, circuit.__wbg_ptr, a);
  }
  /**
   * @param {number} a
   * @returns {string}
   */
  value(a) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.halo2libwasm_value(this.__wbg_ptr, a);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {number}
   */
  lookup_bits() {
    const ret = wasm.halo2libwasm_lookup_bits(this.__wbg_ptr);
    return ret >>> 0;
  }
}

const Halo2WasmFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_halo2wasm_free(ptr >>> 0, 1)
      );

export class Halo2Wasm {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Halo2WasmFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_halo2wasm_free(ptr, 0);
  }
  constructor() {
    const ret = wasm.halo2wasm_new();
    this.__wbg_ptr = ret >>> 0;
    Halo2WasmFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  clear() {
    wasm.halo2wasm_clear(this.__wbg_ptr);
  }
  clearInstances() {
    wasm.halo2wasm_clearInstances(this.__wbg_ptr);
  }
  /**
   * @param {Uint8Array} proof
   */
  verify(proof) {
    const ptr0 = passArray8ToWasm0(proof, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2wasm_verify(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {number} col
   * @returns {Uint32Array}
   */
  getInstances(col) {
    const ret = wasm.halo2wasm_getInstances(this.__wbg_ptr, col);
    var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @param {Uint32Array} instances
   * @param {number} col
   */
  setInstances(instances, col) {
    const ptr0 = passArray32ToWasm0(instances, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2wasm_setInstances(this.__wbg_ptr, ptr0, len0, col);
  }
  useInstances() {
    wasm.halo2wasm_useInstances(this.__wbg_ptr);
  }
  /**
   * @param {number} col
   * @returns {any}
   */
  getInstanceValues(col) {
    const ret = wasm.halo2wasm_getInstanceValues(this.__wbg_ptr, col);
    return ret;
  }
  /**
   * @param {CircuitConfig} config
   */
  config(config) {
    wasm.halo2wasm_config(this.__wbg_ptr, config);
  }
  /**
   * @returns {CircuitStats}
   */
  getCircuitStats() {
    const ret = wasm.halo2wasm_getCircuitStats(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {Uint8Array}
   */
  getVk() {
    const ret = wasm.halo2wasm_getVk(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * @returns {Uint8Array}
   */
  getPartialVk() {
    const ret = wasm.halo2wasm_getPartialVk(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * @returns {Uint8Array}
   */
  getPk() {
    const ret = wasm.halo2wasm_getPk(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  assignInstances() {
    wasm.halo2wasm_assignInstances(this.__wbg_ptr);
  }
  mock() {
    wasm.halo2wasm_mock(this.__wbg_ptr);
  }
  /**
   * @param {Uint8Array} params
   */
  loadParams(params) {
    const ptr0 = passArray8ToWasm0(params, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2wasm_loadParams(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Uint8Array} vk
   */
  loadVk(vk) {
    const ptr0 = passArray8ToWasm0(vk, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2wasm_loadVk(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {Uint8Array} pk
   */
  loadPk(pk) {
    const ptr0 = passArray8ToWasm0(pk, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2wasm_loadPk(this.__wbg_ptr, ptr0, len0);
  }
  genVk() {
    wasm.halo2wasm_genVk(this.__wbg_ptr);
  }
  genPk() {
    wasm.halo2wasm_genPk(this.__wbg_ptr);
  }
  /**
   * @returns {Uint8Array}
   */
  prove() {
    const ret = wasm.halo2wasm_prove(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * For console logging only.
   * @param {string} a
   */
  log(a) {
    const ptr0 = passStringToWasm0(
      a,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.halo2wasm_log(this.__wbg_ptr, ptr0, len0);
  }
}

const JsCircuitBn254Fq2Finalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_jscircuitbn254fq2_free(ptr >>> 0, 1)
      );

export class JsCircuitBn254Fq2 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(JsCircuitBn254Fq2.prototype);
    obj.__wbg_ptr = ptr;
    JsCircuitBn254Fq2Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    JsCircuitBn254Fq2Finalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_jscircuitbn254fq2_free(ptr, 0);
  }
  /**
   * @returns {JsCircuitValue256}
   */
  get c0() {
    const ret = wasm.__wbg_get_jscircuitbn254fq2_c0(this.__wbg_ptr);
    return JsCircuitValue256.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} arg0
   */
  set c0(arg0) {
    _assertClass(arg0, JsCircuitValue256);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_jscircuitbn254fq2_c0(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {JsCircuitValue256}
   */
  get c1() {
    const ret = wasm.__wbg_get_jscircuitbn254fq2_c1(this.__wbg_ptr);
    return JsCircuitValue256.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} arg0
   */
  set c1(arg0) {
    _assertClass(arg0, JsCircuitValue256);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_jscircuitbn254fq2_c1(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {JsCircuitValue256} c0
   * @param {JsCircuitValue256} c1
   */
  constructor(c0, c1) {
    _assertClass(c0, JsCircuitValue256);
    var ptr0 = c0.__destroy_into_raw();
    _assertClass(c1, JsCircuitValue256);
    var ptr1 = c1.__destroy_into_raw();
    const ret = wasm.jscircuitbn254fq2_new(ptr0, ptr1);
    this.__wbg_ptr = ret >>> 0;
    JsCircuitBn254Fq2Finalization.register(this, this.__wbg_ptr, this);
    return this;
  }
}

const JsCircuitBn254G1AffineFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_jscircuitbn254g1affine_free(ptr >>> 0, 1)
      );

export class JsCircuitBn254G1Affine {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(JsCircuitBn254G1Affine.prototype);
    obj.__wbg_ptr = ptr;
    JsCircuitBn254G1AffineFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    JsCircuitBn254G1AffineFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_jscircuitbn254g1affine_free(ptr, 0);
  }
  /**
   * @returns {JsCircuitValue256}
   */
  get x() {
    const ret = wasm.__wbg_get_jscircuitbn254fq2_c0(this.__wbg_ptr);
    return JsCircuitValue256.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} arg0
   */
  set x(arg0) {
    _assertClass(arg0, JsCircuitValue256);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_jscircuitbn254fq2_c0(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {JsCircuitValue256}
   */
  get y() {
    const ret = wasm.__wbg_get_jscircuitbn254fq2_c1(this.__wbg_ptr);
    return JsCircuitValue256.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} arg0
   */
  set y(arg0) {
    _assertClass(arg0, JsCircuitValue256);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_jscircuitbn254fq2_c1(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {JsCircuitValue256} x
   * @param {JsCircuitValue256} y
   */
  constructor(x, y) {
    _assertClass(x, JsCircuitValue256);
    var ptr0 = x.__destroy_into_raw();
    _assertClass(y, JsCircuitValue256);
    var ptr1 = y.__destroy_into_raw();
    const ret = wasm.jscircuitbn254fq2_new(ptr0, ptr1);
    this.__wbg_ptr = ret >>> 0;
    JsCircuitBn254G1AffineFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
}

const JsCircuitBn254G2AffineFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_jscircuitbn254g2affine_free(ptr >>> 0, 1)
      );

export class JsCircuitBn254G2Affine {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(JsCircuitBn254G2Affine.prototype);
    obj.__wbg_ptr = ptr;
    JsCircuitBn254G2AffineFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    JsCircuitBn254G2AffineFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_jscircuitbn254g2affine_free(ptr, 0);
  }
  /**
   * @returns {JsCircuitBn254Fq2}
   */
  get x() {
    const ret = wasm.__wbg_get_jscircuitbn254g2affine_x(this.__wbg_ptr);
    return JsCircuitBn254Fq2.__wrap(ret);
  }
  /**
   * @param {JsCircuitBn254Fq2} arg0
   */
  set x(arg0) {
    _assertClass(arg0, JsCircuitBn254Fq2);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_jscircuitbn254g2affine_x(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {JsCircuitBn254Fq2}
   */
  get y() {
    const ret = wasm.__wbg_get_jscircuitbn254g2affine_y(this.__wbg_ptr);
    return JsCircuitBn254Fq2.__wrap(ret);
  }
  /**
   * @param {JsCircuitBn254Fq2} arg0
   */
  set y(arg0) {
    _assertClass(arg0, JsCircuitBn254Fq2);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_jscircuitbn254g2affine_y(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {JsCircuitBn254Fq2} x
   * @param {JsCircuitBn254Fq2} y
   */
  constructor(x, y) {
    _assertClass(x, JsCircuitBn254Fq2);
    var ptr0 = x.__destroy_into_raw();
    _assertClass(y, JsCircuitBn254Fq2);
    var ptr1 = y.__destroy_into_raw();
    const ret = wasm.jscircuitbn254g2affine_new(ptr0, ptr1);
    this.__wbg_ptr = ret >>> 0;
    JsCircuitBn254G2AffineFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
}

const JsCircuitSecp256k1AffineFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_jscircuitsecp256k1affine_free(ptr >>> 0, 1)
      );

export class JsCircuitSecp256k1Affine {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(JsCircuitSecp256k1Affine.prototype);
    obj.__wbg_ptr = ptr;
    JsCircuitSecp256k1AffineFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    JsCircuitSecp256k1AffineFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_jscircuitsecp256k1affine_free(ptr, 0);
  }
  /**
   * @returns {JsCircuitValue256}
   */
  get x() {
    const ret = wasm.__wbg_get_jscircuitbn254fq2_c0(this.__wbg_ptr);
    return JsCircuitValue256.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} arg0
   */
  set x(arg0) {
    _assertClass(arg0, JsCircuitValue256);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_jscircuitbn254fq2_c0(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {JsCircuitValue256}
   */
  get y() {
    const ret = wasm.__wbg_get_jscircuitbn254fq2_c1(this.__wbg_ptr);
    return JsCircuitValue256.__wrap(ret);
  }
  /**
   * @param {JsCircuitValue256} arg0
   */
  set y(arg0) {
    _assertClass(arg0, JsCircuitValue256);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_jscircuitbn254fq2_c1(this.__wbg_ptr, ptr0);
  }
  /**
   * @param {JsCircuitValue256} x
   * @param {JsCircuitValue256} y
   */
  constructor(x, y) {
    _assertClass(x, JsCircuitValue256);
    var ptr0 = x.__destroy_into_raw();
    _assertClass(y, JsCircuitValue256);
    var ptr1 = y.__destroy_into_raw();
    const ret = wasm.jscircuitbn254fq2_new(ptr0, ptr1);
    this.__wbg_ptr = ret >>> 0;
    JsCircuitSecp256k1AffineFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
}

const JsCircuitValue256Finalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_jscircuitvalue256_free(ptr >>> 0, 1)
      );
/**
 * When this type is used, it is **ASSUMED** that the corresponding `hi,lo` [AssignedValue]s have been range checked to be 128 bits each.
 */
export class JsCircuitValue256 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(JsCircuitValue256.prototype);
    obj.__wbg_ptr = ptr;
    JsCircuitValue256Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    JsCircuitValue256Finalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_jscircuitvalue256_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get hi() {
    const ret = wasm.__wbg_get_jscircuitvalue256_hi(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set hi(arg0) {
    wasm.__wbg_set_jscircuitvalue256_hi(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get lo() {
    const ret = wasm.__wbg_get_jscircuitvalue256_lo(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set lo(arg0) {
    wasm.__wbg_set_jscircuitvalue256_lo(this.__wbg_ptr, arg0);
  }
  /**
   * @param {number} hi
   * @param {number} lo
   */
  constructor(hi, lo) {
    const ret = wasm.jscircuitvalue256_new(hi, lo);
    this.__wbg_ptr = ret >>> 0;
    JsCircuitValue256Finalization.register(this, this.__wbg_ptr, this);
    return this;
  }
}

const MyCircuitFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_mycircuit_free(ptr >>> 0, 1)
      );

export class MyCircuit {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    MyCircuitFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_mycircuit_free(ptr, 0);
  }
  /**
   * @param {Halo2Wasm} circuit
   */
  constructor(circuit) {
    _assertClass(circuit, Halo2Wasm);
    const ret = wasm.mycircuit_new(circuit.__wbg_ptr);
    this.__wbg_ptr = ret >>> 0;
    MyCircuitFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {WasmInput} input
   */
  run_with_input(input) {
    wasm.mycircuit_run_with_input(this.__wbg_ptr, input);
  }
  run() {
    wasm.mycircuit_run(this.__wbg_ptr);
  }
}

const Secp256k1AffinePointFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_secp256k1affinepoint_free(ptr >>> 0, 1)
      );

export class Secp256k1AffinePoint {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Secp256k1AffinePoint.prototype);
    obj.__wbg_ptr = ptr;
    Secp256k1AffinePointFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Secp256k1AffinePointFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_secp256k1affinepoint_free(ptr, 0);
  }
  /**
   * @returns {Secp256k1FpPoint}
   */
  x() {
    const ret = wasm.secp256k1affinepoint_x(this.__wbg_ptr);
    return Secp256k1FpPoint.__wrap(ret);
  }
  /**
   * @returns {Secp256k1FpPoint}
   */
  y() {
    const ret = wasm.secp256k1affinepoint_y(this.__wbg_ptr);
    return Secp256k1FpPoint.__wrap(ret);
  }
}

const Secp256k1FpPointFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_secp256k1fppoint_free(ptr >>> 0, 1)
      );
/**
 * We use 3 limbs with 88 bits each.
 * NOT constrained to be less than the prime.
 */
export class Secp256k1FpPoint {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Secp256k1FpPoint.prototype);
    obj.__wbg_ptr = ptr;
    Secp256k1FpPointFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Secp256k1FpPointFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_secp256k1fppoint_free(ptr, 0);
  }
  /**
   * @param {Halo2LibWasm} lib_wasm
   * @returns {JsCircuitValue256}
   */
  to_circuit_value_256(lib_wasm) {
    _assertClass(lib_wasm, Halo2LibWasm);
    const ret = wasm.bn254fqpoint_to_circuit_value_256(
      this.__wbg_ptr,
      lib_wasm.__wbg_ptr
    );
    return JsCircuitValue256.__wrap(ret);
  }
}

const Secp256k1FqPointFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_secp256k1fqpoint_free(ptr >>> 0, 1)
      );
/**
 * We use 3 limbs with 88 bits each.
 * NOT constrained to be less than the prime.
 */
export class Secp256k1FqPoint {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Secp256k1FqPointFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_secp256k1fqpoint_free(ptr, 0);
  }
  /**
   * @param {Halo2LibWasm} lib_wasm
   * @returns {JsCircuitValue256}
   */
  to_circuit_value_256(lib_wasm) {
    _assertClass(lib_wasm, Halo2LibWasm);
    const ret = wasm.bn254fqpoint_to_circuit_value_256(
      this.__wbg_ptr,
      lib_wasm.__wbg_ptr
    );
    return JsCircuitValue256.__wrap(ret);
  }
}

const wbg_rayon_PoolBuilderFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_wbg_rayon_poolbuilder_free(ptr >>> 0, 1)
      );

export class wbg_rayon_PoolBuilder {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
    obj.__wbg_ptr = ptr;
    wbg_rayon_PoolBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    wbg_rayon_PoolBuilderFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wbg_rayon_poolbuilder_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  numThreads() {
    const ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  receiver() {
    const ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
    return ret >>> 0;
  }
  build() {
    wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
  }
}

async function __wbg_load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn(
            '`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
            e
          );
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_buffer_61b7ce01341d7f88 = function (arg0) {
    const ret = arg0.buffer;
    return ret;
  };
  imports.wbg.__wbg_call_500db948e69c7330 = function () {
    return handleError(function (arg0, arg1, arg2) {
      const ret = arg0.call(arg1, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_call_b0d8e36992d9900d = function () {
    return handleError(function (arg0, arg1) {
      const ret = arg0.call(arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_crypto_ed58b8e10a292839 = function (arg0) {
    const ret = arg0.crypto;
    return ret;
  };
  imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function (arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
      deferred0_0 = arg0;
      deferred0_1 = arg1;
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
  };
  imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function () {
    return handleError(function (arg0, arg1) {
      arg0.getRandomValues(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_get_9aa3dff3f0266054 = function (arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
  };
  imports.wbg.__wbg_getwithrefkey_bb8f74a92cb2e784 = function (arg0, arg1) {
    const ret = arg0[arg1];
    return ret;
  };
  imports.wbg.__wbg_instanceof_ArrayBuffer_670ddde44cdb2602 = function (arg0) {
    let result;
    try {
      result = arg0 instanceof ArrayBuffer;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Uint8Array_28af5bc19d6acad8 = function (arg0) {
    let result;
    try {
      result = arg0 instanceof Uint8Array;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_isSafeInteger_12f5549b2fca23f4 = function (arg0) {
    const ret = Number.isSafeInteger(arg0);
    return ret;
  };
  imports.wbg.__wbg_length_65d1cd11729ced11 = function (arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_length_d65cf0786bfc5739 = function (arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_log_9eddeed1625fb078 = function (arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function (arg0) {
    const ret = arg0.msCrypto;
    return ret;
  };
  imports.wbg.__wbg_new_254fa9eac11932ae = function () {
    const ret = new Array();
    return ret;
  };
  imports.wbg.__wbg_new_3ff5b33b1ce712df = function (arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_8a6f238a6ece86ea = function () {
    const ret = new Error();
    return ret;
  };
  imports.wbg.__wbg_newnoargs_fd9e4bf8be2bc16d = function (arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_ba35896968751d91 = function (
    arg0,
    arg1,
    arg2
  ) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithlength_34ce8f1051e74449 = function (arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_node_02999533c4ea02e3 = function (arg0) {
    const ret = arg0.node;
    return ret;
  };
  imports.wbg.__wbg_parse_161c68378e086ae1 = function () {
    return handleError(function (arg0, arg1) {
      const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_process_5c1d670bc53614b8 = function (arg0) {
    const ret = arg0.process;
    return ret;
  };
  imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function () {
    return handleError(function (arg0, arg1) {
      arg0.randomFillSync(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_require_79b1e9274cde3c87 = function () {
    return handleError(function () {
      const ret = module.require;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_set_1d80752d0d5f0b21 = function (arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
  };
  imports.wbg.__wbg_set_23d69db4e5c66a6e = function (arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_stack_0ed75d68575b0f3c = function (arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(
      ret,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_startWorkers_c4ee23a287daf22c = function (
    arg0,
    arg1,
    arg2
  ) {
    const ret = startWorkers(arg0, arg1, wbg_rayon_PoolBuilder.__wrap(arg2));
    return ret;
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_0be7472e492ad3e3 = function () {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb = function () {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_SELF_1dc398a895c82351 = function () {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_WINDOW_ae1c80c7eea8d64a = function () {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_stringify_f4f701bc34ceda61 = function () {
    return handleError(function (arg0) {
      const ret = JSON.stringify(arg0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_subarray_46adeb9b86949d12 = function (arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function (arg0) {
    const ret = arg0.versions;
    return ret;
  };
  imports.wbg.__wbindgen_bigint_from_u64 = function (arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return ret;
  };
  imports.wbg.__wbindgen_bigint_get_as_i64 = function (arg0, arg1) {
    const v = arg1;
    const ret = typeof v === 'bigint' ? v : undefined;
    getDataViewMemory0().setBigInt64(
      arg0 + 8 * 1,
      isLikeNone(ret) ? BigInt(0) : ret,
      true
    );
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbindgen_boolean_get = function (arg0) {
    const v = arg0;
    const ret = typeof v === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
  };
  imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(
      ret,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_error_new = function (arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbindgen_in = function (arg0, arg1) {
    const ret = arg0 in arg1;
    return ret;
  };
  imports.wbg.__wbindgen_init_externref_table = function () {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
  };
  imports.wbg.__wbindgen_is_bigint = function (arg0) {
    const ret = typeof arg0 === 'bigint';
    return ret;
  };
  imports.wbg.__wbindgen_is_function = function (arg0) {
    const ret = typeof arg0 === 'function';
    return ret;
  };
  imports.wbg.__wbindgen_is_object = function (arg0) {
    const val = arg0;
    const ret = typeof val === 'object' && val !== null;
    return ret;
  };
  imports.wbg.__wbindgen_is_string = function (arg0) {
    const ret = typeof arg0 === 'string';
    return ret;
  };
  imports.wbg.__wbindgen_is_undefined = function (arg0) {
    const ret = arg0 === undefined;
    return ret;
  };
  imports.wbg.__wbindgen_jsval_eq = function (arg0, arg1) {
    const ret = arg0 === arg1;
    return ret;
  };
  imports.wbg.__wbindgen_jsval_loose_eq = function (arg0, arg1) {
    const ret = arg0 == arg1;
    return ret;
  };
  imports.wbg.__wbindgen_memory = function () {
    const ret = wasm.memory;
    return ret;
  };
  imports.wbg.__wbindgen_module = function () {
    const ret = __wbg_init.__wbindgen_wasm_module;
    return ret;
  };
  imports.wbg.__wbindgen_number_get = function (arg0, arg1) {
    const obj = arg1;
    const ret = typeof obj === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(
      arg0 + 8 * 1,
      isLikeNone(ret) ? 0 : ret,
      true
    );
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbindgen_string_get = function (arg0, arg1) {
    const obj = arg1;
    const ret = typeof obj === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret)
      ? 0
      : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
  };
  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };

  return imports;
}

function __wbg_init_memory(imports, memory) {
  imports.wbg.memory =
    memory ||
    new WebAssembly.Memory({ initial: 51, maximum: 65536, shared: true });
}

function __wbg_finalize_init(instance, module, thread_stack_size) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedDataViewMemory0 = null;
  cachedUint32ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;

  if (
    typeof thread_stack_size !== 'undefined' &&
    (typeof thread_stack_size !== 'number' ||
      thread_stack_size === 0 ||
      thread_stack_size % 65536 !== 0)
  ) {
    throw 'invalid stack size';
  }
  wasm.__wbindgen_start(thread_stack_size);
  return wasm;
}

function initSync(module, memory) {
  if (wasm !== undefined) return wasm;

  let thread_stack_size;
  if (typeof module !== 'undefined') {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module, memory, thread_stack_size } = module);
    } else {
      console.warn(
        'using deprecated parameters for `initSync()`; pass a single object instead'
      );
    }
  }

  const imports = __wbg_get_imports();

  __wbg_init_memory(imports, memory);

  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }

  const instance = new WebAssembly.Instance(module, imports);

  return __wbg_finalize_init(instance, module, thread_stack_size);
}

async function __wbg_init(module_or_path, memory) {
  if (wasm !== undefined) return wasm;

  let thread_stack_size;
  if (typeof module_or_path !== 'undefined') {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path, memory, thread_stack_size } = module_or_path);
    } else {
      console.warn(
        'using deprecated parameters for the initialization function; pass a single object instead'
      );
    }
  }

  if (typeof module_or_path === 'undefined') {
    module_or_path = new URL('wasm_bg.wasm', import.meta.url);
  }
  const imports = __wbg_get_imports();

  if (
    typeof module_or_path === 'string' ||
    (typeof Request === 'function' && module_or_path instanceof Request) ||
    (typeof URL === 'function' && module_or_path instanceof URL)
  ) {
    module_or_path = fetch(module_or_path);
  }

  __wbg_init_memory(imports, memory);

  const { instance, module } = await __wbg_load(await module_or_path, imports);

  return __wbg_finalize_init(instance, module, thread_stack_size);
}

export { initSync };
export default __wbg_init;
