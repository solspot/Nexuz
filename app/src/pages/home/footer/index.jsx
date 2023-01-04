import { Typography, styled, useTheme } from '@mui/material';

import DiscordIcon from 'assets/icons/discord';
import TwitterIcon from 'assets/icons/twitter';
import MailIcon from 'assets/icons/mail';
import GithubIcon from 'assets/icons/github';
import NexuzLogo from 'assets/logo';

let discordURL = 'https://discord.gg/nGPMGegShp';
let twitterURL = 'https://twitter.com/solspot_';
let githubURL = 'https://github.com/solspot/nexuz';

const Root = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '30px 50px',
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    padding: '50px 50px'
  }
}));

const DiscordIconStyled = styled(DiscordIcon)(({ theme }) => ({
  width: 30,
  height: 30,
  margin: 10,
  transition: 'all .2s ease-in',
  fill: theme.palette.text.main,
  '&:hover': {
    transform: 'translateY(-3%)',
    fill: theme.palette.accent.main
  }
}));

const TwitterIconStyled = styled(TwitterIcon)(({ theme }) => ({
  width: 30,
  height: 30,
  margin: 10,
  transition: 'all .2s ease-in',
  fill: theme.palette.text.main,
  '&:hover': {
    transform: 'translateY(-3%)',
    fill: theme.palette.accent.main
  }
}));

const GithubIconStyled = styled(GithubIcon)(({ theme }) => ({
  width: 30,
  height: 30,
  margin: 10,
  transition: 'all .2s ease-in',
  fill: theme.palette.text.main,
  '&:hover': {
    transform: 'translateY(-3%)',
    fill: theme.palette.accent.main
  }
}));

const MailIconStyled = styled(MailIcon)(({ theme }) => ({
  width: 33,
  height: 33,
  margin: 10,
  transition: 'all .2s ease-in',
  fill: theme.palette.text.main,
  '&:hover': {
    transform: 'translateY(-3%)',
    fill: theme.palette.accent.main
  }
}));

const LinkWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: 70,
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    marginTop: 20
  }
}));

const Copyright = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.main,
  position: 'absolute',
  width: 200,
  textAlign: 'center',
  bottom: 50,
  left: 'calc(50% - 100px)',
  opacity: 1,
  fontSize: 12,
  userSelect: 'none',
  [theme.breakpoints.down('sm')]: {
    marginBottom: -30
  }
}));

const Logo = styled(NexuzLogo)(({ theme }) => ({
  cursor: 'pointer',
  maxHeight: 80,
  height: 80,
  zIndex: 10,
  [theme.breakpoints.down('sm')]: {
    maxHeight: 65
  }
}));

const Footer = () => {
  const theme = useTheme();
  return (
    <Root>
      <Logo
        sx={{
          fill: theme.palette.accent.main,
          filter: 'drop-shadow(' + theme.palette.accent.second + ' 1.5px 1.5px)'
        }}
      />
      <LinkWrapper>
        <a href={githubURL} target="_blank" rel="noreferrer">
          <GithubIconStyled />
        </a>
        <a href={discordURL} target="_blank" rel="noreferrer">
          <DiscordIconStyled />
        </a>
        <a href={twitterURL} target="_blank" rel="noreferrer">
          <TwitterIconStyled />
        </a>
        <a href={'mailto:lowkeygalactic@solspot.xyz'} target="_blank" rel="noreferrer">
          <MailIconStyled />
        </a>
      </LinkWrapper>
      <Copyright>© Copyright 2023</Copyright>
    </Root>
  );
};

export default Footer;
