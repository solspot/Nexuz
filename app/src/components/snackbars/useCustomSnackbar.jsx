import React from 'react';

// libs
import { useSnackbar } from 'notistack';

// local
import LoadingSnackbar from './loading.jsx';
import SuccessSnackbar from './success.jsx';
import URLSuccessSnackbar from './urlSuccess.jsx';
import ErrorSnackbar from './error.jsx';
import DefaultSnackbar from './default.jsx';

function useCustomSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return {
    sendSnackbar(_message, params) {
      let _variant = params.variant;
      let _persist = params.persist;
      let _url = params.url;

      switch (_variant) {
        case 'default':
          enqueueSnackbar(_message, {
            persist: _persist,
            content: (key, message) => <DefaultSnackbar id={key} message={message} />
          });
          return;
        case 'loading':
          enqueueSnackbar(_message, {
            persist: _persist,
            content: (key, message) => <LoadingSnackbar id={key} message={message} />
          });
          return;
        case 'success':
          enqueueSnackbar(_message, {
            persist: _persist,
            content: (key, message) => <SuccessSnackbar id={key} message={message} />
          });
          return;
        case 'success-url':
          enqueueSnackbar(_message, {
            persist: _persist,
            content: (key, message) => <URLSuccessSnackbar id={key} message={message} url={_url} />
          });
          return;
        case 'error':
          enqueueSnackbar(_message, {
            persist: _persist,
            content: (key, message) => <ErrorSnackbar id={key} message={message} />
          });
          return;
      }
    },
    closeSnackbar() {
      closeSnackbar();
    }
  };
}

export default useCustomSnackbar;
