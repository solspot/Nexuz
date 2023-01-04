import React, { useMemo, useState, useEffect } from 'react';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SnackbarProvider } from 'notistack';
import('@solana/wallet-adapter-react-ui/styles.css');
import Router from './routes.jsx';
import { useTheme, useMediaQuery } from '@mui/material';

const App = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SlopeWalletAdapter({ network }),
      new LedgerWalletAdapter()
    ],
    []
  );

  // adjust snackbars for mobile
  const theme = useTheme();
  const phoneOrTablet = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const [smallWidth, setSmallWidth] = useState(true);

  // UseEffects
  useEffect(() => {
    setSmallWidth(phoneOrTablet);
  }, [phoneOrTablet]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{
              vertical: smallWidth ? 'top' : 'bottom',
              horizontal: 'right'
            }}>
            <Router />
          </SnackbarProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
