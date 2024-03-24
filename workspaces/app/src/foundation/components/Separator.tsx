import styled from 'styled-components';

import { Color } from '../styles/variables';

const H = styled.hr`
  display: block;
  width: 100%;
  height: 1px;
  background-color: ${Color.MONO_20};
  margin: 0;
  border: none;
`;
export const Separator: React.FC = () => {
  return <H />;
};
