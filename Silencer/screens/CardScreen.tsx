import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CardQueueComponent from '../components/CardQueue';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';
import {stateInterface} from '../redux/utils';
import {
  _CorrectResponse,
  _IncorrectResponse,
  _SubmitSession,
} from '../redux/actions';

export interface CardScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{progress: {[key: string]: number}}, any>;
}

export interface CardScreenState {}

class CardScreenComponent extends React.Component<
  CardScreenProps & ConnectedProps<typeof connector>,
  CardScreenState
> {
  constructor(props: CardScreenProps & ConnectedProps<typeof connector>) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View style={styles.mainContainer}>
        <CardQueueComponent
          questions={this.props.questions}
          sessionSubmit={this.submitSession}
          correctResponse={this.correctResponse}
          incorrectResponse={this.incorrectResponse}
          session={this.props.session}
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Questions for the session: {this.getSessionQuestions()}
          </Text>
        </View>
      </View>
    );
  }

  private getSessionQuestions = (): number => {
    let no = 0;
    Object.keys(this.props.route.params.progress).forEach(
      (box) =>
        (no +=
          this.props.session % parseInt(box) === 0
            ? this.props.route.params.progress[box]
            : 0),
    );
    return no;
  };

  private correctResponse = (index: number): void => {
    _CorrectResponse(index)(this.props.dispatch);
  };

  private incorrectResponse = (index: number): void => {
    _IncorrectResponse(index)(this.props.dispatch);
  };

  private submitSession = (): void => {
    // console.log('submitting from cardScreen');
    this.props.navigation.goBack();
    _SubmitSession()(this.props.dispatch);
  };
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

const mapStateToProps = (state: stateInterface): stateInterface => state;
const connector = connect(mapStateToProps);

export default connector(CardScreenComponent);
