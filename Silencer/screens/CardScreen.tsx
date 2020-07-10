import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CardQueueComponent from '../components/CardQueue';

export interface CardScreenProps {}

export interface CardScreenState {}

export default class CardScreenComponent extends React.Component<
  CardScreenProps,
  CardScreenState
> {
  constructor(props: CardScreenProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View style={styles.mainContainer}>
        <CardQueueComponent />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            {7} questions remaining for the session
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerView: {
    alignSelf: 'center',
  },
});
