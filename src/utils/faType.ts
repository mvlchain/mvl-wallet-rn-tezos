export const faType = (contractAddress: string) => {
  const test_tzBTC = 'KT1Wdq6sj3ZkNqQ7CeE6kTNbJXfobMX7Eqpz';
  const main_tzBTC = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn';
  const test_kUSD = 'KT1GG8Zd5rUp1XV8nMPRBY2tSyVn6NR5F4Q1';
  const main_kUSD = 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV';
  const test_QUIPU = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c';
  const main_QUIPU = 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb';
  const fa1_2Arr = [test_tzBTC, test_kUSD, main_tzBTC, main_kUSD];
  const fa2Arr = [test_QUIPU, main_QUIPU];
  if (fa1_2Arr.includes(contractAddress)) {
    return 'fa12';
  } else {
    return 'fa2';
  }
};
