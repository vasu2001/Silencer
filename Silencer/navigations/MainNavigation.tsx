import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreenComponent from '../screens/MainScreen';
import CardScreenComponent from '../screens/CardScreen';
import AddCardComponent from '../screens/AddCard';

export interface MainNavigationProps {}

export interface MainNavigationState {}

export default class MainNavigationComponent extends React.Component<
  MainNavigationProps,
  MainNavigationState
> {
  constructor(props: MainNavigationProps) {
    super(props);
    this.state = {};
  }

  Stack = createStackNavigator();

  public render() {
    return (
      <NavigationContainer>
        <this.Stack.Navigator screenOptions={{}}>
          <this.Stack.Screen name="Home" component={MainScreenComponent} />
          <this.Stack.Screen name="Learn" component={CardScreenComponent} />
          <this.Stack.Screen name="Add Card" component={AddCardComponent} />
        </this.Stack.Navigator>
      </NavigationContainer>
    );
  }
}
