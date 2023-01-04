import React, { useEffect, useState } from 'react';

// libs
import PropTypes from 'prop-types';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Dialog,
  styled,
  useTheme,
  Typography,
  InputAdornment,
  ButtonBase,
  Input,
  alpha
} from '@mui/material';

// local
import { updateUsername } from 'services/interface';
import useCustomSnackbar from 'components/snackbars/useCustomSnackbar.jsx';
import Row from 'components/row';

const SimpleDialog = styled(Dialog)(({ theme, palette }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: palette?.background,
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      borderRadius: 20,
      padding: 40
    }
  }
}));

const CustomizeButton = styled(ButtonBase)(({ palette }) => ({
  borderRadius: 14,
  color: palette?.text,
  backgroundColor: palette?.offset,
  padding: '16px 24px',
  fontSize: 16,
  fontWeight: 700,
  width: 150,
  marginLeft: 10,
  '&:hover': {
    backgroundColor: palette?.accent ? alpha(palette?.accent, 0.22) : ''
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
  maxWidth: 300,
  width: '100%',
  '&.Mui-focused': {
    border: '1.5px solid',
    borderColor: palette.accent
  }
}));

const UsernameDialog = ({
  openUsername,
  setOpenUsername,
  profile,
  original,
  setProfile,
  setOriginal
}) => {
  // hooks
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(profile ? profile.pfp : '');
  const { sendSnackbar, closeSnackbar } = useCustomSnackbar();
  let { sendTransaction, publicKey } = useWallet();

  const handleOpenUpdate = () => {
    setOpen(false);
  };

  const handleNewUsername = (event) => {
    let { value } = event.target;
    value = value.replace(/[^a-z0-9]/gi, '');
    if (value.length > 20) return;
    setNewUsername(value.toLowerCase());
  };

  const handleSaveUsername = async () => {
    try {
      sendSnackbar('Saving username...', {
        variant: 'loading',
        persist: true
      });

      let confirmation = await updateUsername(
        newUsername,
        original.username,
        publicKey,
        sendTransaction
      );
      closeSnackbar();
      if (confirmation.value.err) throw new Error('Transaction Error. Data not saved.');

      setProfile({ ...profile, username: newUsername });
      setOriginal({ ...original, username: newUsername });
      setOpen(false);
      sendSnackbar('Username changed to ' + newUsername, {
        variant: 'success'
      });
    } catch (err) {
      sendSnackbar('' + err, {
        variant: 'error'
      });
    }
  };

  useEffect(() => {
    if (openUsername) {
      setOpen(true);
      setOpenUsername(false);
      setNewUsername(profile.username);
    }
  }, [openUsername]);

  return (
    <SimpleDialog
      palette={profile?.palette}
      disableScrollLock={false}
      maxWidth={'sm'}
      open={open}
      onClose={handleOpenUpdate}
      aria-labelledby="responsive-dialog-title">
      <Typography
        variant="h5"
        sx={{
          fontWeight: 400,
          color: profile?.palette.text,
          mb: 1,
          fontFamily: theme.font.display,
          textAlign: 'center'
        }}>
        Change Nexuz Username
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: profile?.palette.text,
          opacity: 0.7,
          textAlign: 'left',
          maxWidth: 500,
          lineHeight: 1.25,
          mb: 4.5,
          fontWeight: 400,
          fontSize: '1.1rem'
        }}>
        By changing your username, the URL used to share your Nexuz profile will be updated to your
        new username.
      </Typography>
      <Row>
        <InputStyled
          palette={profile?.palette}
          id="username"
          placeholder="your username here"
          disableUnderline={true}
          value={newUsername}
          onChange={(event) => handleNewUsername(event)}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: 0 }}>
              <Typography sx={{ mr: 0.2, color: profile?.palette.text }}>nexuz.me/</Typography>
            </InputAdornment>
          }
        />
        <CustomizeButton palette={profile?.palette} onClick={() => handleSaveUsername()}>
          UPDATE
        </CustomizeButton>
      </Row>
    </SimpleDialog>
  );
};

UsernameDialog.propTypes = {
  profile: PropTypes.object.isRequired,
  original: PropTypes.object.isRequired,
  setProfile: PropTypes.func.isRequired,
  setOriginal: PropTypes.func.isRequired,
  openUsername: PropTypes.bool.isRequired,
  setOpenUsername: PropTypes.func.isRequired
};

export default UsernameDialog;
