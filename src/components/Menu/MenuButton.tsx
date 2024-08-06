import styled from '@emotion/native';
import { forwardRef } from 'react';
import { Animated, View } from 'react-native';
import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';
import { scaledPixels } from '../../design-system/helpers/scaledPixels';
import { useFocusAnimation } from '../../design-system/helpers/useFocusAnimation';
import { theme } from '../../design-system/theme/theme';
import { Icon } from '../../design-system/helpers/Icons';
import { IconName } from '../../design-system/helpers/IconsCatalog';
import { Spacer } from '../../design-system/components/Spacer';
import { Typography } from '../../design-system/components/Typography';
import { Box } from '../../design-system/components/Box';

type ButtonProps = {
  icon: IconName;
  isMenuOpen: boolean;
  onSelect?: () => void;
  label: string;
};

const ButtonContent = forwardRef<
  View,
  { icon: IconName; isFocused: boolean; isMenuOpen: boolean; label: string }
>((props, ref) => {
  const { isFocused, icon, isMenuOpen, label } = props;
  const anim = useFocusAnimation(isFocused && isMenuOpen);
  return (
    <Container style={anim} isFocused={isFocused} isMenuOpen={isMenuOpen} ref={ref}>
      <Box direction="horizontal" alignItems="center" paddingRight="$20">
        <Icon
          icon={icon}
          size={theme.sizes.menu.icon}
          color={
            isFocused && isMenuOpen
              ? theme.colors.background.main
              : theme.colors.background.contrastText
          }
        />
        {isMenuOpen && (
          <>
            <Spacer direction="horizontal" gap="$2" />
            <ColoredTypography isFocused={isFocused}>{label}</ColoredTypography>
          </>
        )}
      </Box>
    </Container>
  );
});

ButtonContent.displayName = 'ButtonContent';

export const MenuButton = ({ icon, isMenuOpen, onSelect, label }: ButtonProps) => {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <ButtonContent icon={icon} isFocused={isFocused} isMenuOpen={isMenuOpen} label={label} />
      )}
    </SpatialNavigationFocusableView>
  );
};

const Container = styled(Animated.View)<{ isFocused: boolean; isMenuOpen: boolean }>(
  ({ isFocused, isMenuOpen, theme }) => ({
    alignSelf: 'baseline',
    backgroundColor: isFocused && isMenuOpen ? 'white' : 'transparent',
    padding: theme.spacings.$4,
    borderRadius: scaledPixels(12),
    cursor: 'pointer',
  }),
);

const ColoredTypography = styled(Typography)<{ isFocused: boolean }>(({ isFocused }) => ({
  color: isFocused ? 'black' : 'white',
}));
