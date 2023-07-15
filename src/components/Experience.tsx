import { Sky } from '@react-three/drei';
import { Ground } from './Ground';
import { Lighting } from './Lighting';
import { FirstPersonControls } from './FirstPersonControls';
import { Flora } from './Flora';
import { Model as Table } from './TableCrossCloth';
import { Vendor } from './Vendor';
import { Model as Sword } from './Sword';

export const Experience = () => {
  const sunPosition = [2, 6, 4] as const;

  return (
    <>
      <Lighting sunPosition={sunPosition} />
      <Sky sunPosition={sunPosition} />
      <Flora />
      <Ground />
      <FirstPersonControls />
      <Table scale={1.75} position={[0, 0, 0]} />
      <Vendor />
      <Sword position={[0.28, -2.005, 8.32]} rotation={[0, 0, -1.64]} />
    </>
  );
};
