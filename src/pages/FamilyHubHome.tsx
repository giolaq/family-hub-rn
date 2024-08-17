import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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

import axios from 'axios';
import AIResponseDialog from '../components/AIResponseDialog';

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

  const handleSettings = () => {
    // Implement Settings functionality
    console.log("Settings clicked");
  };

  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiResponse, setAIResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const callOpenAI = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json'
        }
      });
      setAIResponse(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setAIResponse('Sorry, I encountered an error. Please try again later.');
    }
    setIsLoading(false);
  };

  const handleAIAssistant = () => {
    setIsAIDialogOpen(true);
    callOpenAI("As an AI assistant for the family hub, provide a random helpful tip ");
  };

  return (
    <Page>
    <Container>
    <SpatialNavigationView direction='vertical'>
        <HeaderBar>
          <DateTimeWidget>
            <Typography style={styles.dateText}>
              {currentTime.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </Typography>
            <Typography  style={styles.timeText}>
              {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </DateTimeWidget>
          <TitleWidget>
            <Typography style={styles.titleText}>FamilyHub</Typography>
          </TitleWidget>
          <WeatherWidget>
            <Typography style={styles.weatherText}>{weather.temp}</Typography>
            <Typography style={styles.weatherText}>{weather.condition}</Typography>
          </WeatherWidget>
        </HeaderBar>

      <ContentWrapper>
          <MainContentArea>
            <SpatialNavigationView direction='horizontal'>
            <SpatialNavigationView direction='vertical'>
              <WidgetContainer>
                <CalendarWidget>
                  <WidgetTitle>Family Calendar</WidgetTitle>
                  <WidgetContent>
                  <SpatialNavigationView direction='vertical' >
                    {calendarEvents.map((event, index) => (
                      <EventItem key={index} event={event} />
                    ))}
                   </SpatialNavigationView>
                  </WidgetContent>
                  <SpatialNavigationView direction='horizontal' >
                  <ButtonWrapper>
                    <DefaultFocus>
                      <Button label="New Event" onSelect={handleOpenEventPopup} textStyle={styles.buttonText} />
                    </DefaultFocus>

                      <Button label="View All" onSelect={() => {}} textStyle={styles.buttonText} />
                  </ButtonWrapper>
                  </SpatialNavigationView>
                </CalendarWidget>

              </WidgetContainer>
            </SpatialNavigationView>

            <SpatialNavigationView direction='vertical'>
              <WidgetContainer>
                <TaskBoardWidget>
                  <WidgetTitle>Today's Tasks</WidgetTitle>
                  <WidgetContent>
                  <SpatialNavigationView direction='vertical' >
                    {tasks.map((task, index) => (
                      <TaskItem key={index} task={task} onToggleComplete={toggleTaskComplete} onDeleteTask={deleteTask} />
                    ))}
                  </SpatialNavigationView>
                  </WidgetContent>
                  <ProgressBarWrapper>
                    <ProgressBar progress={tasks.filter(task => task.completed).length / tasks.length} />
                  </ProgressBarWrapper>
                  <SpatialNavigationView direction='horizontal' >
                  <ButtonWrapper>
                    <Button label="New Task" onSelect={handleOpenPopup} textStyle={styles.buttonText} />
                    <Button label={allCompleted ? "Undo" : "Mark All Complete"} onSelect={handleMarkAllTasksComplete} textStyle={styles.buttonText} />
                  </ButtonWrapper>
                  </SpatialNavigationView>
                </TaskBoardWidget>
              </WidgetContainer>
              </SpatialNavigationView>

              <SpatialNavigationView direction='vertical'>
              <WidgetContainer>
                <MessageCenterWidget>
                  <WidgetTitle>Recent Messages</WidgetTitle>
                  <WidgetContent>
                  <SpatialNavigationView direction='vertical' >
                    {messages.map((message, index) => (
                      <MessageItem key={index} message={message} />
                    ))}
                  </SpatialNavigationView>
                  </WidgetContent>
                  <SpatialNavigationView direction='horizontal' >
                  <ButtonWrapper>
                    <Button label="New Message" onSelect={handleOpenMessagePopup} textStyle={styles.buttonText} />
                  </ButtonWrapper>
                  </SpatialNavigationView>
                </MessageCenterWidget>
              </WidgetContainer>
            </SpatialNavigationView>
          
            </SpatialNavigationView>
          </MainContentArea>
        </ContentWrapper>

        <QuickActionsBar>
        <SpatialNavigationView direction='horizontal'>
          <QuickActionsContent>
              <CenteredContent>
                  <SpatialNavigationFocusableView>
                  {({ isFocused }) => (
                    <ActionButton icon="Bot" label="AI Assistant" onClick={handleAIAssistant} isFocused={isFocused} />
                  )}
                  </SpatialNavigationFocusableView>
              </CenteredContent>
              <RightContent>
                  <SpatialNavigationFocusableView>
                  {({ isFocused }) => (
                    <ActionButton icon="Settings" label="Settings" onClick={handleSettings}  isFocused={isFocused} />
                  )}
                  </SpatialNavigationFocusableView>
              </RightContent>
            </QuickActionsContent>
        </SpatialNavigationView>
        </QuickActionsBar>
    </SpatialNavigationView>
    <AIResponseDialog
      isOpen={isAIDialogOpen}
      onClose={() => setIsAIDialogOpen(false)}
      response={aiResponse}
      isLoading={isLoading}
    />
    </Container>

    <Popup isOpen={isPopupOpen} onClose={handleClosePopup} onSubmit={handleSubmit} />
    <EventPopup isOpen={isEventPopupOpen} onClose={handleCloseEventPopup} onSubmit={handleSubmitEvent} />
    <MessagePopup isOpen={isMessagePopupOpen} onClose={handleCloseMessagePopup} onSubmit={handleSubmitMessage} />
  </Page>
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

const DateTimeWidget = styled(View)({
  alignItems: 'flex-start',
});

const TitleWidget = styled(View)({
  alignItems: 'center',
});

const WeatherWidget = styled(View)({
  alignItems: 'flex-end',
});

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
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: scaledPixels(10),
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
const QuickActionsBar = styled(View)({
  height: scaledPixels(180),
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: scaledPixels(15),
  borderTopRightRadius: scaledPixels(15),
  marginTop: scaledPixels(20),
});

const QuickActionsContent = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  paddingHorizontal: scaledPixels(40),
});

const CenteredContent = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const RightContent = styled(View)({
  justifyContent: 'center',
});


interface ActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  isFocused: boolean,
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, isFocused }) => (
  <ActionButtonContainer onPress={onClick} isFocused={isFocused}>
    <Icon icon={icon} size={scaledPixels(64)} color={isFocused ? 'white' : 'black'} />
    <ActionButtonLabel isFocused={isFocused}>{label}</ActionButtonLabel>
  </ActionButtonContainer>
);

const ActionButtonContainer = styled(TouchableOpacity)<{ isFocused: boolean }>(({ isFocused }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  padding: scaledPixels(15),
  width: scaledPixels(140),
  backgroundColor: isFocused ? '#4A90E2' : 'white',
}));

const ActionButtonLabel = styled(Typography)<{ isFocused: boolean }>(({ isFocused }) => ({
  color: isFocused ? 'white' : 'black',
  marginTop: scaledPixels(10),
  textAlign: 'center',
  fontSize: scaledPixels(22),
}));


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
  buttonText: {
    fontSize: scaledPixels(24),
  },
  dateText: {
    fontSize: scaledPixels(24),
    color: '#FFFFFF',
  },
  timeText: {
    fontSize: scaledPixels(32),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: scaledPixels(40),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: scaledPixels(24),
    color: '#FFFFFF',
  },
});

export default FamilyHubHome;