import React, { useState } from 'react';
import styled from '@emotion/native';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; date: string; time: string; assignedTo: string }) => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = () => {
    onSubmit({ title, date, time, assignedTo });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDate('');
    setTime('');
    setAssignedTo('');
  };

  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
        <ScrollView>
          <PopupTitle>Create a New Event</PopupTitle>
          <FormGroup>
            <Label>Event Title:</Label>
            <Input
              value={title}
              onChangeText={setTitle}
              placeholder="Enter event title"
            />
          </FormGroup>
          <FormGroup>
            <Label>Date:</Label>
            <StyledPicker
              selectedValue={date}
              onValueChange={(itemValue) => setDate(itemValue)}
            >
              <Picker.Item label="Select a date" value="" />
              {generateDateOptions()}
            </StyledPicker>
          </FormGroup>
          <FormGroup>
            <Label>Time:</Label>
            <StyledPicker
              selectedValue={time}
              onValueChange={(itemValue) => setTime(itemValue)}
            >
              <Picker.Item label="Select a time" value="" />
              {generateTimeOptions()}
            </StyledPicker>
          </FormGroup>
          <FormGroup>
            <Label>Assigned To:</Label>
            <Input
              value={assignedTo}
              onChangeText={setAssignedTo}
              placeholder="Enter name"
            />
          </FormGroup>
          <ButtonGroup>
            <Button onPress={handleSubmit}>
              <ButtonText>Create Event</ButtonText>
            </Button>
            <Button onPress={onClose} isSecondary>
              <ButtonText isSecondary>Cancel</ButtonText>
            </Button>
          </ButtonGroup>
        </ScrollView>
      </PopupContent>
    </PopupOverlay>
  );
};

const generateDateOptions = () => {
  const options = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    options.push(
      <Picker.Item key={formattedDate} label={formattedDate} value={formattedDate} />
    );
  }
  return options;
};

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push(
        <Picker.Item key={time} label={time} value={time} />
      );
    }
  }
  return options;
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

export default EventPopup;