import React, { useState, useEffect, useRef } from 'react';

// libs
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import PropTypes from 'prop-types';
import {
  Input,
  styled,
  Fade,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@mui/material';

//local
import { initializeProfile } from 'services/interface';
import useCustomSnackbar from 'components/snackbars/useCustomSnackbar.jsx';
import Text from 'components/text';
import CustomButton from 'components/button';
import { formatAddress } from 'services/utils';
import NexuzLogo from 'assets/logo.jsx';
import './styles.css';

import HomeBottomWave from 'assets/elements/homeBottomWave';
import HomeTopWave from 'assets/elements/homeTopWave';

const cost = 0.172;

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
}));

const InputStyled = styled(Input)(({ theme }) => ({
  borderRadius: 14,
  color: theme.palette.neutral.black,
  backgroundColor: theme.palette.neutral.white,
  border: '3px solid',
  borderColor: 'rgba(0,0,0,0)',
  padding: '10px 24px',
  fontSize: 16,
  width: '100%',
  maxWidth: 550,
  '&.Mui-focused': {
    border: '3px solid',
    borderColor: theme.palette.accent.second
  }
}));

const CenterContent = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 550,
  minWidth: 550,
  height: 350,
  border: '1.5px solid',
  borderColor: 'rgba(0,0,0,0)',
  padding: '10px 24px',
  borderRadius: 20,
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    width: '100%',
    padding: '0 10px'
  }
}));

const SlideItem = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  maxWidth: 550,
  width: 555,
  height: 350,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    width: '100%',
    padding: '0 10px'
  }
}));

const Logo = styled(NexuzLogo)(({ theme }) => ({
  position: 'absolute',
  cursor: 'pointer',
  top: 5,
  left: 5,
  maxWidth: 180,
  maxHeight: 80,
  height: 80,
  zIndex: 10,
  [theme.breakpoints.down('sm')]: {
    maxHeight: 65
  }
}));

const Login = ({ loadProfile }) => {
  // hooks
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const { newUsername } = useParams();
  const { sendSnackbar, closeSnackbar } = useCustomSnackbar();

  let { publicKey, disconnect, sendTransaction } = useWallet();

  // state
  const [stage, setStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(newUsername ? newUsername : '');

  const handleInput = (e) => {
    if (e.target.id === 'username') {
      let { value } = e.target;
      value = value.replace(/[^a-z0-9]/gi, '');
      if (value.length > 20) return;
      setUsername(value.toLowerCase());
    }
  };

  const handleLoad = async () => {
    if (!publicKey) return;
    setIsLoading(true);
    let res = await loadProfile(false);
    if (!res) {
      setIsLoading(false);
      setStage(3);
      sessionStorage.setItem('tutorial', true);
    }
  };

  const handleCreateAccount = async () => {
    try {
      if (!publicKey) throw new Error('No wallet attached.');
      if (username === '') throw new Error('Username cannot be empty');

      sendSnackbar('Creating account...', {
        variant: 'loading',
        persist: true
      });

      let confirmation = await initializeProfile(publicKey, sendTransaction, username);
      if (confirmation.value.err) throw new Error(confirmation.value.err);

      closeSnackbar();
      let res = await loadProfile(true);

      if (!res) {
        sessionStorage.setItem('tutorial', true);
      }
    } catch (err) {
      console.log('Err: ', err);
      closeSnackbar();
      sendSnackbar('' + err, {
        variant: 'error'
      });
    }
  };

  useEffect(() => {
    if (!publicKey) {
      setStage(1);
    } else {
      setStage(2);
    }
  }, [publicKey]);
  return (
    <Root>
      <Logo
        onClick={() => navigate('/')}
        sx={{
          fill: theme.palette.accent.main,
          filter: 'drop-shadow(' + theme.palette.accent.second + ' 1.5px 1.5px)'
        }}
      />

      <HomeTopWave
        style={{
          zIndex: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          width: 'auto',
          maxWidth: '100vw'
        }}
        fill={theme.palette.primary.second}
        stroke={theme.palette.primary.third}
      />
      <HomeBottomWave
        style={{
          zIndex: 0,
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 'auto',
          maxWidth: '100vw',
          height: 300
        }}
        fill={theme.palette.primary.second}
        stroke={theme.palette.primary.third}
      />

      {publicKey && (
        <CustomButton
          className="relative"
          onClick={() => disconnect()}
          sx={{ position: 'absolute', top: 0, right: 5 }}>
          Disconnect
        </CustomButton>
      )}
      <CenterContent ref={containerRef}>
        <Fade
          direction="left"
          in={stage === 1}
          container={containerRef.current}
          mountOnEnter
          unmountOnExit
          timeout={0}>
          <SlideItem>
            <Typography
              variant="h3"
              color="accent.main"
              sx={{
                mb: 2,
                mt: -10,
                fontFamily: theme.font.display,
                textShadow: theme.palette.accent.second + ' 3px 3px',
                fontSize: mobile && '2.5rem'
              }}>
              Connect Wallet
            </Typography>
            <WalletMultiButton
              className="relative"
              style={{ backgroundColor: '#000000 !important' }}
            />
          </SlideItem>
        </Fade>

        <Fade
          direction="left"
          in={stage === 2}
          container={containerRef.current}
          mountOnEnter
          unmountOnExit
          timeout={0}>
          <SlideItem>
            <Typography
              variant="h3"
              color="accent.main"
              sx={{
                mb: 1,
                mt: -10,
                fontFamily: theme.font.display,
                textShadow: theme.palette.accent.second + ' 3px 3px',
                fontSize: mobile && '2.5rem',
                textAlign: 'center'
              }}>
              Sign in to Nexuz
            </Typography>
            <CustomButton
              sx={{ ml: mobile ? 1.5 : 0, mt: 2, fontSize: mobile && '1.15rem' }}
              onClick={() => handleLoad()}>
              {isLoading
                ? 'Loading...'
                : 'Connect with ' + formatAddress(publicKey ? publicKey.toString() : '')}
            </CustomButton>
          </SlideItem>
        </Fade>

        <Fade
          direction="left"
          container={containerRef.current}
          in={stage === 3}
          mountOnEnter
          unmountOnExit>
          <SlideItem>
            <Typography
              variant="h3"
              color="accent.main"
              sx={{
                mb: 1,
                mt: -10,
                fontFamily: theme.font.display,
                textShadow: theme.palette.accent.second + ' 3px 3px',
                textAlign: 'left',
                width: '100%',
                fontSize: mobile && '2.5rem'
              }}>
              Create your account
            </Typography>
            <Text
              type="desc"
              sx={{
                lineHeight: 1.25,
                mb: 3,
                fontWeight: 400,
                color: theme.palette.text.main,
                fontFamily: theme.font.main,
                fontSize: '1.3rem'
              }}>
              You will be charged{' '}
              <span style={{ color: theme.palette.accent.main, fontWeight: 700 }}>{cost} SOL</span>{' '}
              to store your data on the Solana blockchain. The program cost of{' '}
              <span style={{ color: theme.palette.accent.main, fontWeight: 700 }}>0.072 SOL</span>{' '}
              is refundable at anytime by deleting your account.
            </Text>

            <InputStyled
              id="username"
              placeholder="username"
              disableUnderline={true}
              value={username}
              onChange={handleInput}
              startAdornment={
                <InputAdornment position="start" sx={{ mr: 0 }}>
                  <Typography sx={{ mr: 0, color: theme.palette.neutral.black }}>
                    https://nexuz.me/
                  </Typography>
                </InputAdornment>
              }
            />
            <CustomButton
              onClick={() => handleCreateAccount()}
              disabled={username === ''}
              sx={{ color: username === '' ? 0.4 : 1, ml: 'auto' }}>
              Create Nexuz
            </CustomButton>
          </SlideItem>
        </Fade>
      </CenterContent>
    </Root>
  );
};

Login.propTypes = {
  loadProfile: PropTypes.func.isRequired
};

export default Login;
