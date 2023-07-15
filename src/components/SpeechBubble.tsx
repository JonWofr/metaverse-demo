import { TransactionStatus } from '@/hooks/useMint';
import { Html } from '@react-three/drei';
import { useAccount } from 'wagmi';

type Props = {
  position: [number, number, number];
  transactionStatus: TransactionStatus;
};

const SpeechBubble = ({ position, transactionStatus }: Props) => {
  const { isConnected } = useAccount();

  let message: string, note: string | undefined;
  switch (transactionStatus) {
    case 'idle':
      message =
        "Hey there!\nI'm selling this unique sword for 0.1001 MATIC. Would you like to buy it?";
      note = 'Press [e] to buy';
      break;
    case 'confirming':
      message =
        'Great choice!\n\nPlease confirm the transaction in your wallet!';
      break;
    case 'minting':
      message =
        'Your sword is currently being minted. Please wait for a moment!';
      note = 'Minting...';
      break;
    case 'error':
      message = 'Huh?\nSomething went wrong. Please try again!';
      note = 'Press [e] to retry minting';
      break;
    case 'success':
      message =
        'Hooray!\nYour newly minted NFT should appear in your toolbar any second. By clicking on it, you can also check it out on OpenSea.';
      note = 'Press [e] to mint again';
      break;
  }
  return (
    <Html
      className="bg-white/40 backdrop-blur-md p-4 rounded-md rounded-bl-none shadow-md w-52 text-gray-800 text-sm"
      position={position}
      distanceFactor={4}
      wrapperClass="origin-bottom-left !z-0"
    >
      <p className="whitespace-pre-line font-medium">{message}</p>
      {note && (
        <p className="whitespace-pre-line font-bold mt-4 text-xs">{note}</p>
      )}
      {!isConnected && (
        <p className="font-semibold text-xs text-red-400">
          You need to connect your wallet first
        </p>
      )}
    </Html>
  );
};

export default SpeechBubble;
