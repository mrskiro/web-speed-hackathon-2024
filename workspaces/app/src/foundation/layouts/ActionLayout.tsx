import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Box } from '../components/Box';
import { Container } from '../components/Container';
import { Flex } from '../components/Flex';
import { Color, Space } from '../styles/variables';

const Footer = lazy(() => import('../components/Footer'));

const _Header = styled.header`
  padding: ${Space * 2}px;
  border-bottom: 1px solid ${Color.MONO_0};
`;

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export const ActionLayout: React.FC<Props> = ({ leftContent, rightContent }) => {
  return (
    <Container>
      <_Header>
        <Flex align="center" justify="space-between">
          {leftContent}
          {rightContent}
        </Flex>
      </_Header>

      <Box as="main" height="100%" py={Space * 2}>
        <Outlet />
      </Box>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </Container>
  );
};
