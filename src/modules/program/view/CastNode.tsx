import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { Cast } from './Cast';
import { LongProgram } from './LongProgram';
import { forwardRef } from 'react';
import { SpatialNavigationNodeRef } from 'react-tv-space-navigation';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  indexRange?: [number, number];
  label?: string;
};

export const CastNode = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, indexRange, label }: Props, ref) => {
    return (
      <SpatialNavigationFocusableView
        onSelect={onSelect}
        indexRange={indexRange}
        viewProps={{ accessibilityLabel: programInfo.title }}
        ref={ref}
      >
        {({ isFocused, isRootActive }) => (
          <Cast isFocused={isFocused && isRootActive} programInfo={programInfo} label={label} />
        )}
      </SpatialNavigationFocusableView>
    );
  },
);
CastNode.displayName = 'CastNode';

