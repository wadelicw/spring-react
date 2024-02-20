'use client';

import { useEffect } from 'react';

export function ImportBsJS() {
  useEffect(() => {
    /* eslint-disable global-require */
    require('bootstrap/dist/js/bootstrap.bundle.min');
    /* eslint-enable global-require */
  }, []);
  return null;
}
