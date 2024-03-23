import { Suspense } from 'react';

import { FeatureCard } from '../../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../../features/feature/hooks/useFeatureList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Space } from '../../../foundation/styles/variables';

const _FeatureList = () => {
  const { data: featureList } = useFeatureList({ query: {} });
  return (
    <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
        {featureList.map((feature) => (
          <FeatureCard key={feature.id} book={feature.book} />
        ))}
      </Flex>
    </Box>
  );
};

export const FeatureList = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            backgroundColor: '#f5f5f5',
            height: 206,
            width: '100%',
          }}
        />
      }
    >
      <_FeatureList />
    </Suspense>
  );
};
