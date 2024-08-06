import { MutableRefObject } from 'react';
import { Box } from '../../../design-system/components/Box';
import { Spacer } from '../../../design-system/components/Spacer';
import { Typography } from '../../../design-system/components/Typography';
import { CastRow } from './CastList';
import { ProgramsRowVariableSize } from './ProgramListVariableSize';
import { SpatialNavigationVirtualizedListRef } from 'react-tv-space-navigation';
type Props = {
  title: string;
  listRef?: MutableRefObject<SpatialNavigationVirtualizedListRef>;
};

export const CastListWithTitle = ({ title, listRef }: Props) => {
  return (
    <Box direction="vertical">
      <Typography variant="body" fontWeight="strong">
        {title}
      </Typography>
      <Spacer direction="vertical" gap="$2" />
      <CastRow listRef={listRef ?? null} />
    </Box>
  );
};
