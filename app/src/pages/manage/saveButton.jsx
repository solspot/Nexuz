import React from 'react';

// libs
import PropTypes from 'prop-types';
import { styled, ButtonBase, alpha } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';

// local
import useCustomSnackbar from 'components/snackbars/useCustomSnackbar.jsx';
import { updateProfile } from 'services/interface';
import { createTextOffset } from 'services/utils';

const Button = styled(ButtonBase)(({ palette }) => ({
  position: 'absolute',
  top: 20,
  right: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  color: palette?.text,
  backgroundColor: palette?.offset,
  minWidth: 100,
  cursor: 'pointer',
  padding: '15px 20px',
  borderRadius: 15,
  transition: '0.8s ease',
  '&:hover': {
    transform: 'translateY(-5%)',
    backgroundColor: palette?.accent ? alpha(palette?.accent, 0.52) : ''
  }
}));

const SaveButton = ({ original, profile, setOriginal }) => {
  const { sendSnackbar, closeSnackbar } = useCustomSnackbar();
  let { sendTransaction, publicKey } = useWallet();

  let changed = JSON.stringify(original) !== JSON.stringify(profile);

  const handleSave = async () => {
    try {
      sendSnackbar('Saving profile...', {
        variant: 'loading',
        persist: true
      });
      let saveRes = await updateProfile(profile, sendTransaction, publicKey);

      if (saveRes?.context?.slot) {
        setOriginal({ ...profile, links: JSON.parse(JSON.stringify(profile.links)) });
        closeSnackbar();
        sendSnackbar('Profile updated! View now 🔽', {
          variant: 'success-url',
          url: `https://nexuz.me/${profile?.username}`,
          persist: true
        });
      } else {
        throw new Error('Unable to update profile.');
      }
    } catch (err) {
      closeSnackbar();
      sendSnackbar('' + err, {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Button
        palette={profile?.palette}
        disabled={!changed}
        onClick={() => handleSave()}
        sx={{
          opacity: changed ? 1 : 0.35,
          backgroundColor: changed && alpha(profile?.palette.accent, 0.95),
          color: changed && createTextOffset(profile?.palette.accent)
        }}>
        Save
      </Button>
    </>
  );
};

SaveButton.propTypes = {
  setOriginal: PropTypes.func.isRequired,
  original: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default SaveButton;
