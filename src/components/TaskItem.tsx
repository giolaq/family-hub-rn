import React from 'react';
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
}

interface CheckboxProps extends ViewProps {
  checked: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete }) => {
  return (
    <TaskContainer>
      <TouchableOpacity onPress={() => onToggleComplete(task.name)}>
        <Checkbox checked={task.completed} />
      </TouchableOpacity>
      <TaskContent>
        <TaskName completed={task.completed}>{task.name}</TaskName>
        <AssignedTo>{task.assignedTo}</AssignedTo>
      </TaskContent>
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

export default TaskItem;