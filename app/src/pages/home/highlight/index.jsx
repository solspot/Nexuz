import { Typography, styled, useTheme, useMediaQuery } from '@mui/material';
import Column from 'components/column';
import Row from 'components/row';
import GithubIcon from 'assets/icons/github';
import CustomButton from 'components/button';
import HomeTopWave from 'assets/elements/homeTopWave';

let docsURL = 'https://docs.nexuz.me';
let githubURL = 'https://github.com/solspot/nexuz';

const Root = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  minHeight: '85vh',
  width: '100%',
  padding: '20vh 50px',
  backgroundColor: theme.palette.primary.main
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.accent.main,
  fontFamily: theme.font.display,
  fontWeight: 400,
  lineHeight: 1.4,
  textAlign: 'left',
  fontSize: '5.5rem',
  zIndex: 1,
  textShadow: theme.palette.accent.second + ' 5px 5px',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    width: '100%',
    fontSize: '2rem',
    zIndex: 10,
    padding: '0px 10px',
    letterSpacing: 2,
    textShadow: theme.palette.accent.second + ' 3px 3px'
  }
}));

const GithubIconStyled = styled(GithubIcon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginRight: 8,
  marginLeft: 0,
  transition: 'all .2s ease-in',
  fill: theme.palette.text.main
}));

const Info = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Root>
      <Column sx={{ width: '100%', alignItems: 'center', zIndex: 1 }}>
        <Title variant="h3" sx={{ fontSize: '4rem' }}>
          Personalized.
        </Title>
        <Title variant="h3" sx={{ fontSize: '4.8rem' }}>
          Open-Sourced.
        </Title>
        <Title variant="h3">Decentralized.</Title>
        <Row responsive={true} sx={{ justifyContent: 'center' }}>
          <a href={docsURL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <CustomButton sx={{ display: 'flex', alignItems: 'center', mt: mobile ? 3 : 6 }}>
              Documentation
            </CustomButton>
          </a>
          <a href={githubURL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <CustomButton sx={{ display: 'flex', alignItems: 'center', mt: mobile ? 0 : 6 }}>
              <GithubIconStyled sx={{ fill: theme.palette.button.text }} />
              Github
            </CustomButton>
          </a>
        </Row>
      </Column>
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
    </Root>
  );
};

export default Info;
