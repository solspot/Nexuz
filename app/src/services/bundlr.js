import { SolanaBundlr } from '@bundlr-network/solana-web';
import BigNumber from 'bignumber.js';

// initialize the bundlr instance to operate in future
const initBundlr = async (wallet) => {
  let bundlerHttpAddress = 'https://node1.bundlr.network';
  let rpcUrl =
    'https://summer-young-wildflower.solana-mainnet.discover.quiknode.pro/096d1990d053a1323bf1c973aaff56100ad53f80';
  let contractAddress;

  const localBundlr = new SolanaBundlr(bundlerHttpAddress, wallet.adapter, {
    providerUrl: rpcUrl,
    contractAddress
  });

  try {
    await localBundlr.utils.getBundlerAddress('solana');
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    await localBundlr.ready();
  } catch (err) {
    console.log(err);
  }

  if (!localBundlr.address) {
    console.log('something went wrong');
  }
  return localBundlr;
};

// parse decimal input into atomic units
const parseInput = (input) => {
  const conv = new BigNumber(input);
  if (conv.isLessThan(1)) {
    console.log('value too small');
    return;
  }
  return conv;
};

export { initBundlr, parseInput };
