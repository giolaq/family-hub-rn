import React from 'react';
import { View, ViewProps } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../design-system/components/Typography';

interface Event {
  title: string;
  time: string;
  member: string;
}

interface EventItemProps {
  event: Event;
}

interface EventColorBarProps extends ViewProps {
  memberColor: string;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <EventContainer>
      <EventColorBar memberColor={getMemberColor(event.member)} />
      <EventContent>
        <EventTitle>{event.title}</EventTitle>
        <EventDetails>
          <EventTime>{event.time}</EventTime>
          <EventMember>{event.member}</EventMember>
        </EventDetails>
      </EventContent>
    </EventContainer>
  );
};

const EventContainer = styled(View)({
  flexDirection: 'row',
  marginBottom: 10,
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  overflow: 'hidden',
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
});

const EventColorBar = styled(View)<EventColorBarProps>(({ memberColor }) => ({
  width: 6,
  backgroundColor: memberColor,
}));

const EventContent = styled(View)({
  flex: 1,
  padding: 10,
});

const EventTitle = styled(Typography)({
  fontSize: 16,
  fontWeight: '600',
  color: '#333333',
  marginBottom: 4,
});

const EventDetails = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const EventTime = styled(Typography)({
  fontSize: 14,
  color: '#757575',
});

const EventMember = styled(Typography)({
  fontSize: 14,
  color: '#757575',
  fontStyle: 'italic',
});

const getMemberColor = (member: string): string => {
  const colorMap: { [key: string]: string } = {
    'Sarah': '#FF9800',
    'John': '#4CAF50',
    'Mike': '#2196F3',
    'Lisa': '#E91E63',
    'All': '#9C27B0',
  };
  return colorMap[member] || '#757575';
};

export default EventItem;