import React from 'react';

// libs
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const ColumnRoot = styled('div')(({ theme, r }) => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: r === 'true' ? 'row' : 'column'
    // marginBottom: r === 'true' ? 20 : 0
  }
}));

const Column = ({ children, sx, responsive = false }) => {
  return (
    <ColumnRoot r={responsive.toString()} sx={sx}>
      {children}
    </ColumnRoot>
  );
};

Column.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  responsive: PropTypes.bool
};

export default Column;
