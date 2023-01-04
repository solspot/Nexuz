import React, { useEffect, useState } from 'react';

// libs
import PropTypes from 'prop-types';
import { Dialog, styled, useTheme, Typography, ButtonBase, alpha } from '@mui/material';

const SimpleDialog = styled(Dialog)(({ theme, palette }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: palette.background,
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

const CustomizeButton = styled(ButtonBase)(({ theme, palette }) => ({
  borderRadius: 14,
  color: palette?.text,
  backgroundColor: palette?.offset,
  padding: '16px 24px',
  fontSize: 16,
  fontWeight: 700,
  width: 150,
  marginRight: 'auto',
  marginLeft: 'auto',
  '&:hover': {
    backgroundColor: palette?.accent ? alpha(palette?.accent, 0.22) : ''
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: 25
  }
}));

const TutorialDialog = ({ openFromMenu = false, setOpenTutorial, palette }) => {
  // hooks
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const openTutorial = sessionStorage.getItem('tutorial');

  const handleOpenUpdate = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (openTutorial) {
      setOpen(true);
      sessionStorage.clear('tutorial');
    }
  }, [openTutorial]);

  useEffect(() => {
    if (openFromMenu) {
      setOpen(true);
      setOpenTutorial(false);
    }
  }, [openFromMenu]);

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
          Nexuz Introduction
        </Typography>
        <Typography
          paragraph
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
          With Nexuz, you can add links, customize your theme, set a profile photo and banner, and
          share your designated URL to direct your fans to your Nexuz site to see where else on the
          internet you have a presence.
        </Typography>
        <CustomizeButton palette={palette} onClick={() => setOpen(false)}>
          Get Started!
        </CustomizeButton>
      </SimpleDialog>
    </>
  );
};

TutorialDialog.propTypes = {
  openFromMenu: PropTypes.bool,
  setOpenTutorial: PropTypes.func,
  palette: PropTypes.object.isRequired
};

export default TutorialDialog;
