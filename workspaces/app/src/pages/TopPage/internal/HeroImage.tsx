import styled from 'styled-components';

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
      <_Image alt="Cyber TOON" height={576} src="/assets/hero.webp" width={1024} />
    </_Wrapper>
  );
};
