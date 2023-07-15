import { Crosshair } from './Crosshair';
import { Toolbar, ToolbarItem } from './Toolbar';
import { useNFTs } from '@/hooks/useNFTs';

export const HUD = () => {
  const { tokens } = useNFTs();

  const toolbarItems: ToolbarItem[] = tokens.map((token) => ({
    id: token.id.toString(),
    name: token.name,
    thumbnailURL: token.imageURL,
  }));

  return (
    <>
      <Crosshair />
      <Toolbar items={toolbarItems} />
    </>
  );
};
