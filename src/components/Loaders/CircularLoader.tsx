import * as React from 'react';

export default function CircularLoader() {
  return (
    <div className="grid h-[80vh] w-full place-items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
    </div>
  );
}
