import React, { useState } from 'react';

// libs
import PropTypes from 'prop-types';
import {
  Dialog,
  styled,
  useTheme,
  Typography,
  ButtonBase,
  useMediaQuery,
  Input,
  alpha
} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PaletteIcon from '@mui/icons-material/Palette';

// local
import Row from 'components/row';
import Column from 'components/column';
import { createOffset, createTextOffset } from 'services/utils';
import { accentBase, backgroundBase } from 'assets/constants';

const SimpleDialog = styled(Dialog)(({ theme, palette }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: palette?.background ? palette.background : theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    padding: 30,
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
  padding: '12px 24px',
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

const ColorItem = styled('button')(({ theme }) => ({
  all: 'unset',
  height: 35,
  width: 35,
  borderRadius: 25,
  margin: '10px 30px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    margin: '10px 15px'
  }
}));

const ThemeItem = styled('button')(({ theme }) => ({
  all: 'unset',
  position: 'relative',
  height: 'auto',
  width: 'auto',
  borderRadius: 25,
  margin: 10,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 0,
  outline: '5px solid',
  outlineColor: theme.palette.accent.main,
  outlineOffset: '-3px'
}));

const DesignItem = styled('button')(({ palette }) => ({
  all: 'unset',
  borderRadius: 15,
  padding: '8px 16px',
  margin: 10,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: palette?.text,
  backgroundColor: palette?.background
}));

const ColorDisplay = styled('div')(() => ({
  maxWidth: 600,
  width: 'calc(100% - 30px)',
  borderRadius: 8,
  color: 'white',
  margin: 15,
  marginTop: 10,
  paddingLeft: 'auto'
}));

const InputStyled = styled(Input)(({ palette }) => ({
  borderRadius: 7,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  color: palette?.text,
  padding: '3px 0px 3px 20px',
  fontSize: '1rem',
  minWidth: 60,
  width: '50%',
  backgroundColor: palette?.background,
  marginLeft: 'auto'
}));

const CustomizeDialog = ({ profile, setProfile }) => {
  // hooks
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const [open, setOpen] = useState(false);

  const [accentC, setAccentC] = useState(
    profile?.palette.accent ? profile.palette.accent : '#A5D3D5'
  );
  const [backgroundC, setBackgroundC] = useState(
    profile?.palette.background ? profile.palette.background : '#fffbf8'
  );

  const updateHex = (value, type) => {
    if (!value.includes('#') || value.length > 7) return;
    if (type === 'background') {
      setBackgroundC(value);
      let RegExp = /^#[0-9A-F]{6}$/i;
      if (RegExp.test(value)) {
        handleBackground(value);
      }
    } else {
      setAccentC(value);
      let RegExp = /^#[0-9A-F]{6}$/i;
      if (RegExp.test(value)) {
        handleAccent(value);
      }
    }
  };

  const handleAccent = (hex) => {
    if (hex.length !== 7) return;
    setAccentC(hex);
    setProfile({ ...profile, palette: { ...profile.palette, accent: hex } });
  };

  const handleBackground = (hex) => {
    if (hex.length !== 7) return;

    let _offset = createOffset(hex);
    let _text = createTextOffset(hex);
    setBackgroundC(hex);
    setProfile({
      ...profile,
      palette: { ...profile.palette, background: hex, offset: _offset, text: _text }
    });
  };

  const handleDesign = (int) => {
    setProfile({ ...profile, palette: { ...profile.palette, design: int } });
  };

  const handleOpenUpdate = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomizeButton palette={profile?.palette} onClick={() => setOpen(true)}>
        <PaletteIcon
          sx={{
            position: 'relative',
            background: 'none',
            p: 0.3,
            mr: 0.5,
            height: 22,
            color: profile?.palette.text
          }}
        />
        <Typography sx={{ fontFamily: theme.font.main, mr: 1, color: profile?.palette.text }}>
          Customize
        </Typography>
      </CustomizeButton>
      <SimpleDialog
        palette={profile.palette}
        disableScrollLock={false}
        maxWidth={'sm'}
        open={open}
        onClose={handleOpenUpdate}
        aria-labelledby="responsive-dialog-title">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: profile.palette.text,
            textAlign: 'center',
            mt: mobile ? 5 : 1.5,
            mb: 0.5
          }}>
          Customize your profile
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            color: alpha(profile.palette.text, 0.79),
            textAlign: 'center',
            mb: 3
          }}>
          These settings change the visual color of your profile.
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: profile.palette.text,
            textAlign: 'left',
            mt: mobile ? 5 : 1.5,
            mb: 0.5
          }}>
          Accent Color
        </Typography>
        <Column
          sx={{
            backgroundColor: profile.palette.offset,
            borderRadius: 3
          }}>
          <Row
            sx={{
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              pt: 2
            }}>
            {accentBase.map((color) => (
              <ColorItem
                sx={{ backgroundColor: color.hex }}
                onClick={() => handleAccent(color.hex)}
                key={color.id}>
                {accentC === color.hex && <CheckRoundedIcon sx={{ color: color.contrast }} />}
              </ColorItem>
            ))}
          </Row>

          <ColorDisplay sx={{ backgroundColor: accentC.length === 7 ? accentC : '#d3d3d3' }}>
            <InputStyled
              palette={profile?.palette}
              disableUnderline={true}
              value={accentC}
              onChange={(event) => updateHex(event.target.value, 'accent')}
            />
          </ColorDisplay>
        </Column>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: profile.palette.text,
            textAlign: 'left',
            mt: mobile ? 5 : 2.5
          }}>
          Background Color
        </Typography>

        <Column
          sx={{
            backgroundColor: profile.palette.offset,
            borderRadius: 3
          }}>
          <Row
            sx={{
              justifyContent: 'space-around',
              borderRadius: 3,
              pt: 2
            }}>
            {backgroundBase.map((theme) => (
              <ThemeItem onClick={() => handleBackground(theme.hex)} key={theme.id}>
                <div
                  style={{
                    zIndex: 1,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: theme.hex
                  }}
                />
                {theme.hex === backgroundC && (
                  <CheckRoundedIcon
                    sx={{ color: theme.contrast, zIndex: 2, position: 'absolute', left: 3 }}
                  />
                )}
              </ThemeItem>
            ))}
          </Row>

          <ColorDisplay
            sx={{ backgroundColor: backgroundC.length === 7 ? backgroundC : '#d3d3d3' }}>
            <InputStyled
              palette={profile?.palette}
              disableUnderline={true}
              value={backgroundC}
              onChange={(event) => updateHex(event.target.value, 'background')}
            />
          </ColorDisplay>
        </Column>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            textAlign: 'left',
            color: profile.palette.text,
            mt: mobile ? 5 : 2.5
          }}>
          Profile Design
        </Typography>
        <Row
          sx={{
            backgroundColor: profile.palette.offset,
            justifyContent: 'space-around',
            mb: 4,
            borderRadius: 3,
            flexWrap: 'wrap'
          }}>
          <DesignItem
            palette={profile?.palette}
            onClick={() => handleDesign(2)}
            sx={{ opacity: profile.palette.design === 2 ? 1 : 0.4 }}>
            Borders
          </DesignItem>

          <DesignItem
            palette={profile?.palette}
            onClick={() => handleDesign(1)}
            sx={{ opacity: profile.palette.design === 1 ? 1 : 0.4 }}>
            Shadows
          </DesignItem>
          <DesignItem
            palette={profile?.palette}
            onClick={() => handleDesign(3)}
            sx={{ opacity: profile.palette.design === 3 ? 1 : 0.4 }}>
            3D
          </DesignItem>
          <DesignItem
            palette={profile?.palette}
            onClick={() => handleDesign(0)}
            sx={{ opacity: profile.palette.design === 0 ? 1 : 0.4 }}>
            Nothing
          </DesignItem>
        </Row>
      </SimpleDialog>
    </>
  );
};

CustomizeDialog.propTypes = {
  profile: PropTypes.object.isRequired,
  setProfile: PropTypes.func.isRequired
};

export default CustomizeDialog;
