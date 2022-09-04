import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CardQueueComponent from '../components/CardQueue';
import {connect} from 'react-redux';
import {
  _CorrectResponse,
  _IncorrectResponse,
  _SubmitSession,
} from '../redux/actions';

class CardScreenComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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

  getSessionQuestions = () => {
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

  correctResponse = (index) => {
    _CorrectResponse(index)(this.props.dispatch);
  };

  incorrectResponse = (index) => {
    _IncorrectResponse(index)(this.props.dispatch);
  };

  submitSession = () => {
    // console.log('submitting from cardScreen');
    this.props.navigation.goBack();
    _SubmitSession({
      questions: this.props.questions,
      session: this.props.session,
      isSignIn: true,
    })(this.props.dispatch);
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

const mapStateToProps = (state) => state;
const connector = connect(mapStateToProps);

export default connector(CardScreenComponent);
