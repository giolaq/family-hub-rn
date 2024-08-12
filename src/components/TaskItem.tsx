import React, { useState } from 'react';
import { View, ViewProps, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';

interface Task {
  name: string;
  assignedTo: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskName: string) => void;
  onDeleteTask: (taskName: string) => void;
}

interface CheckboxProps extends ViewProps {
  checked: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDeleteTask }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <TaskContainer 
      onPointerEnter={() => setShowDeleteButton(true)} 
      onPointerLeave={() => setShowDeleteButton(false)}
    >
      <TaskContent>
        <TouchableOpacity onPress={() => onToggleComplete(task.name)}>
          <Checkbox checked={task.completed} />
        </TouchableOpacity>
        <TaskInfo>
          <TaskName completed={task.completed}>{task.name}</TaskName>
          <AssignedTo>{task.assignedTo}</AssignedTo>
        </TaskInfo>
      </TaskContent>
      <DeleteButton 
        show={showDeleteButton}
        onPress={() => onDeleteTask(task.name)}
      >
        <DeleteButtonText>&times;</DeleteButtonText>
      </DeleteButton>
    </TaskContainer>
  );
};

const TaskContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: scaledPixels(20),
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(15),
  overflow: 'hidden',
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: scaledPixels(8),
  borderWidth: scaledPixels(3),  // Added thicker border
  borderColor: '#E0E0E0',  // Light gray border color
});

const TaskContent = styled(View)({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  padding: scaledPixels(20),
});

const TaskInfo = styled(View)({
  flex: 1,
  marginLeft: scaledPixels(20),
});

const Checkbox = styled(View)<CheckboxProps>(({ checked }) => ({
  width: scaledPixels(40),
  height: scaledPixels(40),
  borderRadius: scaledPixels(8),
  borderWidth: scaledPixels(3),
  borderColor: checked ? '#4A90E2' : '#757575',
  backgroundColor: checked ? '#4A90E2' : 'transparent',
}));

const TaskName = styled(Typography)<{ completed: boolean }>(({ completed }) => ({
  fontSize: scaledPixels(32),
  color: completed ? '#757575' : '#333333',
  textDecorationLine: completed ? 'line-through' : 'none',
}));

const AssignedTo = styled(Typography)({
  fontSize: scaledPixels(28),
  paddingTop: scaledPixels(12),
  color: '#757575',
  fontStyle: 'italic',
});

const DeleteButton = styled(TouchableOpacity)<{ show: boolean }>(({ show }) => ({
  width: show ? scaledPixels(80) : 0,
  height: '100%',
  backgroundColor: '#FFA500',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'width 0.3s ease-in-out',
}));

const DeleteButtonText = styled(Typography)({
  fontSize: scaledPixels(40),
  color: '#FFFFFF',
});

export default TaskItem;