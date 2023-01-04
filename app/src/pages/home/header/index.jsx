import React from 'react';

// libs
import { useNavigate } from 'react-router-dom';
import { styled, useTheme, useMediaQuery } from '@mui/material';

// local
import Row from 'components/row';
import DrawerMenu from './drawerMenu';
import CustomButton from 'components/button';
import NexuzLogo from 'assets/logo';

const Root = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  zIndex: 10,
  height: 'auto',
  width: '100%',
  display: 'flex',
  flexDirection: 'row'
}));

const Logo = styled(NexuzLogo)(({ theme }) => ({
  position: 'absolute',
  cursor: 'pointer',
  top: 5,
  left: 5,
  maxHeight: 80,
  height: 80,
  zIndex: 10,
  [theme.breakpoints.down('sm')]: {
    maxHeight: 65
  }
}));

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Root>
      <Logo
        sx={{
          fill: theme.palette.accent.main,
          filter: 'drop-shadow(' + theme.palette.accent.second + ' 1.5px 1.5px)'
        }}
      />
      {mobile ? (
        <DrawerMenu />
      ) : (
        <Row>
          <CustomButton sx={{ ml: 'auto' }} onClick={() => navigate('manage')}>
            Sign In
          </CustomButton>
        </Row>
      )}
    </Root>
  );
};

export default Header;

/*
  const LogoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.main,
    fontFamily: 'Alfa Slab One, Sans-Serif',
    cursor: 'pointer',
    fontSize: 26,
    userSelect: 'none',
    fontWeight: 400
  }));

  <LogoText>
    NEXUZ<span style={{ fontSize: '1rem' }}>.me</span>
  </LogoText>
*/
