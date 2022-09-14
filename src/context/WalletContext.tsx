import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard';
import { API } from 'bnc-onboard/dist/src/interfaces';
import { ethers } from 'ethers';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { bncDappId, infuraKey, networkId } from '../config';
import { ALLOWED_CHAIN_IDS } from '../constants';
import { getItem, removeItem, setItem } from '../utils';

interface WalletContextValue {
  onboard: API | null;
  notify: any;
  web3Provider: ethers.providers.Web3Provider | null;
  address: string | null;
  network: number | null;
  selectWallet(): any;
  checkWallet(): any;
  logoutWallet(): any;
  isRightNetwork(): boolean;
}

const chainId = networkId ? networkId : 1;

const wallets: any[] = [];

export const setupWallets = () => {
  if (infuraKey) {
    wallets.push({
      infuraKey,
      preferred: true,
      walletName: 'walletConnect',
    });
  }
};

const WalletContext = createContext<WalletContextValue>({
  address: null,
  checkWallet: () => {},
  isRightNetwork: () => false,
  logoutWallet: () => {},
  network: null,
  notify: null,
  onboard: null,
  selectWallet: () => {},
  web3Provider: null,
});

const WalletProvider = ({ children }: any) => {
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<number | null>(null);
  const [onboard, setOnboard] = useState<API | null>(null);
  const [notify, setNotify] = useState<any>(null);

  useEffect(() => {
    const onboard = Onboard({
      dappId: bncDappId,
      darkMode: true,
      hideBranding: true,
      networkId: chainId,
      subscriptions: {
        address: (address) =>
          address ? setAddress(ethers.utils.getAddress(address)) : '',
        network: setNetwork,
        wallet: (wallet) => {
          if (wallet.provider) {
            const ethersProvider = new ethers.providers.Web3Provider(
              wallet.provider
            );
            setWeb3Provider(ethersProvider);

            setItem('selectedWallet', wallet.name);
          } else {
            setWeb3Provider(null);
            removeItem('selectedWallet');
          }
        },
      },
      walletCheck: [{ checkName: 'connect' }, { checkName: 'network' }],
      walletSelect: {
        wallets: [
          { preferred: true, walletName: 'metamask' },
          ...(ALLOWED_CHAIN_IDS.includes(chainId) ? wallets : []),
        ],
      },
    });

    const notify = Notify({
      dappId: bncDappId,
      darkMode: true,
      networkId: chainId,
    });

    setOnboard(onboard);
    setNotify(notify);
  }, []);

  const getProviderNetwork = useCallback(async () => {
    try {
      return await web3Provider?.getNetwork();
    } catch (e: any) {
      if (e.network) {
        return e.network;
      }
      return null;
    }
  }, [web3Provider]);

  const checkWallet = useCallback(async () => {
    return onboard?.walletCheck();
  }, [onboard]);

  const selectWallet = useCallback(async () => {
    const walletSelected = await onboard?.walletSelect();

    if (walletSelected) {
      await onboard?.walletCheck();
    }
  }, [onboard]);

  const logoutWallet = useCallback(async () => {
    setAddress(null);
    return onboard?.walletReset();
  }, [onboard]);

  useEffect(() => {
    const previouslySelectedWallet = getItem('selectedWallet');

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  const reloadWalletOnNetworkChange = useCallback(async () => {
    if (!network) return;

    const providerNetwork = await getProviderNetwork();

    const userState = await onboard?.getState();
    const wallet = userState && userState.wallet;
    if (!wallet || !wallet.name) return;

    if (providerNetwork && providerNetwork.chainId !== network) {
      await onboard?.walletReset();

      await onboard?.walletSelect(wallet.name);
    }

    if (providerNetwork && providerNetwork.chainId !== chainId) {
      await onboard?.walletCheck();
    }
  }, [onboard, getProviderNetwork, network]);

  useEffect(() => {
    reloadWalletOnNetworkChange();
  }, [reloadWalletOnNetworkChange]);

  const isRightNetwork = () => network === chainId;

  return (
    <WalletContext.Provider
      value={{
        address,
        checkWallet,
        isRightNetwork,
        logoutWallet,
        network,
        notify,
        onboard,
        selectWallet,
        web3Provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export { useWallet, WalletProvider };
