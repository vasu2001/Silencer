import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {_AddNewQues} from '../redux/actions';
import {connect} from 'react-redux';

class AddCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quesInput: '',
      ansInput: '',
      error: '',
    };
  }

  quesRef = null;
  ansRef = null;

  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomInput
          labelText="Question"
          value={this.state.quesInput}
          onChangeText={(text) => {
            this.setState({quesInput: text});
          }}
          setRef={(ref) => (this.quesRef = ref)}
        />

        <CustomInput
          labelText="Answer"
          value={this.state.ansInput}
          onChangeText={(text) => {
            this.setState({ansInput: text});
          }}
          setRef={(ref) => (this.ansRef = ref)}
        />

        <CustomButton text="Add" callback={this.addCard} />
        <Text style={{color: 'red', alignSelf: 'center'}}>
          {this.state.error}
        </Text>
      </View>
    );
  }

  addCard = () => {
    if (this.state.ansInput === '' || this.state.quesInput === '') {
      this.setState({error: 'Enter question and answer'});
    } else {
      console.log('adding');
      _AddNewQues(
        this.state.quesInput,
        this.state.ansInput,
      )(this.props.dispatch);
      this.setState({ansInput: '', quesInput: ''});
      this.quesRef?.focus();
    }
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
  },
});

const connector = connect();

export default connector(AddCardComponent);
