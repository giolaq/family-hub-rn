import React from 'react';
import styled from '@emotion/native';
import { View, ActivityIndicator } from 'react-native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';
import { DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView } from 'react-tv-space-navigation';
import { SpatialNavigationOverlay } from './modals/SpatialNavigationOverlay/SpatialNavigationOverlay';
import { Button } from '../design-system/components/Button';

interface AIResponseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  response: string;
  isLoading: boolean;
}

const AIResponseDialog: React.FC<AIResponseDialogProps> = ({ isOpen, onClose, response, isLoading }) => {
  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
        <PopupTitle>AI Assistant Response</PopupTitle>
        <SpatialNavigationOverlay isModalVisible={isOpen} hideModal={onClose}>
          <SpatialNavigationView direction='vertical'>
            <ResponseContent>
              {isLoading ? (
                <ActivityIndicator size="large" color="#4A90E2" />
              ) : (
                <ResponseText>{response}</ResponseText>
              )}
            </ResponseContent>
            <ButtonGroup>
              <SpatialNavigationView direction='horizontal'>
                <ButtonWrapper>
                  <DefaultFocus>
                    <Button label="Close" onSelect={onClose} />
                  </DefaultFocus>
                </ButtonWrapper>
              </SpatialNavigationView>
            </ButtonGroup>
          </SpatialNavigationView>
        </SpatialNavigationOverlay>
      </PopupContent>
    </PopupOverlay>
  );
};

const PopupOverlay = styled(View)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  justifyContent: 'center',
  alignItems: 'center',
});

const PopupContent = styled(View)({
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(20),
  padding: scaledPixels(40),
  width: scaledPixels(800),
  maxWidth: '90%',
  maxHeight: '90%',
});

const PopupTitle = styled(Typography)({
  fontSize: scaledPixels(48),
  fontWeight: '600',
  color: '#4A90E2',
  marginBottom: scaledPixels(40),
});

const ResponseContent = styled(View)({
  marginBottom: scaledPixels(30),
  minHeight: scaledPixels(100),
  justifyContent: 'center',
});

const ResponseText = styled(Typography)({
  fontSize: scaledPixels(28),
  color: '#333333',
});

const ButtonGroup = styled(View)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingEnd: scaledPixels(40),
  marginTop: scaledPixels(40),
  marginBottom: scaledPixels(20),
});

const ButtonWrapper = styled(View)({
  marginLeft: scaledPixels(20),
});

export default AIResponseDialog;