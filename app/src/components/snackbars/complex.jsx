/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { useState, forwardRef, useCallback } from 'react';

// libs
import { useSnackbar, SnackbarContent } from 'notistack';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ComplexSnackbar = forwardRef((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} sx={{ minWidth: '344px !important' }}>
      <Card sx={{ backgroundColor: '#fddc6c', width: '100%' }}>
        <CardActions sx={{ padding: '8px 8px 8px 16px', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">{props.message}</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="Show more"
              sx={{
                padding: '8px 8px',
                transform: 'rotate(0deg)',
                transition: 'all .2s'
              }}
              style={expanded ? { transform: 'rotate(180deg)' } : null}
              onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </IconButton>
            <IconButton
              sx={{
                padding: '8px 8px',
                transform: 'rotate(0deg)',
                transition: 'all .2s'
              }}
              onClick={handleDismiss}>
              <CloseIcon />
            </IconButton>
          </div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper
            sx={{
              padding: 16
            }}>
            <Typography gutterBottom>PDF ready</Typography>
            <Button
              size="small"
              sx={{
                padding: 0,
                textTransform: 'none'
              }}>
              <CheckCircleIcon sx={{ fontSize: 20, color: '#b3b3b3', paddingRight: 4 }} />
              Download now
            </Button>
          </Paper>
        </Collapse>
      </Card>
    </SnackbarContent>
  );
});

export default ComplexSnackbar;
