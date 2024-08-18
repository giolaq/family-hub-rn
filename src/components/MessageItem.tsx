import React, { useState } from 'react';
import { View, ViewProps, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';
import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';

interface Message {
  id: string;
  sender: string;
  preview: string;
  time: string;
}

interface MessageItemProps {
  message: Message;
  onDeleteMessage: (id: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onDeleteMessage }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <SpatialNavigationFocusableView>
      {({ isFocused }) => (
        <MessageContainer
          style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
          onPointerEnter={() => setShowDeleteButton(true)}
          onPointerLeave={() => setShowDeleteButton(false)}
        >
          <MessageContent>
            <SenderAvatar>
              <AvatarText>{message.sender[0]}</AvatarText>
            </SenderAvatar>
            <MessageDetails>
              <MessageHeader>
                <SenderName>{message.sender}</SenderName>
                <MessageTime>{message.time}</MessageTime>
              </MessageHeader>
              <MessagePreview>{message.preview}</MessagePreview>
            </MessageDetails>
          </MessageContent>
          {showDeleteButton && (
            <DeleteButton onPress={() => onDeleteMessage(message.id)}>
              <DeleteButtonText>&times;</DeleteButtonText>
            </DeleteButton>
          )}
        </MessageContainer>
      )}
    </SpatialNavigationFocusableView>
  );
};

const MessageContainer = styled(View)({
  position: 'relative',
  marginBottom: scaledPixels(20),
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(15),
  overflow: 'hidden',
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: scaledPixels(8),
  borderWidth: scaledPixels(2),
  borderColor: '#E0E0E0',
});

const MessageContent = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  padding: scaledPixels(20),
});

const SenderAvatar = styled(View)({
  width: scaledPixels(80),
  height: scaledPixels(80),
  borderRadius: scaledPixels(40),
  backgroundColor: '#4A90E2',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: scaledPixels(20),
});

const AvatarText = styled(Typography)({
  fontSize: scaledPixels(36),
  color: '#FFFFFF',
  fontWeight: 'bold',
});

const MessageDetails = styled(View)({
  flex: 1,
});

const MessageHeader = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: scaledPixels(10),
});

const SenderName = styled(Typography)({
  fontSize: scaledPixels(32),
  fontWeight: '600',
  color: '#333333',
});

const MessageTime = styled(Typography)({
  fontSize: scaledPixels(24),
  color: '#757575',
});

const MessagePreview = styled(Typography)({
  fontSize: scaledPixels(28),
  color: '#757575',
  numberOfLines: 2,
  ellipsizeMode: 'tail',
});

const DeleteButton = styled(TouchableOpacity)({
  position: 'absolute',
  top: 0,
  right: 0,
  width: scaledPixels(80),
  height: '100%',
  backgroundColor: 'rgba(255, 165, 0, 1)',
  justifyContent: 'center',
  alignItems: 'center',
});

const DeleteButtonText = styled(Typography)({
  fontSize: scaledPixels(40),
  color: '#FFFFFF',
});

export default MessageItem;