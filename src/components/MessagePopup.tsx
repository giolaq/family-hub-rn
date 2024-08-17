import React, { useState } from 'react';
import styled from '@emotion/native';
import { View, ScrollView } from 'react-native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';
import { Picker } from '@react-native-picker/picker';
import { DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView } from 'react-tv-space-navigation';
import { SpatialNavigationOverlay } from './modals/SpatialNavigationOverlay/SpatialNavigationOverlay';
import { Button } from '../design-system/components/Button';

interface MessagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { sender: string, message: string, time: string }) => void;
}

const MessagePopup: React.FC<MessagePopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');

  const senders = ["Mom", "Dad", "Sarah", "Lisa", "John", "Mike"];

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
        <SpatialNavigationOverlay isModalVisible={isOpen} hideModal={onClose}>
          <ScrollView>
            <SpatialNavigationView direction='vertical'>
              <FormGroup>
                <Label htmlFor="sender">Sender: </Label>
                <SpatialNavigationFocusableView>
                  {({ isFocused }) => (
                    <StyledPicker
                      selectedValue={sender}
                      onValueChange={(itemValue: string) => setSender(itemValue)}
                      style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
                    >
                      <Picker.Item label="Select a sender" value="" />
                      {senders.map((senderValue, index) => (
                        <Picker.Item key={index} label={senderValue} value={senderValue} />
                      ))}
                    </StyledPicker>
                  )}
                </SpatialNavigationFocusableView>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="message">Message: </Label>
                <SpatialNavigationFocusableView>
                  {({ isFocused }) => (
                    <Input
                      id="message"
                      value={message}
                      onChangeText={setMessage}
                      placeholder="Enter Message"
                      style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
                    />
                  )}
                </SpatialNavigationFocusableView>
              </FormGroup>
              <ButtonGroup>
                <SpatialNavigationView direction='horizontal'>
                  <ButtonWrapper>
                    <Button label="Submit" onSelect={handleSubmit} />
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <DefaultFocus>
                      <Button label="Cancel" onSelect={onClose} />
                    </DefaultFocus>
                  </ButtonWrapper>
                </SpatialNavigationView>
              </ButtonGroup>
            </SpatialNavigationView>
          </ScrollView>
        </SpatialNavigationOverlay>
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
  height: scaledPixels(80),
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

const ButtonGroup = styled(View)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingEnd: scaledPixels(40),
  marginTop: scaledPixels(40),
  marginBottom: scaledPixels(20), // Add space at the bottom
});

const ButtonWrapper = styled(View)({
  marginLeft: scaledPixels(20), // Add space between buttons
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


export default MessagePopup;