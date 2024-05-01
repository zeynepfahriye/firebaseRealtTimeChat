
import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {
  const route = useRoute();
  const { name } = route?.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onMessageReceived = snapshot => {
      const messageData = snapshot.val();
      const messageId = snapshot.key; // Mesajın benzersiz kimliği
      messageData._id = messageId; 
      setMessages(prevMessages => GiftedChat.append(prevMessages, messageData));
    };
  
    const messagesRef = database().ref('/messages');
    messagesRef.on('child_added', onMessageReceived);
    return () => messagesRef.off('child_added', onMessageReceived);
  }, []);
  

  const onSend = async newMessages => {
    await database().ref('/messages').push(newMessages[0]);
  };

  return (
    <View style={{ flexGrow: 1 ,padding:20}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <GiftedChat
          messages={messages}
          isTyping={true}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: name,
            name:name
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
