import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ProgressIndicatorComponent from '../components/ProgressIndicator';
import CustomButton from '../components/CustomButton';
import {connect} from 'react-redux';
import {_ResetState} from '../redux/actions';

class MainScreenComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    _ResetState()(this.props.dispatch);
  }

  render() {
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

  learn = () => {
    this.props.navigation.navigate('Learn', {progress: this.props.progress});
  };

  addCard = () => {
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

const mapStateToProps = (state) => {
  let props = {
    progress: {'1': 0, '3': 0, '5': 0},
    totalCards: 0,
    session: state.session,
  };
  state.questions.forEach((ques) => {
    props.progress[ques.box]++;
    props.totalCards++;
  });
  return props;
};

const connector = connect(mapStateToProps);

export default connector(MainScreenComponent);
