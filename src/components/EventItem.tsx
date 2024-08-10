import React from 'react';
import { View, ViewProps } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: string;
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

  const eventDate = new Date(`${event.date}T${event.time}`);
  const formattedDate = format(eventDate, 'MMM d, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');

  return (
    <EventItemContainer>
    <EventDateColumn>
      <EventDate>{formattedDate}</EventDate>
    </EventDateColumn>
    <EventDetailsColumn>
      <EventTitle>{event.title}</EventTitle>
      <EventInfo>{`${formattedTime} - ${event.member}`}</EventInfo>
    </EventDetailsColumn>
  </EventItemContainer>
  );
};

// Styled components for EventItem
const EventItemContainer = styled(View)({
  flexDirection: 'row',
  marginBottom: scaledPixels(10),
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(8),
  overflow: 'hidden',
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
});

const EventDateColumn = styled(View)({
  backgroundColor: '#4A90E2',
  padding: scaledPixels(10),
  justifyContent: 'center',
  alignItems: 'center',
  width: scaledPixels(80),
});

const EventDate = styled(Typography)({
  color: '#FFFFFF',
  fontSize: scaledPixels(14),
  fontWeight: 'bold',
  textAlign: 'center',
});

const EventDetailsColumn = styled(View)({
  flex: 1,
  padding: scaledPixels(10),
});

const EventInfo = styled(Typography)({
  fontSize: scaledPixels(14),
  color: '#757575',
});
const EventColorBar = styled(View)<EventColorBarProps>(({ memberColor }) => ({
  width: scaledPixels(6),
  backgroundColor: memberColor,
}));

const EventContent = styled(View)({
  flex: 1,
  padding: scaledPixels(10),
});

const EventTitle = styled(Typography)({
  fontSize: scaledPixels(16),
  fontWeight: '600',
  color: '#333333',
  marginBottom: scaledPixels(4),
});

const EventDetails = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const EventTime = styled(Typography)({
  fontSize: scaledPixels(14),
  color: '#757575',
});

const EventMember = styled(Typography)({
  fontSize: scaledPixels(14),
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