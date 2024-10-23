'use strict';
self.onmessage = function (e) {
  try {
    console.log('Worker Initiated');
    setTimeout(function () {
      console.log('Done with setTimeout');
      console.log('Worker Result', e.data);
      postMessage(e.data);
    }, 20000);
    // const result = await generateUserProof(e.data);
  } catch (error) {
    console.error('Error in worker:', error);
    postMessage({ error: error.message });
  }
};
