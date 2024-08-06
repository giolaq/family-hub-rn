import { Direction } from '@bam.tech/lrud';
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import { useMenuContext } from './MenuContext';
import { Fragment, useCallback, useEffect, useRef } from 'react';
import { Animated, Dimensions, Platform, View } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../../design-system/components/Typography';
import { Spacer } from '../../design-system/components/Spacer';
import { Box } from '../../design-system/components/Box';
import { useTheme } from '@emotion/react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MenuButton } from './MenuButton';
import { IconName } from '../../design-system/helpers/IconsCatalog';
import { RootTabParamList, SettingsTabParamList, UserTabParamList } from '../../../App';
import { Text } from 'react-native';
import { scaledPixels } from '../../design-system/helpers/scaledPixels';

const windowDimensions = Dimensions.get('window');
const MenuItem = ({
  label,
  icon,
  isMenuOpen,
  isActive,
  onSelect,
}: {
  label: string;
  icon: IconName;
  isMenuOpen: boolean;
  isActive: boolean;
  onSelect: () => void;
}) => {
  return (
    <Box direction="horizontal" alignItems="center">
      {/* <ActiveIndicator isActive={isActive} /> */}
      <MenuButton icon={icon} onSelect={() => onSelect()} label={label} isMenuOpen={isMenuOpen} />
      {/* {isMenuOpen && (
        <>
          <Spacer direction="horizontal" gap="$2" />
          <Typography>{label}</Typography>
        </>
      )} */}
    </Box>
  );
};

interface MenuItems {
  label: string;
  icon: IconName;
}

const menuItems: Record<keyof RootTabParamList, MenuItems> = {
  Home: { label: 'Home', icon: 'Tv' },
  ProgramGridPage: { label: 'Movies', icon: 'Clapperboard' },
  NonVirtualizedGridPage: { label: 'Series', icon: 'LayoutGrid' },
  // GridWithLongNodesPage: {
  //   label: 'Grid with long nodes',
  //   icon: 'LayoutDashboard',
  // },
  // ListWithVariableSize: { label: 'List with variable size', icon: 'LayoutDashboard' },
  // AsynchronousContent: { label: 'Asynchronous content', icon: 'Timer' },
};

const profile: Record<keyof UserTabParamList, MenuItems> = {
  Profile: { label: 'Profile', icon: 'CircleUser' },
};

const settings: Record<keyof SettingsTabParamList, MenuItems> = {
  Settings: { label: 'Settings', icon: 'Settings' },
};

export const Menu = ({ state, navigation }: BottomTabBarProps) => {
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const theme = useTheme();
  const animatedWidth = useRef(
    new Animated.Value(isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed),
  ).current;
  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Direction) => {
      if (movement === 'right') {
        toggleMenu(false);
      }
    },
    [toggleMenu],
  );

  const menuWebProps = Platform.select({
    web: {
      onMouseEnter: () => {
        toggleMenu(true);
      },
      onMouseLeave: () => {
        toggleMenu(false);
      },
    },
    default: {},
  });

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, isMenuOpen, theme.sizes.menu.closed, theme.sizes.menu.open]);
  return (
    <SpatialNavigationRoot
      isActive={isMenuOpen}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >
      <AbsoluteMenuContainer>
        <SpatialNavigationView direction="vertical">
          <MenuSpacer />
          <MenuOverlay style={{ width: animatedWidth }} />
          <MenuContainer isOpen={isMenuOpen} {...menuWebProps}>
            <DefaultFocus>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                {
                  <Fragment key={'profile'}>
                    <MenuItem
                      label={profile['Profile'].label}
                      icon={profile['Profile'].icon}
                      isMenuOpen={isMenuOpen}
                      isActive={false}
                      onSelect={() => {}}
                    />
                    <Spacer direction="vertical" gap={'$4'} />
                  </Fragment>
                }
              </View>
              <View style={{ paddingTop: scaledPixels(160) }}>
                {state.routes.map((route, index) => {
                  return (
                    <Fragment key={route.key}>
                      <MenuItem
                        label={menuItems[route.name].label}
                        icon={menuItems[route.name].icon}
                        isMenuOpen={isMenuOpen}
                        isActive={state.index === index}
                        onSelect={() => navigation.navigate(route.name, route.params)}
                      />
                      <Spacer direction="vertical" gap={'$4'} />
                    </Fragment>
                  );
                })}
              </View>
              <View style={{ paddingTop: scaledPixels(100) }}>
                {
                  <Fragment key={'settings'}>
                    <MenuItem
                      label={settings['Settings'].label}
                      icon={settings['Settings'].icon}
                      isMenuOpen={isMenuOpen}
                      isActive={false}
                      onSelect={() => {}}
                    />
                    <Spacer direction="vertical" gap={'$4'} />
                  </Fragment>
                }
              </View>
              </View>
            </DefaultFocus>
          </MenuContainer>
        </SpatialNavigationView>
      </AbsoluteMenuContainer>
    </SpatialNavigationRoot>
  );
};

const MenuContainer = styled.View<{ isOpen: boolean }>(({ isOpen, theme }) => ({
  position: 'absolute',
  left: 0,
  backgroundColor: 'transparent',
  width: isOpen ? theme.sizes.menu.open : theme.sizes.menu.closed,
  height: windowDimensions.height,
  paddingTop: theme.spacings.$4,
  paddingLeft: theme.spacings.$4,
  justifyContent: 'flex-start',
}));

const MenuOverlay = styled(Animated.View)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  backgroundColor: '#000000C0',
  height: windowDimensions.height,
}));

const ActiveIndicator = styled.View<{ isActive: boolean }>(({ isActive, theme }) => ({
  marginRight: 6,
  width: 4,
  height: '80%',
  backgroundColor: isActive ? theme.colors.primary.main : 'transparent',
  borderRadius: 4,
}));

const MenuSpacer = styled.View(({ theme }) => ({
  width: theme.sizes.menu.closed,
}));

const AbsoluteMenuContainer = styled.View({
  position: 'absolute',
});
