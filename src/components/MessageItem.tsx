import React from 'react';
import { View, ViewProps } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';

interface Message {
  sender: string;
  preview: string;
  time: string;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <MessageContainer>
      <SenderAvatar>
        <AvatarText>{message.sender[0]}</AvatarText>
      </SenderAvatar>
      <MessageContent>
        <MessageHeader>
          <SenderName>{message.sender}</SenderName>
          <MessageTime>{message.time}</MessageTime>
        </MessageHeader>
        <MessagePreview>{message.preview}</MessagePreview>
      </MessageContent>
    </MessageContainer>
  );
};

const MessageContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: scaledPixels(20),
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(15),
  padding: scaledPixels(20),
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: scaledPixels(8),
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

const MessageContent = styled(View)({
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

export default MessageItem;