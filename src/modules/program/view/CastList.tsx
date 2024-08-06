import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MutableRefObject, useCallback, useMemo } from 'react';
import {
  SpatialNavigationNode,
  SpatialNavigationVirtualizedList,
  SpatialNavigationVirtualizedListRef,
} from 'react-tv-space-navigation';
import { RootStackParamList } from '../../../../App';
import { ProgramInfo } from '../domain/programInfo';
import { getPrograms } from '../infra/programInfos';
import { ProgramNode } from './ProgramNode';
import { scaledPixels } from '../../../design-system/helpers/scaledPixels';
import { LeftArrow, RightArrow } from '../../../design-system/components/Arrows';
import { StyleSheet } from 'react-native';
import { theme } from '../../../design-system/theme/theme';
import { CastNode } from './CastNode';
const Cast1 = require('../assets/eric.png');
const Cast2 = require('../assets/gio.jpg');

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 7;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;
const ROW_PADDING = scaledPixels(90);

export const CastList = ({
  orientation,
  containerStyle,
  listRef,
  data,
}: {
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
  listRef: MutableRefObject<SpatialNavigationVirtualizedListRef>;
  data?: ProgramInfo[];
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = useCallback(
    ({ item, index }: { item: ProgramInfo; index: number }) => (
      <CastNode
        programInfo={item}
        onSelect={() => navigation.push('ProgramDetail', { programInfo: item })}
        label={item.title.toString()}
      />
    ),
    [navigation],
  );
  const theme = useTheme();

  // const programInfos = useMemo(() => getPrograms(1000), []);

  const programInfos = [
  {
    id: '1',
    title: 'Eric',
    image: Cast1,
    description: 'Movie 1 description',
    cast: null,
  },
  {
    id: '2',
    title: 'Gio',
    image: Cast2,
    description: 'Movie 2 description',
    cast: ['Giovanni', 'Eric'],
  }]

  return (
    <SpatialNavigationNode>
      {({ isActive }) => (
        <Container isActive={isActive} style={containerStyle}>
          <SpatialNavigationVirtualizedList
            orientation={orientation}
            data={data ?? programInfos}
            renderItem={renderItem}
            itemSize={theme.sizes.program.portrait.width + 10}
            numberOfRenderedItems={WINDOW_SIZE}
            numberOfItemsVisibleOnScreen={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
            onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
            // descendingArrow={isActive ? <LeftArrow /> : null}
            // descendingArrowContainerStyle={styles.leftArrowContainer}
            // ascendingArrow={isActive ? <RightArrow /> : null}
            // ascendingArrowContainerStyle={styles.rightArrowContainer}
            ref={listRef}
          />
        </Container>
      )}
    </SpatialNavigationNode>
  );
};

export const ProgramsRow = ({
  containerStyle,
  listRef,
}: {
  containerStyle?: object;
  listRef: MutableRefObject<SpatialNavigationVirtualizedListRef>;
}) => {
  const theme = useTheme();
  return (
    <CastList
      containerStyle={{
        ...containerStyle,
        height: theme.sizes.program.portrait.height + ROW_PADDING,
      }}
      listRef={listRef}
    />
  );
};

export const CastRow = ({
  containerStyle,
  listRef,
}: {
  containerStyle?: object;
  listRef: MutableRefObject<SpatialNavigationVirtualizedListRef>;
}) => {
  const theme = useTheme();
  return (
    <CastList
      containerStyle={{
        ...containerStyle,
        height: scaledPixels(200),
      }}
      listRef={listRef}
    />
  );
};

const Container = styled.View<{ isActive: boolean }>(({ isActive, theme }) => ({
  backgroundColor: 'transparent',
  // backgroundColor: isActive
  //   ? theme.colors.background.mainActive
  //   : theme.colors.background.mainHover,
  padding: theme.spacings.$2,
  borderRadius: scaledPixels(20),
}));

const styles = StyleSheet.create({
  leftArrowContainer: {
    width: 120,
    height: scaledPixels(260) + 2 * theme.spacings.$8,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    left: -theme.spacings.$8,
  },
  rightArrowContainer: {
    width: 120,
    height: scaledPixels(260) + 2 * theme.spacings.$8,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    right: -theme.spacings.$8,
  },
});
