import React, { useState } from 'react';
import styled from '@emotion/native';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';

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
        <FormGroup>
          <Label htmlFor="task">Task: </Label>
          <Input
            id="task"
            value={task}
            onChangeText={setTask}
            placeholder="Enter task"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="assignedTo">Assigned To: </Label>
          <Input
            id="assignedTo"
            value={assignedTo}
            onChangeText={setAssignedTo}
            placeholder="Enter name"
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

export default Popup;