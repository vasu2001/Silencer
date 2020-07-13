import * as React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {_AddNewQues} from '../redux/actions';
import {connect, ConnectedProps} from 'react-redux';

export interface AddCardProps {}

export interface AddCardState {
  quesInput: string;
  ansInput: string;
  error: string;
}

class AddCardComponent extends React.Component<
  AddCardProps & ConnectedProps<typeof connector>,
  AddCardState
> {
  constructor(props: AddCardProps & ConnectedProps<typeof connector>) {
    super(props);
    this.state = {
      quesInput: '',
      ansInput: '',
      error: '',
    };
  }

  public render() {
    return (
      <View style={styles.mainContainer}>
        <CustomInput
          labelText="Question"
          value={this.state.quesInput}
          onChangeText={(text: string): void => {
            this.setState({quesInput: text});
          }}
        />

        <CustomInput
          labelText="Answer"
          value={this.state.ansInput}
          onChangeText={(text: string): void => {
            this.setState({ansInput: text});
          }}
        />

        <CustomButton text="Add" callback={this.addCard} />
        <Text style={{color: 'red', alignSelf: 'center'}}>
          {this.state.error}
        </Text>
      </View>
    );
  }

  private addCard = (): void => {
    if (this.state.ansInput === '' || this.state.quesInput === '') {
      this.setState({error: 'Enter question and answer'});
    } else {
      console.log('adding');
      _AddNewQues(
        this.state.quesInput,
        this.state.ansInput,
      )(this.props.dispatch);
      this.setState({ansInput: '', quesInput: ''});
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
