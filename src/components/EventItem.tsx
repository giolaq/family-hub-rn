import React, { useState } from 'react';
import { View, ViewProps, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../design-system/components/Typography';
import { scaledPixels } from '../hooks/useScale';
import { format } from 'date-fns';
import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  member: string;
}

interface EventItemProps {
  event: Event;
  onDeleteEvent: (eventId: string) => void;
}

interface EventColorBarProps extends ViewProps {
  memberColor: string;
}

const EventItem: React.FC<EventItemProps> = ({ event, onDeleteEvent }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const eventDate = new Date(`${event.date}T${event.time}`);
  const formattedDate = format(eventDate, 'MMM d');
  const formattedTime = format(eventDate, 'h:mm a');

  return (
    <SpatialNavigationFocusableView>
      {({ isFocused }) => (
        <EventItemContainer
          style={isFocused && { borderColor: '#4A90E2', borderWidth: scaledPixels(4) }}
          onPointerEnter={() => setShowDeleteButton(true)}
          onPointerLeave={() => setShowDeleteButton(false)}
        >
          <EventContent>
            <EventDateColumn>
              <EventDate>{formattedDate}</EventDate>
            </EventDateColumn>
            <EventDetailsColumn>
              <EventTitle>{event.title}</EventTitle>
              <EventInfo>{`${formattedTime} - ${event.member}`}</EventInfo>
            </EventDetailsColumn>
          </EventContent>
          {showDeleteButton && (
            <DeleteButton onPress={() => onDeleteEvent(event.id)}>
              <DeleteButtonText>&times;</DeleteButtonText>
            </DeleteButton>
          )}
        </EventItemContainer>
      )}
    </SpatialNavigationFocusableView>
  );
};

// Styled components for EventItem
const EventItemContainer = styled(View)({
  position: 'relative',
  marginBottom: scaledPixels(20),
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(15),
  overflow: 'hidden',
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: scaledPixels(8),
  borderWidth: scaledPixels(2),
  borderColor: '#E0E0E0',
});

const EventContent = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
});

const EventDateColumn = styled(View)({
  backgroundColor: '#4A90E2',
  justifyContent: 'center',
  alignItems: 'center',
  width: scaledPixels(80),
  height: '100%',
});

const EventDate = styled(Typography)({
  color: '#FFFFFF',
  fontSize: scaledPixels(24),
  fontWeight: 'bold',
  textAlign: 'center',
});

const EventDetailsColumn = styled(View)({
  flex: 1,
  padding: scaledPixels(10),
});

const EventInfo = styled(Typography)({
  fontSize: scaledPixels(20),
  color: '#757575',
});

const EventTitle = styled(Typography)({
  fontSize: scaledPixels(28),
  fontWeight: '600',
  color: '#333333',
  marginBottom: scaledPixels(4),
});

const DeleteButton = styled(TouchableOpacity)({
  position: 'absolute',
  top: 0,
  right: 0,
  width: scaledPixels(80),
  height: '100%',
  backgroundColor: 'rgba(255, 165, 0, 1)', // Semi-transparent orange
  justifyContent: 'center',
  alignItems: 'center',
});

const DeleteButtonText = styled(Typography)({
  fontSize: scaledPixels(40),
  color: '#FFFFFF',
});

export default EventItem;