'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Header = () => {
  return (
    <header
      className="py-2 fixed top-0 inset-x-0 bg-gray-200/25 backdrop-blur-sm"
      onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
    >
      <div className="container flex justify-end">
        <ConnectButton />
      </div>
    </header>
  );
};
