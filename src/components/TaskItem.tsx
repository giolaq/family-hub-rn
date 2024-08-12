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
    <TaskContainer onPointerEnter={() => setShowDeleteButton(true)} onPointerLeave={() => setShowDeleteButton(false)}>
      <TouchableOpacity onPress={() => onToggleComplete(task.name)}>
        <Checkbox checked={task.completed} />
      </TouchableOpacity>
      <TaskContent>
        <TaskName completed={task.completed}>{task.name}</TaskName>
        <AssignedTo>{task.assignedTo}</AssignedTo>
      </TaskContent>
      <DeleteButtonContainer>
        {showDeleteButton && (
          <DeleteButton onPress={() => onDeleteTask(task.name)}>
            <DeleteButtonText>
              &times;
            </DeleteButtonText>
          </DeleteButton>
        )}
      </DeleteButtonContainer>
    </TaskContainer>
  );
};

const TaskContainer = styled(View)({
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

const Checkbox = styled(View)<CheckboxProps>(({ checked }) => ({
  width: scaledPixels(40),
  height: scaledPixels(40),
  borderRadius: scaledPixels(8),
  borderWidth: scaledPixels(3),
  borderColor: checked ? '#50E3C2' : '#757575',
  backgroundColor: checked ? '#50E3C2' : 'transparent',
}));

const TaskContent = styled(View)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: scaledPixels(20),
});

const TaskName = styled(Typography)<{ completed: boolean }>(({ completed }) => ({
  fontSize: scaledPixels(32),
  color: completed ? '#757575' : '#333333',
  textDecorationLine: completed ? 'line-through' : 'none',
}));

const AssignedTo = styled(Typography)({
  fontSize: scaledPixels(28),
  color: '#757575',
  fontStyle: 'italic',
});

const DeleteButtonContainer = styled(View)({
  position: 'absolute',
  top: scaledPixels(20),
  right: scaledPixels(20),
});

const DeleteButtonText = styled(Typography)({
  fontSize: scaledPixels(30),
});

const DeleteButton = styled(TouchableOpacity)({
  right: scaledPixels(8),
  left: scaledPixels(8),
  width: scaledPixels(40),
  height: scaledPixels(40),
  backgroundColor: '#808080',
  borderRadius: scaledPixels(20),
  justifyContent: 'center',
  alignItems: 'center',
});

export default TaskItem;