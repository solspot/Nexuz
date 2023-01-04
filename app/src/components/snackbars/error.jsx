/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { forwardRef, useCallback } from 'react';

// libs
import { useSnackbar, SnackbarContent } from 'notistack';
import { Typography, styled, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

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

const CardActionStyled = styled(Card)(() => ({
  minWidth: '100%',
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center'
}));

const ErrorSnackbar = forwardRef((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const theme = useTheme();

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} sx={{ minWidth: '344px !important' }}>
      <CardStyled>
        <CardActionStyled sx={{ p: 2, pl: 2.5 }}>
          <ErrorOutlineRoundedIcon
            sx={{
              color: theme.palette.action.error,
              height: '100%',
              width: 30,
              mr: 2
            }}
          />
          <Typography
            variant="subtitle2"
            color="text.alt"
            sx={{ fontSize: '.9rem', mr: 1, mt: 0.5 }}>
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

export default ErrorSnackbar;
