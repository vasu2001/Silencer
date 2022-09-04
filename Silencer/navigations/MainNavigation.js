import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreenComponent from '../screens/MainScreen';
import CardScreenComponent from '../screens/CardScreen';
import AddCardComponent from '../screens/AddCard';
import {connect} from 'react-redux';
import AuthScreen from '../screens/AuthScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {_SignOut} from '../redux/actions';

class MainNavigationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Stack = createStackNavigator();

  render() {
    if (this.props.isSignIn)
      return (
        <NavigationContainer>
          <this.Stack.Navigator>
            <this.Stack.Screen
              name="Home"
              component={MainScreenComponent}
              options={{headerRight: this.logOutButton}}
            />
            <this.Stack.Screen name="Learn" component={CardScreenComponent} />
            <this.Stack.Screen name="Add Card" component={AddCardComponent} />
          </this.Stack.Navigator>
        </NavigationContainer>
      );
    else return <AuthScreen />;
  }

  logOutButton = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          _SignOut()(this.props.dispatch);
        }}>
        <Icon
          name="logout"
          size={20}
          color="black"
          style={{marginHorizontal: 5}}
        />
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = (state) => ({
  isSignIn: state.isSignIn,
});

const connector = connect(mapStateToProps);
export default connector(MainNavigationComponent);
