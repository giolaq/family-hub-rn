import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { LinearGradient } from 'expo-linear-gradient';
import { DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView } from 'react-tv-space-navigation';
import { Typography } from '../design-system/components/Typography';
import { Button } from '../design-system/components/Button';
import { Icon } from '../design-system/helpers/Icons';
import { Page } from '../components/Page';
import EventItem from '../components/EventItem';
import TaskItem from '../components/TaskItem';
import MessageItem from '../components/MessageItem';
import Popup from '../components/Popup';
import { scaledPixels } from '../hooks/useScale';
import EventPopup from '../components/EventPopup';


const FamilyHubHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '22°C', condition: 'Sunny' });
  const [tasks, setTasks] = useState<Task[]>([
    { name: "Take out the trash", assignedTo: "Mike", completed: false },
    { name: "Do laundry", assignedTo: "Lisa", completed: true },
    { name: "Buy groceries", assignedTo: "John", completed: false },
    { name: "Clean the kitchen", assignedTo: "Sarah", completed: false },
    { name: "Walk the dog", assignedTo: "Mike", completed: true },
  ]);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([
    { id: '1', title: "Sarah's Soccer Practice", date: "2024-08-10", time: "15:00", member: "Sarah" },
    { id: '2', title: "Family Movie Night", date: "2024-08-10", time: "19:00", member: "All" },
    { id: '3', title: "Dentist Appointment", date: "2024-08-11", time: "10:00", member: "John" },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    console.log("Popup should be showing");
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (data: { task: string; assignedTo: string }) => {
    console.log('Submitted data:', data);
    const newTask : Task = {
      name: data.task,
      assignedTo: data.assignedTo,
      completed: false
    }
    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTaskComplete = (taskName: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.name === taskName ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const [isEventPopupOpen, setIsEventPopupOpen] = useState(false);

  const handleOpenEventPopup = () => {
    setIsEventPopupOpen(true);
  };

  const handleCloseEventPopup = () => {
    setIsEventPopupOpen(false);
  };

  const handleSubmitEvent = (eventData: { title: string; date: string; time: string; assignedTo: string }) => {
    const newEvent: Event = {
      id: Date.now().toString(), // Simple way to generate a unique ID
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      member: eventData.assignedTo,
    };

    setCalendarEvents(prevEvents => [...prevEvents, newEvent]);
    setIsEventPopupOpen(false);

    // Optional: Sort events by date and time
    sortEvents();
  };

  const sortEvents = () => {
    setCalendarEvents(prevEvents => 
      [...prevEvents].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      })
    );
  };

  const messages = [
    { sender: "Mom", preview: "Don't forget to pick up milk on your way home!", time: "10:30 AM" },
    { sender: "Dad", preview: "I'll be late for dinner tonight. Start without me.", time: "2:15 PM" },
    { sender: "Sarah", preview: "Can someone give me a ride to soccer practice?", time: "4:45 PM" },
  ];

  return (
    <Page>
      <Container>
        
        <HeaderBar>
          <Logo source={require('../../assets/icon.png')} />
          <Typography variant="title">{currentTime.toLocaleTimeString()}</Typography>
          <WeatherWidget>
            <Typography variant="body">{weather.temp}</Typography>
            <Typography variant="body">{weather.condition}</Typography>
          </WeatherWidget>
        </HeaderBar>

        <ContentWrapper>

        <MainContentArea>
          <SpatialNavigationView direction='horizontal'>
            <WidgetContainer>
              <CalendarWidget>
                <WidgetTitle>Family Calendar</WidgetTitle>
                <WidgetContent>
                  {calendarEvents.map((event, index) => (
                    <EventItem key={index} event={event} />
                  ))}
                </WidgetContent>
                <DefaultFocus>
                  <Button label="View All" onSelect={() => {}} />
                </DefaultFocus>
              </CalendarWidget>
            </WidgetContainer>

            <WidgetContainer>
              <TaskBoardWidget>
                <WidgetTitle>Today's Tasks</WidgetTitle>
                <WidgetContent>
                  {tasks.map((task, index) => (
                    <TaskItem key={index} task={task} onToggleComplete={toggleTaskComplete} />
                  ))}
                </WidgetContent>
                <ProgressBar progress={tasks.filter(task => task.completed).length / tasks.length} />
              </TaskBoardWidget>
            </WidgetContainer>

            <WidgetContainer>
              <MessageCenterWidget>
                <WidgetTitle>Recent Messages</WidgetTitle>
                <WidgetContent>
                  {messages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                  ))}
                </WidgetContent>
                <Button label="New Message" onSelect={() => {}} />
              </MessageCenterWidget>
            </WidgetContainer>
          </SpatialNavigationView>
        </MainContentArea>

        </ContentWrapper>
        <QuickActionsBar>
        <QuickActionsContent>
        <SpatialNavigationView direction='horizontal' >
          <SpatialNavigationFocusableView>
          <ActionButton icon="CalendarPlus" label="New Event" onClick={handleOpenEventPopup} />
          </SpatialNavigationFocusableView>
          <SpatialNavigationFocusableView onSelect={handleOpenPopup}>
          <ActionButton icon="ClipboardList" label="New Task" onClick={handleOpenPopup} />
          </SpatialNavigationFocusableView>
          <SpatialNavigationFocusableView>
          <ActionButton icon="MessageSquare" label="Family Chat" onClick={() => { }} />
          </SpatialNavigationFocusableView>
          <SpatialNavigationFocusableView>
          <ActionButton icon="Settings" label="Settings" onClick={() => { }} />
          </SpatialNavigationFocusableView>
        </SpatialNavigationView>
        </QuickActionsContent>
        </QuickActionsBar>
      </Container>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
      />
       <EventPopup
        isOpen={isEventPopupOpen}
        onClose={handleCloseEventPopup}
        onSubmit={handleSubmitEvent}
      />
    </Page>
  );
};
const Container = styled(View)({
  flex: 1,
  backgroundColor: '#F7F9FC',
  padding: scaledPixels(30),
  display: 'flex',
  flexDirection: 'column',
});

const ContentWrapper = styled(View)({
  flex: 1,
  justifyContent: 'center', // This will center the MainContentArea vertically
});

const MainContentArea = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: scaledPixels(600), // Set a fixed height for the widget area
});

const WidgetContainer = styled(View)({
  width: scaledPixels(500), // Set a fixed width instead of maxWidth
  height: '100%', // Take full height of MainContentArea
  marginHorizontal: scaledPixels(10),
});

const WidgetBase = styled(View)({
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(10),
  padding: scaledPixels(20),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CalendarWidget = styled(WidgetBase)({});

const TaskBoardWidget = styled(WidgetBase)({});

const MessageCenterWidget = styled(WidgetBase)({});

const WidgetTitle = styled(Typography)({
  fontSize: scaledPixels(24),
  fontWeight: '600',
  marginBottom: scaledPixels(10),
  color: "#4A90E2",
});

const WidgetContent = styled(ScrollView)({
  flex: 1,
});

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#50E3C2', '#50E3C2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={
          {
            height: '100%',
            width: `${progress * 100}%`,
          }
        }
      />
    </View>
  );
};

const HeaderBar = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: scaledPixels(80),
  width: '100%',
  backgroundColor: 'rgba(74, 144, 226, 0.9)',
  paddingHorizontal: scaledPixels(20),
});

const Logo = styled(Image)({
  width: scaledPixels(150),
  height: scaledPixels(50),
  resizeMode: 'contain',
});

const WeatherWidget = styled(View)({
  alignItems: 'center',
});

const FamilyMembersCarousel = styled(ScrollView)({
  height: scaledPixels(120),
  marginTop: scaledPixels(20),
});

const QuickActionsBar = styled(View)({
  height: scaledPixels(160),
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: scaledPixels(10),
  borderTopRightRadius: scaledPixels(10),
  marginTop: scaledPixels(20),
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
});

const QuickActionsContent = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center', // Center buttons horizontally
  alignItems: 'center', // Center buttons vertically
  width: '100%', // Take full width of parent
  paddingTop: scaledPixels(30),
  paddingBottom: scaledPixels(30),
  paddingHorizontal: scaledPixels(60), // Add some horizontal padding
});

interface ActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => (
  <ActionButtonContainer onPress={onClick}>
    <Icon icon={icon} size={scaledPixels(48)} color="#4A90E2" />
    <ActionButtonLabel>{label}</ActionButtonLabel>
  </ActionButtonContainer>
);

const ActionButtonContainer = styled(TouchableOpacity)({
  alignItems: 'center',
  justifyContent: 'center',
  padding: scaledPixels(10),
  width: scaledPixels(100), // Set a fixed width for each button
  marginHorizontal: scaledPixels(10), // Add horizontal margin for spacing
});

const ActionButtonLabel = styled(Typography)({
  color: "#4A90E2",
  marginTop: scaledPixels(8),
  textAlign: 'center',
  fontSize: scaledPixels(14),
});

const styles = StyleSheet.create({
  focusedElement: {
    borderColor: '#FFD700',
    borderWidth: scaledPixels(3),
  },
  container: {
    height: scaledPixels(10),
    backgroundColor: '#E0E0E0',
    borderRadius: scaledPixels(5),
    marginTop: scaledPixels(10),
    overflow: 'hidden',
  },
});

export default FamilyHubHome;