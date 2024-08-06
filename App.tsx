import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { GoBackConfiguration } from './src/components/GoBackConfiguration';
import { theme } from './src/design-system/theme/theme';
import { Menu } from './src/components/Menu/Menu';
import { MenuProvider } from './src/components/Menu/MenuContext';
import styled from '@emotion/native';
import { useFonts } from './src/hooks/useFonts';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProgramInfo } from './src/modules/program/domain/programInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTVPanEvent } from './src/components/PanEvent/useTVPanEvent';

import { SpatialNavigationDeviceTypeProvider } from 'react-tv-space-navigation';
import FamilyHubHome from './src/pages/FamilyHubHome';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Home: undefined;
  ProgramGridPage: undefined;
  NonVirtualizedGridPage: undefined;
  // GridWithLongNodesPage: undefined;
  // ListWithVariableSize: undefined;
  // AsynchronousContent: undefined;
};

export type UserTabParamList = {
  Profile: undefined;
};

export type SettingsTabParamList = {
  Settings: undefined;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  ProgramDetail: { programInfo: ProgramInfo };
};

const RenderMenu = (props: BottomTabBarProps) => <Menu {...props} />;

const TabNavigator = () => {
  return (
    <MenuProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
        tabBar={RenderMenu}
        sceneContainerStyle={{
          marginLeft: theme.sizes.menu.closed,
          backgroundColor: theme.colors.background.main,
        }}
      >
        <Tab.Screen name="Home" component={FamilyHubHome} />
        <Tab.Screen name="ProgramGridPage" component={Home} />
        <Tab.Screen name="NonVirtualizedGridPage" component={Home} />
      </Tab.Navigator>
    </MenuProvider>
  );
};

function App(): JSX.Element {
  //useTVPanEvent();
  const { height, width } = useWindowDimensions();
  const areFontsLoaded = useFonts();

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SpatialNavigationDeviceTypeProvider>
          <GoBackConfiguration />

          <Container width={width} height={height}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: theme.colors.background.main,
                },
              }}
              initialRouteName="FamilyHubHome"
            >
              <Stack.Screen name="FamilyHubHome" component={FamilyHubHome} />
            </Stack.Navigator>
          </Container>
        </SpatialNavigationDeviceTypeProvider>
      </ThemeProvider>
    </NavigationContainer>
    
  );
}

export default App;

const Container = styled.View<{ width: number; height: number }>(({ width, height }) => ({
  width,
  height,
  flexDirection: 'row-reverse',
  backgroundColor: theme.colors.background.main,
}));
