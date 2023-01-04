import React from 'react';

// libs
import PropTypes from 'prop-types';
import { styled, Typography } from '@mui/material';

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.main,
  fontWeight: 600,
  fontSize: '1.4rem',
  margin: 0,
  fontFamily: 'Oxygen'
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.main,
  fontSize: '1rem',
  fontFamily: 'Oxygen',
  marginBottom: 10
}));

const Text = ({ children, type, sx }) => {
  switch (type) {
    case 'title':
      return (
        <Title variant="h4" sx={sx}>
          {children}
        </Title>
      );
    case 'desc':
      return (
        <Description variant="subtitle1" sx={sx}>
          {children}
        </Description>
      );
    default:
      return (
        <Description variant="subtitle1" sx={sx}>
          {children}
        </Description>
      );
  }
};

Text.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
  sx: PropTypes.object
};

export default Text;
