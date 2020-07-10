import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ProgressIndicatorComponent from '../components/ProgressIndicator';
import {StackScreenProps} from '@react-navigation/stack';
import CustomButton from '../components/CustomButton';

export interface MainScreenProps {
  navigation: {navigate: (routename: string) => void};
}

export interface MainScreenState {}

export default class MainScreenComponent extends React.Component<
  MainScreenProps,
  MainScreenState
> {
  constructor(props: MainScreenProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View style={styles.mainContainer}>
        <ProgressIndicatorComponent questionBoxes={tempDataProgress} />
        <View>
          <Text style={styles.totalText}>Total Cards: {40}</Text>
          <CustomButton text="Add Card" callback={this.addCard} />
        </View>

        <CustomButton text="Resume Learning" callback={this.resume} />
      </View>
    );
  }

  private resume = (): void => {
    this.props.navigation.navigate('Learn');
  };

  private addCard = (): void => {
    this.props.navigation.navigate('Add Card');
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 10,
  },
});

const tempDataProgress = [
  {
    boxFrequency: '1',
    noOfQues: 10,
  },
  {
    boxFrequency: '3',
    noOfQues: 5,
  },

  {
    boxFrequency: '5',
    noOfQues: 6,
  },
];
