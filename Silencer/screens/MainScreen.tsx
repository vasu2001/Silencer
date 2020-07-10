import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ProgressIndicatorComponent from '../components/ProgressIndicator';
import {StackScreenProps} from '@react-navigation/stack';

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
          {this.customButton('Add Card', this.addCard)}
        </View>

        {this.customButton('Resume learning', this.resume)}
      </View>
    );
  }

  private resume = (): void => {
    this.props.navigation.navigate('Learn');
  };

  private addCard = (): void => {
    this.props.navigation.navigate('Add Card');
  };

  private customButton = (
    text: string,
    callback: () => void,
  ): React.SFCElement<any> => {
    return (
      <TouchableOpacity style={{marginVertical: 10}} onPress={callback}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
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
  buttonText: {
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 5,
  },
  buttonContainer: {
    padding: 15,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
