import { https } from 'https';

import init, {
  Halo2Wasm,
  initPanicHook,
  initThreadPool,
  MyCircuit,
} from '../../../wasm/pkg/wasm';

function padTo64(hex) {
  return hex.padStart(64, '0');
}

await init();
console.log('Wasm initialized');

initPanicHook();
console.log('Panic hook initialized');

await initThreadPool(navigator.hardwareConcurrency);
console.log('Thread pool initialized');

self.onmessage = async (e) => {
  try {
    const input = e.data.proofInputs;
    const keys = e.data.keys;
    console.log('input', input, keys);
    const wasmInput = {
      pkEnc: {
        n: '0x' + BigInt(input.enc_pub.n).toString(16),
        g: '0x' + BigInt(input.enc_pub.g).toString(16),
      },
      nullifier: '0x' + input.nullifier.toString(16),
      proposalId: '0x' + padTo64(input.proposal_id.toString()),
      vote: input.vote.map((v) => '0x' + padTo64(v.toString())),
      voteEnc: input.vote_enc.map((v) => '0x' + BigInt(v).toString(16)),
      rEnc: input.r_enc.map((v) => '0x' + BigInt(v).toString(16)),
    };
    console.log('wasmInput', wasmInput);

    const halo2wasm = new Halo2Wasm();
    console.log('Halo2Wasm instance created');

    halo2wasm.config({
      k: 15,
      numAdvice: 50,
      numLookupAdvice: 11,
      numInstance: 1,
      numLookupBits: 14,
      numVirtualInstance: 1,
    });
    console.log('Halo2Wasm configured');
    halo2wasm.loadVk(keys.vk_15);
    console.log('VK loaded');
    halo2wasm.loadPk(keys.pk_15);
    console.log('PK loaded');

    const myCircuit = new MyCircuit(halo2wasm);
    console.log('MyCircuit instance created');

    myCircuit.run_with_input(wasmInput);
    console.log('MyCircuit run method called');

    halo2wasm.useInstances();
    console.log('Instances used');

    const instanceValues = halo2wasm.getInstanceValues(0);
    console.log('instanceValues:', instanceValues);

    const instances = halo2wasm.getInstances(0);
    console.log('instances:', instances);

    const stats = halo2wasm.getCircuitStats();
    console.log('Circuit stats:', stats);

    const params = await getKzgParams(15);
    console.log('KZG params:', params);

    halo2wasm.loadParams(params);
    console.log('KZG params loaded');

    halo2wasm.mock();
    console.log('Circuit mocked');

    // const start = performance.now();
    // halo2wasm.genVk();
    // const end = performance.now();
    // console.log('Verification key generated in', end - start, 'milliseconds');

    // const pkStart = performance.now();
    // halo2wasm.genPk();
    // console.log('Prover key generated');
    // const pkEnd = performance.now();
    // console.log('Proving key generated in', pkEnd - pkStart, 'milliseconds');

    const proofStart = performance.now();
    const proof = halo2wasm.prove();
    const proofEnd = performance.now();
    console.log(
      'Proof generated:',
      proof,
      'in',
      proofEnd - proofStart,
      'milliseconds'
    );

    const verifyStart = performance.now();
    halo2wasm.verify(proof);
    const verifyEnd = performance.now();
    console.log('Proof verified in', verifyEnd - verifyStart, 'milliseconds');
    postMessage({ proof: proof, instances: instanceValues });
  } catch (error) {
    console.error('Error in worker:', error);
    postMessage({ error: error.message });
  }
};

const fetchAndConvertToUint8Array = (url) => {
  return new Promise((resolve, reject) => {
    // Check if running in Node.js environment
    if (
      typeof process !== 'undefined' &&
      process.versions &&
      process.versions.node
    ) {
      https.get(url, (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const binaryData = Buffer.concat(chunks);
          resolve(new Uint8Array(binaryData));
        });
        res.on('error', reject);
      });
    }
    // Check if running in browser or web worker environment
    else if (typeof window !== 'undefined' || typeof self !== 'undefined') {
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          resolve(new Uint8Array(buffer));
        })
        .catch(reject);
    } else {
      reject(new Error('Environment not supported'));
    }
  });
};

const getKzgParams = async (k) => {
  if (k < 6 || k > 19) {
    throw new Error(`k=${k} is not supported`);
  }
  const response = await fetch(
    `https://axiom-crypto.s3.amazonaws.com/challenge_0085/kzg_bn254_${k}.srs`
  );
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
};
