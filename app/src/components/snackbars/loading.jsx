/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { forwardRef, useCallback } from 'react';

// libs
import { useSnackbar, SnackbarContent } from 'notistack';
import { styled, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingSpinner from '../loadingSpinner';

const CardStyled = styled(Card)(() => ({
  backgroundColor: '#F7F4F1',
  borderRadius: 14,
  minWidth: '100%',
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

const CardActionStyled = styled(CardActions)(() => ({
  minWidth: '100%',
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center'
}));

const LoadingSnackbar = forwardRef((props, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} sx={{ minWidth: '344px !important', minHeight: 80 }}>
      <CardStyled>
        <CardActionStyled sx={{ p: 2, pl: 2.5, maxHeight: 30 }}>
          <LoadingSpinner sx={{ width: 'auto' }} />
          <Typography variant="h6" color="black" sx={{ fontSize: '.95rem', mt: 0.2, mb: -0.4 }}>
            {props.message}
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton
              sx={{
                padding: '8px 8px',
                transform: 'rotate(0deg)',
                transition: 'all .2s',
                color: 'black'
              }}
              onClick={handleDismiss}>
              <CloseIcon />
            </IconButton>
          </div>
        </CardActionStyled>
      </CardStyled>
    </SnackbarContent>
  );
});

export default LoadingSnackbar;
