import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export interface AddCardProps {}

export interface AddCardState {
  quesInput: string;
  ansInput: string;
}

export default class AddCardComponent extends React.Component<
  AddCardProps,
  AddCardState
> {
  constructor(props: AddCardProps) {
    super(props);
    this.state = {
      quesInput: '',
      ansInput: '',
    };
  }

  public render() {
    return (
      <View>
        <Text>AddCard Component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
