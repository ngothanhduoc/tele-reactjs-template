import type { FC } from 'react';

export const GamePage: FC = () => {

  return (
    <div style={{ width: '100%', height: '848px' }}>
      <iframe
        src="https://imota-slots-demo.vercel.app"
        title="Example Iframe"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
  </div>
  );
};
