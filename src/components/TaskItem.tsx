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
  marginBottom: scaledPixels(10),
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(8),
  padding: scaledPixels(10),
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: scaledPixels(4),
});

const Checkbox = styled(View)<CheckboxProps>(({ checked }) => ({
  width: scaledPixels(20),
  height: scaledPixels(20),
  borderRadius: scaledPixels(4),
  borderWidth: scaledPixels(2),
  borderColor: checked ? '#50E3C2' : '#757575',
  backgroundColor: checked ? '#50E3C2' : 'transparent',
}));

const TaskContent = styled(View)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: scaledPixels(10),
});

const TaskName = styled(Typography)<{ completed: boolean }>(({ completed }) => ({
  fontSize: scaledPixels(16),
  color: completed ? '#757575' : '#333333',
  textDecorationLine: completed ? 'line-through' : 'none',
}));

const AssignedTo = styled(Typography)({
  fontSize: scaledPixels(14),
  color: '#757575',
  fontStyle: 'italic',
});

export default TaskItem;