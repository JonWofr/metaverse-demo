type Props = {
  sunPosition: readonly [number, number, number];
};

export const Lighting = ({ sunPosition }: Props) => {
  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight
        castShadow
        position={sunPosition}
        intensity={0.75}
        shadow-mapSize={[2048, 2048]}
      />
    </>
  );
};
