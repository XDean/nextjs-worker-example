addEventListener('message', async (event: MessageEvent<number>) => {
  const n = event.data;
  let v = 0;
  for (let i = 1; i <= n; i += 4) {
    v += 1 / i - 1 / (i + 2); // add the value of the series
    postMessage(4 * v);
  }
});
