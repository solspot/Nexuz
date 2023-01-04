import React, { useEffect, useContext, useState } from 'react';

// libs
import PropTypes from 'prop-types';
import { styled, useMediaQuery, useTheme } from '@mui/material';

// local
import { CustomThemeContext } from 'theme/index';
import LinksManager from './profileLinks';
import CoreInfo from './profileInfo';
import AccountButton from 'components/accountMenu';
import SaveButton from './saveButton.jsx';
import LoadingSpinner from '../../components/loadingSpinner';
import { useNavigate } from 'react-router-dom';
import NexuzLogo from 'assets/logo.jsx';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main
}));

const HideMUIDialogError = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 10,
  width: 20,
  height: '100vh',
  backgroundColor: theme.palette.primary.main
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

const ProfileCreate = ({ original, setOriginal, profile, setProfile, logout }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const navigate = useNavigate();

  const { setTheme } = useContext(CustomThemeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    setTheme('light');
    setLoading(false);
  }, [profile?.theme]);

  if (loading) return <LoadingSpinner sx={{ height: '90vh' }} />;

  return (
    <Root sx={{ backgroundColor: profile?.palette?.background && profile.palette.background }}>
      {!mobile && (
        <Logo
          onClick={() => navigate('/')}
          sx={{
            fill: profile?.palette.text,
            filter: 'drop-shadow(' + profile?.palette.accent + ' 1.5px 1.5px)'
          }}
        />
      )}

      {!mobile && (
        <HideMUIDialogError
          sx={{ backgroundColor: profile?.palette?.background && profile.palette.background }}
        />
      )}
      <AccountButton
        logout={logout}
        profile={profile}
        setProfile={setProfile}
        setOriginal={setOriginal}
        original={original}>
        Logout
      </AccountButton>
      <SaveButton original={original} profile={profile} setOriginal={setOriginal}>
        Save
      </SaveButton>
      <CoreInfo original={original} profile={profile} setProfile={setProfile} />
      <LinksManager profile={profile} setProfile={setProfile} />
    </Root>
  );
};

ProfileCreate.propTypes = {
  setOriginal: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  original: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default ProfileCreate;
