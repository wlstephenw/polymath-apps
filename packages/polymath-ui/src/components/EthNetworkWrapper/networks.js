// @flow

type Network = {
  name: string,
  url: string,
};

export const NETWORK_MAIN = '1';
export const NETWORK_ROPSTEN = '3';
export const NETWORK_RINKEBY = '4';
export const NETWORK_KOVAN = '42';
export const NETWORK_LOCAL = '15';
export const NETWORK_LOCALVM = '16';

export function getNetworkInfos(id: string = NETWORK_LOCAL): Network {
  const networks = {
    [NETWORK_MAIN]: {
      name: 'Mainnet',
      url: process.env.REACT_APP_NETWORK_MAIN_WS,
    },
    [NETWORK_ROPSTEN]: {
      name: 'Ropsten Testnet',
      url: 'wss://ropsten.infura.io/ws',
    },
    [NETWORK_RINKEBY]: {
      name: 'Rinkeby Testnet',
      url: 'wss://rinkeby.infura.io/ws',
    },
    [NETWORK_KOVAN]: {
      name: 'Kovan Testnet',
      url: process.env.REACT_APP_NETWORK_KOVAN_WS,
    },
    [NETWORK_LOCAL]: {
      name: 'Localhost',
      url: process.env.REACT_APP_NETWORK_LOCAL_WS,
    },
    [NETWORK_LOCALVM]: {
      name: 'LocalVM',
      url: process.env.REACT_APP_NETWORK_LOCALVM_WS,
    },
  };

  return networks[id];
}
