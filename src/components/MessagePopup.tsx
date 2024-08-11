import React, { useState } from 'react';
import styled from '@emotion/native';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';
import { Picker } from '@react-native-picker/picker';

interface MessagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { sender: string, message: string, time: string }) => void;
}

const MessagePopup: React.FC<MessagePopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');

  const senders = ["Mom", "Dad", "Sarah", "Lisa", "John", "Mike"]

  const handleSubmit = () => {
    const time = getCurrentTime();
    onSubmit({ sender, message, time });
    onClose();
    resetForm();
  };

  function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  }

  const resetForm = () => {
    setSender('');
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
        <PopupTitle>Create a New Message</PopupTitle>
        <FormGroup>
          <Label>Sender: </Label>
          <StyledPicker
              selectedValue={sender}
              onValueChange={(itemValue : string) => setSender(itemValue)}
            >
              <Picker.Item label="Select a sender" value="" />
              {senders.map((senderValue, index) => (
                <Picker.Item key={index} label={senderValue} value={senderValue}/>
              ))}
            </StyledPicker>
        </FormGroup>
        <FormGroup>
          <Label>Message: </Label>
          <Input
            value={message}
            onChangeText={setMessage}
            placeholder="Enter Message"
          />
        </FormGroup>
        <ButtonGroup>
          <Button onPress={handleSubmit}>
            <ButtonText>Submit</ButtonText>
          </Button>
          <Button onPress={onClose} isSecondary>
            <ButtonText isSecondary>Cancel</ButtonText>
          </Button>
        </ButtonGroup>
      </PopupContent>
    </PopupOverlay>
  );
};

const StyledPicker = styled(Picker)({
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: scaledPixels(10),
    padding: scaledPixels(15),
    fontSize: scaledPixels(28),
    color: '#333333',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: scaledPixels(60),
  });

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

const FormGroup = styled(View)({
  marginBottom: scaledPixels(30),
});

const Label = styled(Typography)({
  fontSize: scaledPixels(32),
  color: '#333333',
  marginBottom: scaledPixels(10),
});

const Input = styled.TextInput({
  borderWidth: 2,
  borderColor: '#E0E0E0',
  borderRadius: scaledPixels(10),
  padding: scaledPixels(15),
  fontSize: scaledPixels(28),
  color: '#333333',
  height: scaledPixels(60),
});

const ButtonGroup = styled(View)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: scaledPixels(40),
});

const Button = styled(TouchableOpacity)<{ isSecondary?: boolean }>(({ isSecondary }) => ({
  backgroundColor: isSecondary ? '#FFFFFF' : '#4A90E2',
  borderRadius: scaledPixels(10),
  padding: scaledPixels(20),
  marginLeft: scaledPixels(20),
  minWidth: scaledPixels(200),
  alignItems: 'center',
  borderWidth: isSecondary ? 2 : 0,
  borderColor: isSecondary ? '#4A90E2' : 'transparent',
}));

const ButtonText = styled(Typography)<{ isSecondary?: boolean }>(({ isSecondary }) => ({
  color: isSecondary ? '#4A90E2' : '#FFFFFF',
  fontSize: scaledPixels(32),
  fontWeight: '600',
}));

export default MessagePopup;