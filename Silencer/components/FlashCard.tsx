import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface FlashCardProps {
  question: string;
  answer: string;
}

export interface FlashCardState {}

export default class FlashCardComponent extends React.Component<
  FlashCardProps,
  FlashCardState
> {
  constructor(props: FlashCardProps) {
    super(props);
    this.state = {};
  }

  private answerVisible: Animated.Value = new Animated.Value(0);
  private answerVisibleValue: number = 0;
  private frontInterpolate: Animated.AnimatedInterpolation | null = null;
  private backInterpolate: Animated.AnimatedInterpolation | null = null;

  componentWillMount() {
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

  componentWillReceiveProps() {
    // this.answerVisible.setValue(0);
    Animated.timing(this.answerVisible, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  public render() {
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

  private toggleAnswerVisible = (): void => {
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
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    elevation: 2,
    height: 250,
    width: 250,
    backgroundColor: '#fff',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  cardStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
