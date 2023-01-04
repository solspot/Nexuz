import React from 'react';

// libs
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const RowRoot = styled('div')(({ theme, r }) => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: r === 'true' ? 'column' : 'row',
    marginBottom: r === 'true' ? 20 : 0
  }
}));

const Row = ({ children, sx, responsive = false }) => {
  return (
    <RowRoot r={responsive.toString()} sx={sx}>
      {children}
    </RowRoot>
  );
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  responsive: PropTypes.bool
};

export default Row;
