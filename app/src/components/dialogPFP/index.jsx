import React, { useState } from 'react';

// libs
import PropTypes from 'prop-types';
import { useWallet } from '@solana/wallet-adapter-react';
import fileReaderStream from 'services/filereader-stream';

// mui
import {
  Dialog,
  styled,
  useTheme,
  Typography,
  ButtonBase,
  useMediaQuery,
  alpha,
  Input
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// local
import Row from 'components/row';
import Column from 'components/column';
import useCustomSnackbar from 'components/snackbars/useCustomSnackbar.jsx';
import { initBundlr, parseInput } from 'services/bundlr';
import { sleep } from 'services/utils';

const SimpleDialog = styled(Dialog)(({ palette, theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: palette.background,
    display: 'flex',
    alignItems: 'center',
    padding: '30px 30px 30px 30px',
    borderRadius: 20,
    minHeight: 500,
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      minHeight: 'auto',
      borderRadius: 20,
      padding: 40
    }
  }
}));

const CustomizeButton = styled(ButtonBase)(({ theme, palette }) => ({
  borderRadius: 14,
  color: palette?.text,
  backgroundColor: palette?.offset,
  padding: '10px 24px',
  fontSize: 16,
  fontWeight: 700,
  width: '180px',
  marginLeft: 'auto',
  marginRight: 'auto',
  '&:hover': {
    backgroundColor: palette?.accent ? alpha(palette?.accent, 0.22) : ''
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: 25
  }
}));

const ImgContainer = styled('div')(({ palette }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 150,
  width: 150,
  minHeight: 150,
  minWidth: 150,
  backgroundColor: palette?.offset,
  marginRight: 30,
  marginBottom: 20,
  borderRadius: 20,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: palette?.accent ? alpha(palette?.accent, 0.22) : ''
  }
}));

const ImgStyled = styled('div')(({ src }) => ({
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  borderRadius: 20,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(' + src + ')'
}));

const EditIcon = styled(EditRoundedIcon)(({ palette }) => ({
  position: 'absolute',
  cursor: 'pointer',
  right: 3,
  top: 3,
  width: 35,
  height: 35,
  borderRadius: 20,
  padding: 8,
  backgroundColor: palette.offset,
  color: palette.text,
  transition: '0.8s ease',
  '&:hover': {
    transform: 'translateY(-2%)',
    backgroundColor: palette?.accent ? alpha(palette?.accent, 0.22) : ''
  }
}));

const HideMUIDialogError = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  width: 20,
  height: '100vh',
  backgroundColor: theme.palette.primary.main
}));

const InputStyled = styled(Input)(({ palette }) => ({
  borderRadius: 14,
  color: palette?.text,
  backgroundColor: palette?.offset,
  border: '1.5px solid',
  borderColor: 'rgba(0,0,0,0)',
  padding: '10px 24px',
  fontSize: 16,
  width: '100%',
  '&.Mui-focused': {
    border: '1.5px solid',
    borderColor: palette?.accent
  }
}));

const ImagePlaceholder = styled('div')(({ palette }) => ({
  height: 110,
  width: 110,
  borderRadius: 15,
  backgroundColor: palette?.offset
}));

const ImageGroup = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.7
  }
}));
const DisplayImage = styled('div')(({ palette }) => ({
  height: 90,
  width: 90,
  borderRadius: 15,
  backgroundColor: palette.offset,
  backgroundSize: 'cover'
}));

const UploadButton = styled('input')(({ palette }) => ({
  unset: 'all',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  cursor: 'pointer',
  borderRadius: 15,
  borderColor: 'rgba(0,0,0,0)',
  '&:hover': {
    backgroundColor: palette?.accent ? alpha(palette?.accent, 0.22) : ''
  },
  '&[type=file]': {
    color: 'transparent'
  },
  '&::file-selector-button': {
    display: 'none'
  }
}));

const PfpDialog = ({ profile, setProfile }) => {
  // hooks
  const theme = useTheme();
  const { sendSnackbar } = useCustomSnackbar();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const [open, setOpen] = useState(false);
  const [url, setURL] = useState(profile ? profile.pfp : '');

  // upload
  const [uploadedImage, setUploadedImage] = useState();
  const [uploadCost, setUploadCost] = useState();
  const [bundler, setBundler] = useState();
  let { wallet } = useWallet();

  const handleOpenUpdate = () => {
    setOpen(false);
  };

  const handleURL = (event) => {
    if (event.target.value.length > 150) return;
    setURL(event.target.value);
  };

  const handleClear = () => {
    setUploadedImage();
    setUploadCost();
  };

  const handleSavePFP = () => {
    setProfile({ ...profile, pfp: url });
    setOpen(false);
  };

  const handleLocalUpload = async (e) => {
    let files = e.target.files;
    let localBundler = await initBundlr(wallet);
    try {
      if (files?.length !== 1) {
        throw new Error(`Invalid number of files (expected 1, got ${files?.length})`);
      }

      let cost = await localBundler?.utils.getPrice('solana', files[0].size);
      setUploadCost(cost);
      setBundler(localBundler);
      setUploadedImage(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleArweaveUpload = async () => {
    let mimeType, imgStream;
    let file = uploadedImage;

    let localBundler = bundler;
    try {
      mimeType = file?.type ? file.type : 'application/octet-stream';
      imgStream = await fileReaderStream(file);

      // fund
      let cost = await localBundler?.utils.getPrice('solana', file.size);
      let value = parseInput(cost.toString());
      sendSnackbar('Funding Arweave account...', {
        variant: 'loading'
      });
      await localBundler.fund(value);

      // prepare upload
      sendSnackbar('Preparing to save to Arweave...', {
        variant: 'loading'
      });

      sleep(2000);
      const uploader = localBundler?.uploader.chunkedUploader;
      uploader.setBatchSize(2);
      uploader.setChunkSize(2_000_000);
      uploader.on('chunkUpload', () => {});

      // upload
      let uploadRes = await uploader.uploadData(imgStream, {
        tags: [{ name: 'Content-Type', value: mimeType ? mimeType : 'application/octet-stream' }]
      });

      setURL(`https://arweave.net/${uploadRes?.data.id}`);
      setProfile({ ...profile, pfp: `https://arweave.net/${uploadRes?.data.id}` });
      setOpen(false);

      sendSnackbar(`Success! Save your profile to confirm change.`, {
        variant: 'arweave-url',
        url: `https://arweave.net/${uploadRes?.data.id}`,
        persist: true
      });
    } catch (err) {
      sendSnackbar('' + err, {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <ImgContainer onClick={() => setOpen(true)} palette={profile?.palette}>
        {profile.pfp !== '' && (
          <ImgStyled
            src={profile.pfp}
            style={{ width: '100%', height: '100%', borderRadius: 20 }}
          />
        )}
        {profile.pfp !== '' && <EditIcon palette={profile?.palette} />}
        {profile.pfp === '' && (
          <>
            <AccountCircleIcon
              sx={{
                position: 'relative',
                p: 0.3,
                color: profile?.palette.text,
                mr: 0.5,
                height: 24,
                width: 24
              }}
            />
            <Typography sx={{ fontFamily: theme.font.main, mr: 1, color: profile?.palette.text }}>
              PFP
            </Typography>
          </>
        )}
      </ImgContainer>
      {!fullScreen && <HideMUIDialogError sx={{ backgroundColor: profile?.palette.background }} />}
      <SimpleDialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleOpenUpdate}
        aria-labelledby="responsive-dialog-title"
        palette={profile?.palette}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: profile?.palette.text, textAlign: 'center', mb: 0.5 }}>
          Enter Profile Image URL
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            opacity: 0.7,
            color: profile?.palette.text,
            textAlign: 'center',
            mb: 2
          }}>
          Enter the URL of your desired profile image.
        </Typography>
        <Row>
          <InputStyled
            id="url"
            placeholder="Enter the full image URL"
            disableUnderline={true}
            value={url}
            onChange={(event) => handleURL(event)}
            palette={profile?.palette}
          />
          <CustomizeButton
            palette={profile?.palette}
            sx={{ width: 'auto', pt: 1, pb: 1, ml: 1.5 }}
            onClick={() => handleSavePFP()}>
            Save
          </CustomizeButton>
        </Row>
        <Row sx={{ justifyContent: 'center', alignItems: 'center', mt: 2, mb: 1 }}>
          <div
            style={{
              height: 1,
              width: 40,
              backgroundColor: profile?.palette.text,
              opacity: 0.3,
              borderRadius: 3,
              mb: 3
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              color: profile?.palette.text,
              opacity: 0.7,
              textAlign: 'center',
              mb: 3.5,
              mt: 3.5,
              mr: 2.5,
              ml: 2.5,
              borderRadius: 3
            }}>
            or
          </Typography>
          <div
            style={{
              height: 1,
              width: 40,
              backgroundColor: profile?.palette.text,
              opacity: 0.3
            }}
          />
        </Row>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: profile?.palette.text, textAlign: 'center', mb: 0.5 }}>
          Upload Profile Image
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            color: profile?.palette.text,
            opacity: 0.7,
            textAlign: 'left',
            mb: 3
          }}>
          {!uploadCost
            ? 'Store your profile photo in a decentralized way on Arweave.'
            : `To store your selected image on Arweave, it will cost ${
                uploadCost / 1000000000
              } SOL. This fee is non-refundable and covers the cost of data 
              storage. Please note that this fee must be paid in order to upload your image to Arweave.`}
        </Typography>

        {!uploadedImage ? (
          <div
            style={{
              height: 52,
              width: 200,
              position: 'relative',
              backgroundColor: profile?.palette.offset,
              borderRadius: 15
            }}>
            <UploadButton
              palette={profile?.palette}
              type="file"
              onChange={(e) => handleLocalUpload(e)}
            />
            <Typography
              sx={{ color: profile?.palette.text, width: '100%', textAlign: 'center', mt: 1.8 }}>
              Click to upload image
            </Typography>
          </div>
        ) : (
          <Row sx={{ justifyContent: 'center' }}>
            <ImageGroup>
              {uploadedImage ? (
                <DisplayImage
                  palette={profile?.palette}
                  style={{ backgroundImage: 'url(' + URL.createObjectURL(uploadedImage) + ')' }}
                />
              ) : (
                <ImagePlaceholder palette={profile?.palette} />
              )}
              <UploadButton type="file" onChange={(e) => handleLocalUpload(e)} />
            </ImageGroup>
            <Column sx={{ width: 'auto' }}>
              <CustomizeButton
                palette={profile?.palette}
                sx={{ minWidth: '120px', width: 'auto', pt: 1.3, pb: 1.3, ml: 1.5, mb: 1.5 }}
                onClick={() => handleClear()}>
                Clear
              </CustomizeButton>

              <CustomizeButton
                palette={profile?.palette}
                sx={{ minWidth: '120px', width: 'auto', pt: 1.3, pb: 1.3, ml: 1.5 }}
                onClick={() => handleArweaveUpload()}>
                Upload
              </CustomizeButton>
            </Column>
          </Row>
        )}
      </SimpleDialog>
    </>
  );
};

PfpDialog.propTypes = {
  profile: PropTypes.object.isRequired,
  setProfile: PropTypes.func.isRequired
};

export default PfpDialog;
