import React, { Suspense } from 'react';

const SuspenseHoc = LazyComponent => props => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent {...props} />
  </Suspense>
);

export default SuspenseHoc;
