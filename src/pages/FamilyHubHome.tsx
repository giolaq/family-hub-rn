import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { LinearGradient } from 'expo-linear-gradient';
import { DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView } from 'react-tv-space-navigation';
import { Typography } from '../design-system/components/Typography';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Button } from '../design-system/components/Button';
import { Icon } from '../design-system/helpers/Icons';
import { Page } from '../components/Page';
import EventItem from '../components/EventItem';
import TaskItem from '../components/TaskItem';
import MessageItem from '../components/MessageItem';
import Popup from '../components/Popup';
import { scaledPixels } from '../hooks/useScale';


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


  const calendarEvents = [
    { title: "Sarah's Soccer Practice", time: "3:00 PM", member: "Sarah" },
    { title: "Family Movie Night", time: "7:00 PM", member: "All" },
    { title: "Dentist Appointment", time: "10:00 AM", member: "John" },
  ];

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

        <FamilyMembersCarousel>
          {/* Add family member avatars here */}
        </FamilyMembersCarousel>


        <Popup isOpen={isPopupOpen} onClose={handleClosePopup} onSubmit={handleSubmit} />

        <MainContentArea>
        <SpatialNavigationView direction='horizontal' >
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
        <QuickActionsBar>
        <SpatialNavigationView direction='horizontal' >
          <SpatialNavigationFocusableView>
          <ActionButton icon="CalendarPlus" label="Add Event" onClick={() => { }} />
          </SpatialNavigationFocusableView>
          <SpatialNavigationFocusableView>
          <ActionButton icon="ClipboardList" label="New Task" onClick={handleOpenPopup} />
          </SpatialNavigationFocusableView>
          <SpatialNavigationFocusableView>
          <ActionButton icon="MessageSquare" label="Family Chat" onClick={() => { }} />
          </SpatialNavigationFocusableView>
          <SpatialNavigationFocusableView>
          <ActionButton icon="Settings" label="Settings" onClick={() => { }} />
          </SpatialNavigationFocusableView>
        </SpatialNavigationView>
        </QuickActionsBar>
      </Container>
    </Page>
  );
};


const Container = styled(View)({
  flex: 1,
  backgroundColor: '#F7F9FC',
  padding: scaledPixels(60),
});

const MainContentArea = styled(View)({
  flex: 10,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'stretch',
  marginTop: scaledPixels(20),
  marginBottom: scaledPixels(20),
});

const WidgetContainer = styled(View)({
  marginHorizontal: scaledPixels(10),
  maxWidth: scaledPixels(400), // Adjust this value as needed
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
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: scaledPixels(100),
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: scaledPixels(10),
  borderTopRightRadius: scaledPixels(10),
  marginTop: scaledPixels(20),
  paddingVertical: scaledPixels(10), // Add vertical padding to the parent container
});

const ActionButton = ({ icon, label, onClick }) => (
    <Box alignItems="center" justifyContent='center' flex={1}>
      <Icon icon={icon} size={64} color="#4A90E2" />
      <Typography variant="body" style={{ color: "#4A90E2" }}>{label}</Typography>
    </Box>
);

const styles = StyleSheet.create({
  focusedElement: {
    borderColor: '#FFD700',
    borderWidth: scaledPixels(3),
  },
  container: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: scaledPixels(5),
    marginTop: scaledPixels(10),
    overflow: 'hidden',
  },
});

export default FamilyHubHome;