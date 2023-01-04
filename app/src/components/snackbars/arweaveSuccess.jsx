/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { forwardRef, useCallback } from 'react';

// libs
import { useSnackbar, SnackbarContent } from 'notistack';
import { Typography, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Column from 'components/column';

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

const SuccessSnackbar = forwardRef((props, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} sx={{ minWidth: '344px !important' }}>
      <CardStyled>
        <CardActionStyled sx={{ p: 2, pl: 2.5 }}>
          <CheckRoundedIcon
            sx={{
              color: 'black',
              height: '100%',
              width: 30,
              mr: 2
            }}
          />
          <Column>
            <Typography
              variant="subtitle2"
              color="black"
              sx={{ mr: 'auto', fontSize: '.9rem', mt: 0.2 }}>
              {props.message}
            </Typography>
            <a href={props.url} target="_blank" rel="noreferrer">
              <Typography
                variant="subtitle2"
                color="black"
                sx={{ mr: 2, fontSize: '.75rem', maxWidth: 450 }}>
                {props.url}
              </Typography>
            </a>
          </Column>
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

export default SuccessSnackbar;
