import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { InputFiel, InputWrapper } from '../styles/AddPost';

const AddPostScreen = () => {
  return (
    <View style={styles.container}>
      <InputWrapper>
        <InputFiel
          placeholder="Qué en estas pensando?"
          placeholderTextColor="grey"
          multiline
          // numberOfLines={4}
        />
      </InputWrapper>
      {/* <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={() => console.log('notes tapped!')}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => {}}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => {}}>+
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton> */}
      <ActionButton buttonColor="rgba(231, 76, 60, 1)" >
        <ActionButton.Item
          buttonColor= "#9b59b6"
          title= "Tomar foto"
          onPress= { () => console.log ( 'notes tapped!' )}>
          <MaterialIcons name="add-a-photo" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor= "#3498db" I
          title= "Elegir foto"
          onPress= { () => {} } >
          <MaterialIcons name="add-photo-alternate" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
