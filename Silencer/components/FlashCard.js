import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

export default class FlashCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.frontInterpolate = this.answerVisible.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.answerVisible.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

    this.answerVisible.addListener(
      ({value}) => (this.answerVisibleValue = value),
    );
  }

  answerVisible = new Animated.Value(0);

  //value of animated state for comparisions
  answerVisibleValue = 0;

  frontInterpolate = null;
  backInterpolate = null;

  componentWillReceiveProps() {
    // this.answerVisible.setValue(0);
    Animated.timing(this.answerVisible, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const frontCardStyle = {transform: [{rotateY: this.frontInterpolate}]};
    const backCardStyle = {transform: [{rotateY: this.backInterpolate}]};

    return (
      <>
        <Animated.View style={[styles.mainContainer, frontCardStyle]}>
          <TouchableWithoutFeedback onPress={this.toggleAnswerVisible}>
            <View style={styles.cardStyle}>
              <Text>{this.props.question}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View style={[styles.mainContainer, backCardStyle]}>
          <TouchableWithoutFeedback onPress={this.toggleAnswerVisible}>
            <View style={styles.cardStyle}>
              <Text>{this.props.answer}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </>
    );
  }

  toggleAnswerVisible = () => {
    // console.log('animation triggered');
    Animated.spring(this.answerVisible, {
      toValue: this.answerVisibleValue >= 90 ? 0 : 180,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    elevation: 3,
    height: 250,
    width: 250,
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  cardStyle: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
});
