/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import MainNavigationComponent from './navigations/MainNavigation';
import MainReducer from './redux/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

// declare const global: {HermesInternal: null | {}};
const store = createStore(MainReducer, {
  questions: [],
  session: 1,
  isSignIn: false,
});

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigationComponent />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
