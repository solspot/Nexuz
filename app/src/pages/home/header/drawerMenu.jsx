import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Drawer, styled } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CustomButton from '../../../components/button';

const NavButton = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.main,
  fontFamily: theme.font.main,
  fontWeight: 500,
  letterSpacing: 1.1,
  cursor: 'pointer',
  fontSize: 28,
  width: '90%',
  textAlign: 'center',
  padding: '20px 30px',
  marginBottom: 0
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '20px 20px 0px 0px',
    height: 'auto',
    maxWidth: '100vw',
    margin: 0,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20
  }
}));

const DrawerMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleNav = (e) => {
    navigate(e);
    setOpenDrawer(false);
  };

  return (
    <>
      <MenuRoundedIcon
        sx={{ width: 40, height: 40, color: 'text.main', m: 1.5, ml: 'auto', cursor: 'pointer' }}
        onClick={() => {
          setOpenDrawer(true);
        }}
      />
      <DrawerStyled anchor={'bottom'} open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <NavButton onClick={() => handleNav('/')}>Home</NavButton>
        <CustomButton
          sx={{ mt: 1, mb: 6, width: '70%', textAlign: 'center' }}
          onClick={() => handleNav('/manage')}>
          Manage Your Nexuz
        </CustomButton>
      </DrawerStyled>
    </>
  );
};

export default DrawerMenu;
