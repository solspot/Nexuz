import React, { useEffect, useState } from 'react';

// libs
import PropTypes from 'prop-types';
import { Dialog, styled, useTheme, Typography, ButtonBase, alpha } from '@mui/material';

// local
import useCustomSnackbar from 'components/snackbars/useCustomSnackbar.jsx';
import { deleteProfile } from 'services/interface';
import { useWallet } from '@solana/wallet-adapter-react';

const SimpleDialog = styled(Dialog)(({ theme, palette }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: palette.background,
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      padding: 40
    }
  }
}));

const CustomizeButton = styled(ButtonBase)(({ theme, palette }) => ({
  borderRadius: 14,
  color: palette?.text,
  backgroundColor: palette?.offset,
  padding: '16px 24px',
  fontSize: 16,
  fontWeight: 700,
  width: 150,
  marginRight: 'auto',
  '&:hover': {
    backgroundColor: palette?.accent ? alpha(palette?.accent, 0.22) : ''
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: 25
  }
}));

const DeleteDialog = ({ palette, openDelete, setOpenDelete, logout, username }) => {
  // hooks
  const theme = useTheme();
  const { sendSnackbar, closeSnackbar } = useCustomSnackbar();
  const [open, setOpen] = useState(false);
  let { sendTransaction, publicKey } = useWallet();

  const handleOpenUpdate = () => {
    setOpen(false);
  };

  const deleteAccount = async () => {
    try {
      sendSnackbar('Deleting account...', {
        variant: 'loading',
        persist: true
      });
      let res = await deleteProfile(username, sendTransaction, publicKey);
      if (res?.context?.slot) {
        closeSnackbar();
        logout();
      } else {
        throw new Error('Unable to delete account.');
      }
      sendSnackbar('Profile deleted', {
        variant: 'success'
      });
    } catch (err) {
      sendSnackbar('' + err, {
        variant: 'error'
      });
      closeSnackbar();
    }
  };

  useEffect(() => {
    if (openDelete) {
      setOpen(true);
      setOpenDelete(false);
    }
  }, [openDelete]);

  return (
    <>
      <SimpleDialog
        palette={palette}
        disableScrollLock={false}
        maxWidth={'sm'}
        open={open}
        onClose={handleOpenUpdate}
        aria-labelledby="responsive-dialog-title">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 400,
            color: palette.text,
            mb: 1,
            fontFamily: theme.font.display,
            textAlign: 'center'
          }}>
          Delete Your Nexuz?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: palette.text,
            opacity: 0.7,
            textAlign: 'left',
            maxWidth: 500,
            lineHeight: 1.25,
            mb: 4,
            fontWeight: 400,
            fontSize: '1.1rem'
          }}>
          If you delete your account, you will reclaim 0.072 SOL and your data will be permanently
          removed from the Solana blockchain. This action is irreversible.
        </Typography>
        <CustomizeButton
          palette={palette}
          onClick={() => deleteAccount()}
          sx={{ mr: 'auto', ml: 'auto' }}>
          DELETE
        </CustomizeButton>
      </SimpleDialog>
    </>
  );
};

DeleteDialog.propTypes = {
  setOpenDelete: PropTypes.func.isRequired,
  openDelete: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  palette: PropTypes.object.isRequired
};

export default DeleteDialog;
