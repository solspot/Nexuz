import { Typography, styled, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Row from 'components/row';
import Column from 'components/column';
import Dots from 'assets/elements/dots';
import SBF from 'assets/sbf.jpg';

const Root = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  minHeight: '80vh',
  width: '100%',
  padding: '20vh 50px',
  zIndex: 0,
  backgroundColor: theme.palette.primary.second,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    padding: '50px 50px'
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.accent.main,
  fontFamily: theme.font.display,
  fontWeight: 400,
  lineHeight: 1.1,
  textAlign: 'left',
  width: '100%',
  fontSize: '3.5rem',
  textShadow: theme.palette.accent.second + ' 5px 5px',
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
  width: '100%',
  textAlign: 'left',
  fontSize: '2rem',
  fontFamily: 'Roboto, sans-serif',
  color: theme.palette.text.main,
  lineHeight: 1.1,
  fontWeight: 400,
  marginTop: 20,
  opacity: 0.8,
  zIndex: 10,
  [theme.breakpoints.down('md')]: {
    textAlign: 'left'
  },
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    fontSize: '1rem',
    zIndex: 10,
    padding: '10px 10px',
    marginBottom: 0,
    letterSpacing: 1
  }
}));

const Info = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  return (
    <Root>
      <Row sx={{ mt: 5 }} responsive={true}>
        <Column sx={{ width: mobile ? '80%' : '45%' }} responsive={true}>
          <img
            onClick={() => navigate('/sbf')}
            src={SBF}
            style={{
              cursor: 'pointer',
              width: mobile ? '100%' : '60%',
              maxWidth: mobile ? 'auto' : 250,
              borderRadius: 35,
              zIndex: 10,
              marginLeft: 'auto',
              marginRight: mobile ? 'auto' : 100,
              marginTop: mobile ? 70 : 0,
              marginBottom: mobile ? 30 : 0,
              border: '10px solid ' + theme.palette.primary.main,
              filter:
                `drop-shadow(` +
                theme.palette.accent.second +
                ` 10px 10px) drop-shadow(` +
                theme.palette.accent.main +
                ` -10px -10px)`
            }}
          />
        </Column>
        <Column sx={{ maxWidth: 600, width: mobile ? '100%' : '50%', marginRight: 'auto' }}>
          <Title variant="h3">Create your personalized link</Title>
          <Desc variant="subtitle1">
            One customizeable link that serves as a hub for your online presence, making it easy for
            your audience to access and engage with your content.
          </Desc>
        </Column>
      </Row>
      <Dots
        style={{
          position: 'absolute',
          zIndex: 0,
          left: 0,
          bottom: mobile ? '13%' : '10%',
          height: mobile ? 100 : 220,
          transform: 'reflect(190deg)',
          fill: theme.palette.accent.second,
          filter: 'drop-shadow(' + theme.palette.accent.main + ' 2px 2px)'
        }}
      />
    </Root>
  );
};

export default Info;
