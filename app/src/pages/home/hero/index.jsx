import React, { useState } from 'react';

// libs
import { useNavigate } from 'react-router-dom';
import { Typography, styled, useTheme, useMediaQuery, Input } from '@mui/material';

// local
import Row from 'components/row';
import Squiggle from 'assets/elements/squiggle2';
import Dots2 from 'assets/elements/dots2';
import Dots3 from 'assets/elements/dots3';
import CustomButton from 'components/button';
import HomeBottomWave from 'assets/elements/homeBottomWave';
import HomeTopWave from 'assets/elements/homeTopWave';

const Root = styled('div')(({ theme }) => ({
  height: 'auto',
  minHeight: '100vh',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    padding: 0,
    margin: 0,
    width: '100%',
    minHeight: '100vh',
    paddingTop: '12vh'
  }
}));

const Block = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: 40
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: theme.font.display,
  fontWeight: 400,
  color: theme.palette.accent.main,
  fontSize: '7.5rem',
  lineHeight: 1.1,
  textShadow: theme.palette.accent.second + ' 5px 5px',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
    fontSize: '5rem'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    fontSize: '2rem',
    zIndex: 10,
    padding: '0px 10px',
    letterSpacing: 2,
    textShadow: theme.palette.accent.second + ' 3px 3px'
  }
}));

const Desc = styled(Typography)(({ theme }) => ({
  maxWidth: 750,
  width: '90%',
  fontSize: '2.2rem',
  fontFamily: theme.font.alt,
  color: theme.palette.text.main,
  lineHeight: 1.1,
  fontWeight: 500,
  textAlign: 'center',
  zIndex: 10,
  marginTop: 30,
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    width: '90vw',
    fontSize: '1.2rem',
    zIndex: 10,
    padding: '10px 0px',
    marginBottom: 0,
    letterSpacing: 1
  }
}));

const Hero = () => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const mobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const handleValue = (event) => {
    let { value } = event.target;
    value = value.replace(/[^a-z0-9]/gi, '');
    if (value.length > 20) return;
    setValue(value.toLowerCase());
  };

  const handleClaim = () => {
    if (value.length === 0) return;
    navigate('/manage/' + value);
  };

  return (
    <Root>
      <Block>
        <Title
          variant="h1"
          sx={{
            mt: mobile ? '18vh' : '25vh',
            textShadow: theme.mode === 'home1' && '#044387' + ' 5px 5px'
          }}>
          Your Digital You.
        </Title>
        <Title
          variant="h1"
          sx={{
            mb: mobile ? 0.5 : 2,
            color: theme.mode === 'home1' && '#044387',
            textShadow: theme.mode === 'home1' && theme.palette.accent.main + ' 5px 5px'
          }}>
          All in One Spot.
        </Title>
        <Desc variant="h6">
          Nexuz is your singular link to create, showcase, and share your online ventures with the
          world.
        </Desc>
        <Row sx={{ justifyContent: 'center', mt: mobile ? 0 : 3, width: '90%' }}>
          <Input
            fullWidth
            disableUnderline
            placeholder="name"
            value={value}
            onChange={(e) => handleValue(e)}
            startAdornment={
              <Typography
                sx={{
                  fontFamily: theme.font.main,
                  fontSize: '1.1rem'
                }}>
                nexuz.me/
              </Typography>
            }
            sx={{
              fontWeight: '400',
              color: theme.palette.text.alt,
              backgroundColor: 'white',
              fontFamily: theme.font.main,
              width: 280,
              p: 0.9,
              pl: 1.5,
              borderRadius: 3,
              fontSize: '1.2rem',
              border: '3px solid',
              borderColor: theme.palette.neutral.black,
              boxShadow: '-4px 4px Black',
              '&.Mui-focused': {
                border: '3px solid',
                borderColor: theme.palette.text.main
              }
            }}
          />
          <CustomButton onClick={() => handleClaim()}>Claim</CustomButton>
        </Row>
      </Block>
      <HomeTopWave
        style={{
          zIndex: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          width: 'auto'
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
          maxWidth: '100%',
          height: 300
        }}
        fill={theme.palette.primary.second}
        stroke={theme.palette.primary.third}
      />
      <Squiggle
        style={{
          position: 'absolute',
          right: 0,
          bottom: -85,
          width: mobile ? '50vw' : '22%',
          maxWidth: 700,
          height: 'auto',
          fill: theme.palette.accent.second,
          zIndex: 1,
          filter: 'drop-shadow(' + theme.palette.accent.main + ' 5px 5px)',
          overflow: 'hidden'
        }}
      />
      <Dots3
        style={{
          zIndex: 0,
          position: 'absolute',
          left: 0,
          top: mobile ? '13%' : '16%',
          height: mobile ? 100 : 270,
          aspectRatio: '1/1',
          fill: theme.palette.accent.second,
          filter: 'drop-shadow(' + theme.palette.accent.main + ' 2px 2px)'
        }}
      />
      <Dots2
        style={{
          zIndex: 0,
          position: 'absolute',
          right: 94,
          top: 56,
          display: mobile ? 'none' : 'unset',
          fill: theme.palette.accent.second,
          filter: 'drop-shadow(' + theme.palette.accent.main + ' 2px 2px)'
        }}
      />
    </Root>
  );
};

export default Hero;
