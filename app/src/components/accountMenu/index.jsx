import React, { useRef, useState } from 'react';

// libs
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import PropTypes from 'prop-types';
import { Box, Divider, Typography, Stack, MenuItem, Popover, ButtonBase } from '@mui/material';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

// local
import { formatAddress, capitalize } from 'services/utils';
import TutorialDialog from '../dialogTutorial';
import DeleteDialog from '../dialogDelete';
import UsernameDialog from '../dialogUsernameChange';

const BlankIcon = styled(AccountCircle)(({ palette }) => ({
  color: palette.text,
  cursor: 'pointer',
  height: 35,
  width: 35,
  borderRadius: '50%',
  marginRight: 15
}));

const PFPImage = styled('div')(({ src }) => ({
  width: 35,
  height: 35,
  cursor: 'pointer',
  borderRadius: '50%',
  marginRight: 15,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(' + src + ')'
}));

const MenuButton = styled(ButtonBase)(({ palette }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  top: 20,
  right: 20,
  backgroundColor: palette.offset,
  minWidth: 100,
  cursor: 'pointer',
  padding: '15px 20px',
  borderRadius: 20,
  transition: '0.4s ease',
  '&:hover': {
    transform: 'translateY(-5%)'
  }
}));

const AccountButton = ({ profile, setProfile, logout, original, setOriginal }) => {
  let { publicKey } = useWallet();
  const anchorRef = useRef(null);
  let navigate = useNavigate();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const [open, setOpen] = useState(null);
  const [openTutorial, setOpenTutorial] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUsername, setOpenUsername] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const openDialogTutorial = () => {
    setOpenTutorial(true);
    setOpen(false);
  };

  const openDialogDelete = () => {
    setOpenDelete(true);
    setOpen(false);
  };

  const openDialogUsername = () => {
    setOpenUsername(true);
    setOpen(false);
  };

  const redirectUser = () => {
    if (profile.username === original.username && profile.username !== '') {
      window.open('https://nexuz.me/' + profile?.username);
    }
  };

  const MENU_OPTIONS = [
    {
      label: 'View Tutorial',
      action: openDialogTutorial
    },
    {
      label: 'Change Username',
      action: openDialogUsername
    },
    {
      label: 'Delete Account',
      action: openDialogDelete
    }
  ];

  if (!profile) return null;

  return (
    <>
      <MenuButton ref={anchorRef} onClick={handleOpen} palette={profile?.palette}>
        {!profile.pfp ? <BlankIcon palette={profile?.palette} /> : <PFPImage src={profile?.pfp} />}
        <Typography variant="h6" sx={{ fontWeight: 700, color: profile?.palette.text }}>
          Manage
        </Typography>
      </MenuButton>

      <TutorialDialog
        openFromMenu={openTutorial}
        setOpenTutorial={setOpenTutorial}
        palette={profile?.palette}
      />
      <DeleteDialog
        palette={profile?.palette}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        logout={logout}
        username={profile.username}
      />
      <UsernameDialog
        openUsername={openUsername}
        setOpenUsername={setOpenUsername}
        profile={profile}
        original={original}
        setProfile={setProfile}
        setOriginal={setOriginal}
      />

      <Popover
        disableScrollLock={true}
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            overflow: 'inherit',
            backgroundColor: profile?.palette.offset,
            borderRadius: 5
          }
        }}
        sx={{
          p: 0,
          mt: sm ? 0 : 9.5,
          ml: sm ? 0 : -0.5,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            color: profile?.palette.text,
            borderRadius: 0.75
          }
        }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {profile && (
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ marginBottom: 0.5, fontWeight: 700, color: profile?.palette.text }}>
              {capitalize(profile.username)}
            </Typography>
          )}
          {profile && (
            <Typography variant="body2" noWrap sx={{ color: profile?.palette.text, opacity: 0.7 }}>
              {formatAddress(publicKey.toString())}
            </Typography>
          )}
        </Box>

        <Divider sx={{ borderColor: profile?.palette.text, opacity: 0.2 }} />

        <Stack sx={{ p: 1.2 }}>
          <MenuItem onClick={() => redirectUser()}>View Profile</MenuItem>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={option.action}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderColor: profile?.palette.text, opacity: 0.2 }} />

        <MenuItem sx={{ m: 1 }} onClick={() => logout()}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

AccountButton.propTypes = {
  setOriginal: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  original: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default AccountButton;
