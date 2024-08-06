import styled from '@emotion/native';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { ProgramInfo } from '../domain/programInfo';
import { useFocusAnimation } from '../../../design-system/helpers/useFocusAnimation';
import { Typography } from '../../../design-system/components/Typography';
import { Spacer } from '../../../design-system/components/Spacer';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { theme } from '../../../design-system/theme/theme';
import { scaledPixels } from '../../../design-system/helpers/scaledPixels';

type ProgramProps = {
  isFocused?: boolean;
  programInfo: ProgramInfo;
  label?: string;
};

const Label = ({ label }: { label: string }) => {
  return <LabelStyled>{label}</LabelStyled>;
};

const LabelStyled = styled(Typography)(() => ({
  paddingTop: scaledPixels(16),
  textAlign: 'center',
}));

export const Program = React.forwardRef<View, ProgramProps>(
  ({ isFocused = false, programInfo, label }, ref) => {
    const imageSource = programInfo.image;

  //  const scaleAnimation = useFocusAnimation(isFocused);

    const scaleValue = useSharedValue(1);
    const borderWidthValue = useSharedValue(0);
    const borderColorValue = useSharedValue('blue');

    const handleFocus = () => {
      scaleValue.value = withSpring(1.1);
      borderWidthValue.value = withTiming(2);
      borderColorValue.value = withTiming('blue');
    };

    const handleBlur = () => {
      scaleValue.value = withSpring(1);
      borderWidthValue.value = withTiming(0);
      borderColorValue.value = withTiming("blue");
    };

    const cardStyle = useAnimatedStyle(() => ({
      width: theme.sizes.program.portrait.width ,
      aspectRatio: 16 / 9,
      transform: [{ scale: scaleValue.value }],
      elevation: scaleValue.value === 1 ? 0 : 1.1,
    }));

    useEffect(() => {
      if (isFocused) {
        handleFocus();
      } else {
        handleBlur();
      }
    }, [isFocused]);

    return (
      <View> 
         <Animated.View style={[cardStyle]}>
          <ProgramContainer
           // style={scaleAnimation} // Apply the animated scale transform
            ref={ref}
            isFocused={isFocused}
          >
            <ProgramImage source={imageSource} accessible />
            {/* {label ? (
            <Overlay>
              <Label label={label} />
            </Overlay>
          ) : null} */}
          </ProgramContainer>
          </Animated.View>
        <Label label={label} />
      </View>
    );
  },
);

Program.displayName = 'Program';

const ProgramContainer = styled(Animated.View)<{ isFocused: boolean }>(({ isFocused, theme }) => ({
  height: theme.sizes.program.portrait.height,
  width: theme.sizes.program.portrait.width,
  overflow: 'hidden',
  alignSelf: 'center',
  borderRadius: 20,
  borderColor: isFocused ? theme.colors.primary.light : 'transparent',
  borderWidth: 3,
  cursor: 'pointer',
}));

const ProgramImage = styled(Image)({
  height: '100%',
  width: '100%',
});

const Overlay = styled.View({
  position: 'absolute',
  bottom: 22,
  left: 12,
});
