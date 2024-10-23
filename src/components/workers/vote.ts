self.onmessage = (e) => {
  try {
    console.log('Worker Initiated');
    setTimeout(() => {
      console.log('Done with setTimeout');
      console.log('Worker Result', e.data);
      postMessage(e.data);
    }, 20000);
    // const result = await generateUserProof(e.data);
  } catch (error: any) {
    console.error('Error in worker:', error);
    postMessage({ error: error.message });
  }
};
