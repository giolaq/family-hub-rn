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
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
});

const PopupContent = styled(View)({
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(10),
  padding: scaledPixels(20),
  width: scaledPixels(400),
  maxWidth: '90%',
});

const PopupTitle = styled(Typography)({
  fontSize: scaledPixels(24),
  fontWeight: '600',
  color: '#4A90E2',
  marginBottom: scaledPixels(20),
});

const FormGroup = styled(View)({
  marginBottom: scaledPixels(15),
});

const Label = styled(Typography)({
  fontSize: scaledPixels(16),
  color: '#333333',
  marginBottom: scaledPixels(5),
});

const Input = styled.TextInput({
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: scaledPixels(5),
  padding: scaledPixels(10),
  fontSize: scaledPixels(16),
  color: '#333333',
});

const ButtonGroup = styled(View)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: scaledPixels(20),
});

const Button = styled(TouchableOpacity)<{ isSecondary?: boolean }>(({ isSecondary }) => ({
  backgroundColor: isSecondary ? '#FFFFFF' : '#4A90E2',
  borderRadius: scaledPixels(5),
  padding: scaledPixels(10),
  marginLeft: scaledPixels(10),
  minWidth: scaledPixels(80),
  alignItems: 'center',
  borderWidth: isSecondary ? 1 : 0,
  borderColor: isSecondary ? '#4A90E2' : 'transparent',
}));

const ButtonText = styled(Typography)<{ isSecondary?: boolean }>(({ isSecondary }) => ({
  color: isSecondary ? '#4A90E2' : '#FFFFFF',
  fontSize: scaledPixels(16),
  fontWeight: '600',
}));

export default Popup;