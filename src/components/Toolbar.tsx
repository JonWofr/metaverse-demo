import Image from 'next/image';

const openSeaCollectionURL = `https://testnets.opensea.io/assets/mumbai/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;

export type ToolbarItem = {
  thumbnailURL: string;
  name: string;
  id: string;
};

type ToolbarProps = {
  items: ToolbarItem[];
};

export const Toolbar = ({ items }: ToolbarProps) => {
  const slots: (ToolbarItem | null)[] = new Array(10).fill(null);
  items.slice(0, 10).forEach((item, index) => (slots[index] = item));

  return (
    <ul className="fixed left-1/2 -translate-x-1/2 bottom-4 flex gap-2 border-gray-300 border border-solid rounded-lg shadow-lg p-2 bg-gray-200/25 backdrop-blur-sm">
      {slots.map((slot, index) => (
        <li key={index} className="w-12 h-12 bg-white/40 rounded-md ">
          {slot && (
            <a
              className="block relative w-full h-full hover:scale-110 transition-transform"
              title={`Show ${slot.name} on OpenSea`}
              href={`${openSeaCollectionURL}/${slot.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={slot.thumbnailURL}
                fill
                alt=""
                className="object-cover rounded-md"
              />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};
