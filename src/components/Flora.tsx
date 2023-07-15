import { Model as TreePineDefaultA } from './TreePineDefaultA';
import { Model as TreePineDefaultB } from './TreePineDefaultB';
import { Model as TreePineGroundA } from './TreePineGroundA';
import { Model as TreePineGroundB } from './TreePineGroundB';
import { Model as TreePineSmallA } from './TreePineSmallA';
import { Model as TreePineSmallB } from './TreePineSmallB';
import { Model as TreePineTallA } from './TreePineTallA';
import { Model as TreePineTallB } from './TreePineTallB';

export const Flora = () => {
  return (
    <>
      <TreePineDefaultA
        scale={2}
        position={[-0.016080008055036454, 0, -1.5946660140455546]}
      />
      <TreePineDefaultB
        scale={2}
        position={[2.2334426760556387, 0, -0.8044683215343147]}
      />
      <TreePineGroundA
        scale={2}
        position={[-0.9377797873199953, 0, -0.7663750004345538]}
      />
      <TreePineGroundB
        scale={2}
        position={[2.093386452223616, 0, -2.033125259531159]}
      />
      <TreePineSmallA
        scale={2}
        position={[-0.7436133828316323, 0, -1.976026160513265]}
      />
      <TreePineSmallB
        scale={2}
        position={[0.6137078629108262, 0, -2.29620985118136]}
      />
      <TreePineTallA
        scale={2}
        position={[-0.9485112824800022, 0, 0.302335921374173]}
      />
      <TreePineTallB
        scale={2}
        position={[1.5067106069413965, 0, -2.656122667834217]}
      />
      <TreePineGroundA
        scale={2}
        position={[2.1578139075525926, 0, 0.28720639251666213]}
      />
    </>
  );
};
