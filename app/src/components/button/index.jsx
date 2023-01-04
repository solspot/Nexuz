import React from 'react';

//libs
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const ButtonStyled = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.accent.main,
  color: theme.palette.button.text,
  fontFamily: theme.font.main,
  fontWeight: 700,
  border: '3px solid ' + theme.palette.button.outline,
  padding: '12px 24px 10px 24px',
  boxShadow: '-4px 4px' + theme.palette.button.outline,
  margin: 20,
  marginRight: 15,
  borderRadius: 10,
  fontSize: '1.3rem',
  transition: '0.1s ease',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    transform: 'translate(-1px, 1px)',
    boxShadow: '-3px 3px ' + theme.palette.button.outline
  },
  '&:active': {
    filter: 'brightness(105%)',
    transform: 'translate(-4px, 4px)',
    boxShadow: 'none'
  },
  [theme.breakpoints.down('md')]: {
    padding: '8px 16px'
  }
}));

CustomButton.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default function CustomButton({ sx, children, onClick, disabled }) {
  return (
    <ButtonStyled sx={sx} onClick={() => onClick()} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
}
