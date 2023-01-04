import React from 'react';

// libs
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { Puff } from 'react-loading-icons';

const Root = styled('div')(() => ({
  width: '100%',
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const Loading = styled(Puff)(({ theme }) => ({
  color: theme.palette.text.alt,
  stroke: theme.palette.text.main
}));

// eslint-disable-next-line no-unused-vars
const LoadingSpinner = ({ sx, color }) => {
  return (
    <Root style={sx}>
      <Loading stroke={color ? color : 'text.main'} style={{ marginRight: 5, height: 35 }} />
    </Root>
  );
};

LoadingSpinner.propTypes = {
  sx: PropTypes.object,
  color: PropTypes.string
};

export default LoadingSpinner;
