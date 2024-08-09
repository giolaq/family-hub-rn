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
        <Typography>{message.sender[0]}</Typography>
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
  marginBottom: scaledPixels(10),
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(8),
  padding: scaledPixels(10),
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: scaledPixels(4),
});

const SenderAvatar = styled(View)({
  width: scaledPixels(40),
  height: scaledPixels(40),
  borderRadius: scaledPixels(20),
  backgroundColor: '#4A90E2',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: scaledPixels(10),
});

const MessageContent = styled(View)({
  flex: 1,
});

const MessageHeader = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: scaledPixels(5),
});

const SenderName = styled(Typography)({
  fontSize: scaledPixels(16),
  fontWeight: '600',
  color: '#333333',
});

const MessageTime = styled(Typography)({
  fontSize: scaledPixels(12),
  color: '#757575',
});

const MessagePreview = styled(Typography)({
  fontSize: scaledPixels(14),
  color: '#757575',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
});

export default MessageItem;