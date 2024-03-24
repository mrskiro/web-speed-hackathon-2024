import styled from 'styled-components';

import hero from '../../../../../client/assets/hero.webp';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  height: auto;
  aspect-ratio: 16 / 9;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Image alt="Cyber TOON" height={576} src={hero} width={1024} />
    </_Wrapper>
  );
};
