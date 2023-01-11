import React, { useEffect, useState, useContext } from 'react';

// libs
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, styled, ButtonBase } from '@mui/material';

// local
import { CustomThemeContext } from 'theme/index';
import Column from 'components/column';
import { loadProfileByUsername } from 'services/interface';
import { formatProfileAccountDisplay } from 'services/utils';
import NexuzLogo from 'assets/logo';

const Root = styled('div')(({ palette }) => ({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  backgroundColor: palette?.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const ImgStyled = styled('div')(({ theme, palette, src }) => ({
  height: 180,
  width: 180,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(' + src + ')',
  backgroundColor: palette?.background,
  border: '15px solid',
  borderColor: palette?.background,
  borderRadius: 100,
  marginTop: 55,
  zIndex: 5,
  padding: 8,
  [theme.breakpoints.down('sm')]: {
    marginTop: 'calc(20% - 20px)'
  }
}));

const BannerStyled = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 0,
  top: 0,
  width: '90%',
  maxWidth: 600,
  aspectRatio: '3/1',
  borderRadius: '0 0 25px 25px',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  [theme.breakpoints.down('sm')]: {
    minHeight: '20%',
    height: 'auto'
  }
}));

const LinkItem = styled(ButtonBase)(({ theme, palette }) => ({
  textDecoration: 'none',
  width: '100%',
  padding: 15,
  borderRadius: 10,
  backgroundColor: palette.offset,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '10px 0',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    marginLeft: '5%'
  },
  transition: '0.8s ease',
  '&:hover': {
    transform: 'translateY(-7%)'
  },
  '&.MuiButtonBase-root': {
    '&:active': {
      backgroundColor: palette?.accent !== '' ? palette.accent : theme.palette.primary.second
    }
  }
}));

const TextItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.main,
  fontSize: '5rem',
  lineHeight: 1.1,
  fontFamily: theme.font.display,
  [theme.breakpoints.down('md')]: {
    margin: 0,
    width: '100%',
    fontSize: '2.2rem',
    fontWeight: 400,
    zIndex: 10,
    padding: '10px 0px',
    marginTop: 10,
    textAlign: 'center',
    letterSpacing: 1.1
  }
}));

const LogoWrapper = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: 'auto',
  marginBottom: 10
}));

const Logo = styled(NexuzLogo)(({ palette }) => ({
  fill: palette.text,
  cursor: 'pointer',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxHeight: 70,
  filter: 'drop-shadow(' + palette.accent + ' 1.5px 1.5px)'
}));

const DisplayRoot = () => {
  const { setTheme } = useContext(CustomThemeContext);
  const { searchedUsername } = useParams();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async (query) => {
    try {
      let loadedProfile = await loadProfileByUsername(query);

      if (!loadedProfile) throw new Error('No profile matches this username.');
      let formattedProfile = formatProfileAccountDisplay(loadedProfile);
      setProfile(formattedProfile);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setTheme('dim');
  }, []);

  useEffect(() => {
    setTheme('dim');
    load(searchedUsername);
  }, [searchedUsername]);

  if (loading)
    return (
      <Root sx={{ justifyContent: 'center', textAlign: 'center' }}>
        <TextItem>Loading...</TextItem>
      </Root>
    );

  if (!profile)
    return (
      <Root sx={{ justifyContent: 'center', textAlign: 'center' }}>
        <TextItem>{searchedUsername} does not exist.</TextItem>
      </Root>
    );

  //shadow
  let itemStyles1 = {
    boxShadow: profile?.palette?.accent + ' 3px 3px'
  };

  // border
  let itemStyles2 = {
    border: '2px solid',
    borderColor: profile.palette.accent
  };

  // 3d
  let itemStyles3 = {
    border: '2px solid',
    borderColor: profile.palette.accent,
    boxShadow: profile?.palette?.accent + ' -3px 3px',
    '&:active': {
      transform: 'translate(-4px, 4px)',
      boxShadow: 'none'
    }
  };

  const renderItemStyles = (val) => {
    if (val === 1) return itemStyles1;
    if (val === 2) return itemStyles2;
    if (val === 3) return itemStyles3;
  };

  return (
    <Root palette={profile?.palette}>
      {profile?.banner !== '' && (
        <BannerStyled sx={{ backgroundImage: 'url(' + profile.banner + ')' }} />
      )}
      <Column sx={{ maxWidth: 600, mt: 3, mb: 4 }}>
        {profile?.pfp !== '' && (
          <ImgStyled
            palette={profile?.palette}
            src={profile.pfp}
            onError={(event) => (event.target.style.display = 'none')}
          />
        )}
        <Typography
          accent={profile.color}
          variant="h5"
          sx={{
            color: profile?.palette.text,
            mt: profile?.pfp === '' ? 25.5 : 2,
            fontWeight: 600,
            fontSize: '2rem'
          }}>
          {profile.displayName}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: profile?.palette.text,
            opacity: 0.7,
            mt: 0.5,
            mb: 4,
            maxWidth: 500,
            lineHeight: 1.2,
            textAlign: 'center',
            pl: '5%',
            pr: '5%'
          }}>
          {profile.bio}
        </Typography>
        {profile.links.map((item) => (
          <a
            href={'https://' + item.url}
            style={{ all: 'unset', textDecoration: 'none', width: '100%' }}
            key={item.id}>
            <LinkItem sx={renderItemStyles(profile?.palette.design)} palette={profile.palette}>
              <Typography sx={{ width: '100%', textAlign: 'center', color: profile?.palette.text }}>
                {item.name}
              </Typography>
            </LinkItem>
          </a>
        ))}
      </Column>
      <LogoWrapper onClick={() => navigate('/')}>
        <Logo palette={profile?.palette} />
      </LogoWrapper>
    </Root>
  );
};

export default DisplayRoot;
