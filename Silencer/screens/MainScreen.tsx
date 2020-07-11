import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ProgressIndicatorComponent from '../components/ProgressIndicator';
import {StackScreenProps} from '@react-navigation/stack';
import CustomButton from '../components/CustomButton';
import {connect, ConnectedProps} from 'react-redux';
import {stateInterface, questionInterface} from '../redux/utils';
import {NavigationProp} from '@react-navigation/native';

export interface MainScreenProps {
  navigation: NavigationProp<any>;
  totalCards: number;
  session: number;
  progress: {[key: string]: number};
}

export interface MainScreenState {}

class MainScreenComponent extends React.Component<
  MainScreenProps & ConnectedProps<typeof connector>,
  MainScreenState
> {
  constructor(props: MainScreenProps & ConnectedProps<typeof connector>) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View style={styles.mainContainer}>
        <ProgressIndicatorComponent progress={this.props.progress} />
        <View>
          <Text style={styles.totalText}>
            Total Cards: {this.props.totalCards}
          </Text>
          <CustomButton text="Add Card" callback={this.addCard} />
        </View>

        <View>
          <Text style={styles.totalText}>Session: {this.props.session}</Text>
          <CustomButton
            text="Learn"
            callback={this.learn}
            active={this.props.totalCards > 0}
          />
        </View>
      </View>
    );
  }

  private learn = (): void => {
    this.props.navigation.navigate('Learn', {progress: this.props.progress});
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

const mapStateToProps = (state: stateInterface): object => {
  let props: {
    progress: {[key: string]: number};
    totalCards: number;
    session: number;
  } = {
    progress: {'1': 0, '3': 0, '5': 0},
    totalCards: 0,
    session: state.session,
  };
  state.questions.forEach((ques: questionInterface): void => {
    props.progress[ques.box]++;
    props.totalCards++;
  });
  return props;
};

const connector = connect(mapStateToProps);

export default connector(MainScreenComponent);
