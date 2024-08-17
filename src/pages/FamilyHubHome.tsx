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
import MessagePopup from '../components/MessagePopup';


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
  const [messages, setMessages] = useState<any[]>([
    { sender: "Mom", preview: "Don't forget to pick up milk on your way home!", time: "10:30 AM" },
    { sender: "Dad", preview: "I'll be late for dinner tonight. Start without me.", time: "2:15 PM" },
    { sender: "Sarah", preview: "Can someone give me a ride to soccer practice?", time: "4:45 PM" },
  ])

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);

  const [allCompleted, setAllCompleted] = useState(false);
  const [prevTasks, setPrevTasks] = useState<Task[]>([]);

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

  const handleOpenMessagePopup = () => {
    setIsMessagePopupOpen(true);
  };

  const handleCloseMessagePopup = () => {
    setIsMessagePopupOpen(false);
  };

  const handleSubmitMessage = (data: { sender: string; message: string, time: string }) => {
    const newMessage = {
      sender: data.sender,
      preview: data.message,
      time: data.time,
    }
    setMessages([...messages, newMessage]);
  }

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
    setAllCompleted(false);
  };

  const deleteTask = (taskName: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.name !== taskName));
  }

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

  const handleMarkAllTasksComplete = () => {
    if (!allCompleted) {
      setPrevTasks(tasks);
      const updatedTasks = tasks.map((task) => ({
        ...task,
        completed: true,
      }));
      setTasks(updatedTasks);
      setAllCompleted(true);
    } else {
      setTasks(prevTasks);
      setAllCompleted(false);
    }
    
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

  // const messages = [
  //   { sender: "Mom", preview: "Don't forget to pick up milk on your way home!", time: "10:30 AM" },
  //   { sender: "Dad", preview: "I'll be late for dinner tonight. Start without me.", time: "2:15 PM" },
  //   { sender: "Sarah", preview: "Can someone give me a ride to soccer practice?", time: "4:45 PM" },
  // ];

  return (
    <Page>
    <Container>
      <HeaderBar>
        <Logo source={require('../../assets/icon.png')} />
        <Typography variant="title" style={styles.headerText}>{currentTime.toLocaleTimeString()}</Typography>
        <WeatherWidget>
          <Typography variant="body" style={styles.weatherText}>{weather.temp}</Typography>
          <Typography variant="body" style={styles.weatherText}>{weather.condition}</Typography>
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
                  <ButtonWrapper>
                    <DefaultFocus>
                      <Button label="View All" onSelect={() => {}} textStyle={styles.buttonText} />
                    </DefaultFocus>
                  </ButtonWrapper>
                </CalendarWidget>
              </WidgetContainer>

              <WidgetContainer>
                <TaskBoardWidget>
                  <WidgetTitle>Today's Tasks</WidgetTitle>
                  <WidgetContent>
                    {tasks.map((task, index) => (
                      <TaskItem key={index} task={task} onToggleComplete={toggleTaskComplete} onDeleteTask={deleteTask} />
                    ))}
                  </WidgetContent>
                  <ProgressBarWrapper>
                    <ProgressBar progress={tasks.filter(task => task.completed).length / tasks.length} />
                  </ProgressBarWrapper>
                  <ButtonWrapper>
                    <Button label={allCompleted ? "Undo" : "Mark All Complete"} onSelect={handleMarkAllTasksComplete} textStyle={styles.buttonText} />
                  </ButtonWrapper>
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
                  <ButtonWrapper>
                    <Button label="New Message" onSelect={handleOpenMessagePopup} textStyle={styles.buttonText} />
                  </ButtonWrapper>
                </MessageCenterWidget>
              </WidgetContainer>
            </SpatialNavigationView>
          </MainContentArea>
        </ContentWrapper>

      <QuickActionsBar>
        <QuickActionsContent>
          <SpatialNavigationView direction='horizontal'>
            <SpatialNavigationFocusableView>
              <ActionButton icon="CalendarPlus" label="New Event" onClick={handleOpenEventPopup} />
            </SpatialNavigationFocusableView>
            <SpatialNavigationFocusableView onSelect={handleOpenPopup}>
              <ActionButton icon="ClipboardList" label="New Task" onClick={handleOpenPopup} />
            </SpatialNavigationFocusableView>
            <SpatialNavigationFocusableView>
              <ActionButton icon="MessageSquare" label="Family Chat" onClick={() => {}} />
            </SpatialNavigationFocusableView>
            <SpatialNavigationFocusableView>
              <ActionButton icon="Settings" label="Settings" onClick={() => {}} />
            </SpatialNavigationFocusableView>
          </SpatialNavigationView>
        </QuickActionsContent>
      </QuickActionsBar>
    </Container>

    <Popup isOpen={isPopupOpen} onClose={handleClosePopup} onSubmit={handleSubmit} />
    <EventPopup isOpen={isEventPopupOpen} onClose={handleCloseEventPopup} onSubmit={handleSubmitEvent} />
    <MessagePopup isOpen={isMessagePopupOpen} onClose={handleCloseMessagePopup} onSubmit={handleSubmitMessage} />
  </Page>
  );
};

const Container = styled(View)({
  flex: 1,
  backgroundColor: '#F7F9FC',
  padding: scaledPixels(40),
  display: 'flex',
  flexDirection: 'column',
});

const ContentWrapper = styled(View)({
  flex: 1,
  justifyContent: 'center',
});

const MainContentArea = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const WidgetContainer = styled(View)({
  width: scaledPixels(550),
  height: scaledPixels(700), // Fixed height for all widgets
  marginHorizontal: scaledPixels(15),
});

const WidgetBase = styled(View)({
  backgroundColor: '#FFFFFF',
  borderRadius: scaledPixels(15),
  padding: scaledPixels(25),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CalendarWidget = styled(WidgetBase)({});
const TaskBoardWidget = styled(WidgetBase)({});
const MessageCenterWidget = styled(WidgetBase)({});

const WidgetTitle = styled(Typography)({
  fontSize: scaledPixels(36),
  fontWeight: '600',
  marginBottom: scaledPixels(15),
  color: "#4A90E2",
});

const WidgetContent = styled(ScrollView)({
  flex: 1,
});

const ButtonWrapper = styled(View)({
  marginTop: scaledPixels(15),
});

const ProgressBarWrapper = styled(View)({
  marginTop: scaledPixels(15),
});


const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#4A90E2']}
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
  height: scaledPixels(100),
  width: '100%',
  backgroundColor: 'rgba(74, 144, 226, 0.9)',
  paddingHorizontal: scaledPixels(25),
  marginBottom: scaledPixels(20),
});

const Logo = styled(Image)({
  width: scaledPixels(200),
  height: scaledPixels(70),
  resizeMode: 'contain',
});


const WeatherWidget = styled(View)({
  alignItems: 'center',
});

const QuickActionsBar = styled(View)({
  height: scaledPixels(180),
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: scaledPixels(15),
  borderTopRightRadius: scaledPixels(15),
  marginTop: scaledPixels(20),
  justifyContent: 'center',
  alignItems: 'center',
});

const QuickActionsContent = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  paddingVertical: scaledPixels(20),
  paddingHorizontal: scaledPixels(40),
});

interface ActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => (
  <ActionButtonContainer onPress={onClick}>
    <Icon icon={icon} size={scaledPixels(64)} color="#4A90E2" />
    <ActionButtonLabel>{label}</ActionButtonLabel>
  </ActionButtonContainer>
);

const ActionButtonContainer = styled(TouchableOpacity)({
  alignItems: 'center',
  justifyContent: 'center',
  padding: scaledPixels(15),
  width: scaledPixels(140),
  marginHorizontal: scaledPixels(20),
});

const ActionButtonLabel = styled(Typography)({
  color: "#4A90E2",
  marginTop: scaledPixels(10),
  textAlign: 'center',
  fontSize: scaledPixels(22),
});


const styles = StyleSheet.create({
  focusedElement: {
    borderColor: '#FFD700',
    borderWidth: scaledPixels(4),
  },
  container: {
    height: scaledPixels(15),
    backgroundColor: '#E0E0E0',
    borderRadius: scaledPixels(7),
    marginTop: scaledPixels(15),
    overflow: 'hidden',
  },
  headerText: {
    fontSize: scaledPixels(32),
  },
  weatherText: {
    fontSize: scaledPixels(24),
  },
  buttonText: {
    fontSize: scaledPixels(24),
  },
});

export default FamilyHubHome;