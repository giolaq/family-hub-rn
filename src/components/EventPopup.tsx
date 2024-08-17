import React, { useState } from 'react';
import styled from '@emotion/native';
import { View, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';
import { DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView } from 'react-tv-space-navigation';
import { SpatialNavigationOverlay } from './modals/SpatialNavigationOverlay/SpatialNavigationOverlay';
import { Button } from '../design-system/components/Button';

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
        <PopupTitle>Create a New Event</PopupTitle>
        <SpatialNavigationOverlay isModalVisible={isOpen} hideModal={onClose}>
          <ScrollView>
            <SpatialNavigationView direction='vertical'>
              <FormGroup>
                <Label htmlFor="title">Event Title:</Label>
                <SpatialNavigationFocusableView>
                  {({ isFocused }) => (
                    <Input
                      id="title"
                      value={title}
                      onChangeText={setTitle}
                      placeholder="Enter event title"
                      style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
                    />
                  )}
                </SpatialNavigationFocusableView>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="date">Date:</Label>
                <SpatialNavigationFocusableView>
                  {({ isFocused }) => (
                    <StyledPicker
                      selectedValue={date}
                      onValueChange={(itemValue) => setDate(itemValue)}
                      style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
                    >
                      <Picker.Item label="Select a date" value="" />
                      {generateDateOptions()}
                    </StyledPicker>
                  )}
                </SpatialNavigationFocusableView>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="time">Time:</Label>
                <SpatialNavigationFocusableView>
                  {({ isFocused }) => (
                    <StyledPicker
                      selectedValue={time}
                      onValueChange={(itemValue) => setTime(itemValue)}
                      style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
                    >
                      <Picker.Item label="Select a time" value="" />
                      {generateTimeOptions()}
                    </StyledPicker>
                  )}
                </SpatialNavigationFocusableView>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="assignedTo">Assigned To:</Label>
                <SpatialNavigationFocusableView>
                  {({ isFocused }) => (
                    <Input
                      id="assignedTo"
                      value={assignedTo}
                      onChangeText={setAssignedTo}
                      placeholder="Enter name"
                      style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
                    />
                  )}
                </SpatialNavigationFocusableView>
              </FormGroup>
              <ButtonGroup>
                <SpatialNavigationView direction='horizontal'>
                  <ButtonWrapper>
                    <Button label="Create Event" onSelect={handleSubmit} />
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


export default EventPopup;