import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PostComponent from '../components/PostComponent';

const HomeScreens = () => {
  return (
    <SafeAreaView style={styles.mainCont}>
      <StatusBar barStyle={'light-content'} />
      <PostComponent />
    </SafeAreaView>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  mainCont: {
    backgroundColor: '#181A1C',
    flex: 1,
  },
});
