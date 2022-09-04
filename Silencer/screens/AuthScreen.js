import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {_SignIn, _TokenSignIn, _SignUp} from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        _TokenSignIn(token)(this.props.dispatch);
      }
    } catch (err) {}
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.headingText}>Silencer</Text>
        <View>
          <CustomInput
            labelText="Username"
            value={this.state.username}
            onChangeText={(text) => {
              this.setState({username: text});
            }}
          />
          <CustomInput
            labelText="Password"
            value={this.state.password}
            onChangeText={(text) => {
              this.setState({password: text});
            }}
            isPassword={true}
          />

          <CustomButton
            text="SignIn"
            callback={this.signIn}
            active={!this.state.loading}
          />
          <CustomButton
            text="SignUp"
            callback={this.signUp}
            active={!this.state.loading}
          />
        </View>
      </View>
    );
  }

  signIn = () => {
    if (this.checkForEmpty()) return;

    _SignIn(this.state.username, this.state.password, () => {
      this.setState({loading: false});
    })(this.props.dispatch);
  };

  signUp = () => {
    if (this.checkForEmpty()) return;

    _SignUp(this.state.username, this.state.password, () => {
      this.setState({loading: false});
    })(this.props.dispatch);
  };

  checkForEmpty = () => {
    const isEmpty = !this.state.username || !this.state.password;
    if (isEmpty) {
      Snackbar.show({
        text: 'Enter username and password',
        backgroundColor: 'black',
        textColor: 'white',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    return isEmpty;
  };
}

const connector = connect();
export default connector(AuthScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-evenly',
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
