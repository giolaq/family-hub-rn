import React, { useState } from 'react';
import styled from '@emotion/native';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';
import { DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView } from 'react-tv-space-navigation';
import { SpatialNavigationOverlay } from './modals/SpatialNavigationOverlay/SpatialNavigationOverlay';
import { Button } from '../design-system/components/Button';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { task: string; assignedTo: string }) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [task, setTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = () => {
    onSubmit({ task, assignedTo });
    onClose();
    setTask('');
    setAssignedTo('');
  };

  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
        <PopupTitle>Create a New Task</PopupTitle>
        <SpatialNavigationOverlay isModalVisible={isOpen} hideModal={onClose}>
        <SpatialNavigationView direction='vertical' >
        <FormGroup>
          <Label htmlFor="task">Task: </Label>
          <SpatialNavigationFocusableView>
          {({ isFocused }) => (
          <Input
            id="task"
            value={task}
            onChangeText={setTask}
            placeholder="Enter task"
            style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
          />
         )}
          </SpatialNavigationFocusableView>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="assignedTo">Assigned To: </Label>
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
        <SpatialNavigationView direction='horizontal' >
          <ButtonWrapper>
           <Button label="Submit" onSelect={handleSubmit}  />
          </ButtonWrapper>
          <ButtonWrapper>
          <DefaultFocus>
          <Button label="Cancel" onSelect={onClose} />
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
  paddingEnd: scaledPixels(40),
  marginTop: scaledPixels(40),
  marginBottom: scaledPixels(20), // Add space at the bottom
});

const ButtonWrapper = styled(View)({
  marginLeft: scaledPixels(20), // Add space between buttons
});


export default Popup;