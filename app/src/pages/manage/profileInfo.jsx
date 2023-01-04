import React from 'react';

// libs
import { styled, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Input } from '@mui/material';
import PropTypes from 'prop-types';

// local
import Text from 'components/text';
import Row from 'components/row';
import Column from 'components/column';
import CustomizeDialog from 'components/dialogCustomizable';
import PfpDialog from 'components/dialogPFP';
import BannerDialog from 'components/dialogBanner';

const Wrapper = styled('div')(({ theme }) => ({
  width: '90%',
  maxWidth: 750,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 50,
  [theme.breakpoints.down('sm')]: {
    marginTop: 30
  }
}));

const InputStyled = styled(Input)(({ palette }) => ({
  borderRadius: 14,
  color: palette.text,
  backgroundColor: palette.offset,
  border: '1.5px solid',
  borderColor: 'rgba(0,0,0,0)',
  padding: '10px 24px',
  fontSize: 16,
  width: '100%',
  '&.Mui-focused': {
    border: '1.5px solid',
    borderColor: palette.acccent
  }
}));

const CoreInfo = ({ profile, original, setProfile }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  const handleInput = (e) => {
    if (e.target.id === 'username') {
      e.target.value = e.target.value.replace(/[^a-z0-9]/gi, '');
      if (e.target.value.length > 15) return;
    }

    if (e.target.id === 'displayName') {
      if (e.target.value.length > 30) return;
    }

    if (e.target.id === 'bio') {
      if (e.target.value.length > 150) return;
    }

    setProfile({
      ...profile,
      [e.target.id]: e.target.value
    });
  };

  return (
    <Wrapper sx={{ pt: mobile ? 10 : '' }}>
      <Typography
        sx={{
          color: profile?.palette.text,
          fontFamily: theme.font.display,
          fontWeight: mobile ? 300 : 500,
          letterSpacing: 1.1,
          mb: mobile ? 1 : 5,
          mt: mobile ? 2 : 7,
          width: '100%'
        }}
        variant={mobile ? 'h5' : 'h4'}>
        Welcome {original.displayName ? original.displayName + '' : 'to Nexuz'}
      </Typography>
      <Row sx={{ alignItems: 'center' }} responsive={true}>
        <Column sx={{ width: !mobile ? 'auto' : '100%' }} responsive={true}>
          <PfpDialog profile={profile} setProfile={setProfile} />
          <Column sx={{ mt: mobile ? 1.5 : '' }}>
            <BannerDialog profile={profile} setProfile={setProfile} />
            <CustomizeDialog profile={profile} setProfile={setProfile} />
          </Column>
        </Column>
        <Column>
          <Column>
            <Text type="title" sx={{ width: '100%', mb: 1, color: profile?.palette.text }}>
              Display Name
            </Text>
            <InputStyled
              id="displayName"
              placeholder="Write your display name here"
              disableUnderline={true}
              value={profile.displayName}
              onChange={handleInput}
              palette={profile?.palette}
            />
          </Column>

          <Text type="title" sx={{ width: '100%', mt: 2, mb: 1, color: profile?.palette.text }}>
            Bio
          </Text>
          <InputStyled
            multiline
            rows={5}
            placeholder="Write about yourself here"
            id="bio"
            disableUnderline={true}
            value={profile.bio}
            onChange={handleInput}
            palette={profile?.palette}
          />
        </Column>
      </Row>
    </Wrapper>
  );
};

CoreInfo.propTypes = {
  setProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  original: PropTypes.object.isRequired
};

export default CoreInfo;
