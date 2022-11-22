import { FC } from 'react';
import { IPipelineProcessNodeStatus } from './types';
interface IconProps {
  type: `${IPipelineProcessNodeStatus}`;
}
declare const Icon: FC<IconProps>;
export default Icon;
