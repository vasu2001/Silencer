import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ListRenderItem,
  Button,
  Animated,
  Dimensions,
  ViewProps,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FlashCardComponent from './FlashCard';
import {questionInterface} from '../redux/utils';
import Snackbar from 'react-native-snackbar';

interface FlashCardInterface {
  question: string;
  answer: string;
}

export interface CardQueueProps {
  questions: questionInterface[];
  correctResponse: (index: number) => void;
  incorrectResponse: (index: number) => void;
  sessionSubmit: () => void;
  session: number;
}

export interface CardQueueState {
  activeQues: number;
  sessionQuesNo: number;
}

export default class CardQueueComponent extends React.Component<
  CardQueueProps,
  CardQueueState
> {
  constructor(props: CardQueueProps) {
    super(props);
    this.state = {
      activeQues: this.getNextQues(-1, this.props.session),
      sessionQuesNo: 0,
    };

    this.width = Dimensions.get('window').width;
  }

  scollRef: FlatList | null = null;
  cardOneAnimate: Animated.Value = new Animated.Value(0);
  cardTwoAnimate: Animated.Value = new Animated.Value(-1);
  width: number = 0;
  //to check if anyother component has already dispatched for sessionSubmit
  wait: boolean = false;

  componentDidUpdate() {
    if (this.state.activeQues >= this.props.questions.length && !this.wait) {
      // console.log('componentdid update');
      Snackbar.show({
        text: 'There are no more cards for the session',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'black',
      });
      this.wait = true;
      this.props.sessionSubmit();
    }
  }

  componentDidMount() {
    if (this.state.activeQues >= this.props.questions.length && !this.wait) {
      // console.log('componentdid mount');
      Snackbar.show({
        text: 'There are no cards for the session',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'black',
      });
      this.wait = true;
      this.props.sessionSubmit();
    }
  }

  public render() {
    const evenCard: boolean = this.state.sessionQuesNo % 2 === 0;
    const cardOneIndex: number = this.state.activeQues - (evenCard ? 0 : 1);
    const cardTwoIndex = this.state.activeQues - (evenCard ? 1 : 0);

    return (
      <View>
        <View style={styles.cardParent}>
          <Animated.View
            style={[this.cardStyle(this.cardOneAnimate), styles.cardAnimated]}>
            <FlashCardComponent
              answer={this.props.questions[cardOneIndex]?.answer}
              question={this.props.questions[cardOneIndex]?.question}
            />
          </Animated.View>

          <Animated.View
            style={[this.cardStyle(this.cardTwoAnimate), styles.cardAnimated]}>
            <FlashCardComponent
              answer={this.props.questions[cardTwoIndex]?.answer}
              question={this.props.questions[cardTwoIndex]?.question}
            />
          </Animated.View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => this.correctResponse(this.state.activeQues)}>
            <View style={[styles.buttonView, styles.correctButton]}>
              <Entypo name="check" size={35} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.incorrectResponse(this.state.activeQues)}>
            <View style={[styles.buttonView, styles.incorrectButton]}>
              <Entypo name="cross" size={35} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  private cardStyle = (animatedValue: Animated.Value) => ({
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-300, 0, 300],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [0.5, 1, 0.5],
        }),
      },
    ],
  });

  private correctResponse = (index: number): void => {
    console.log('Correct response');
    this.props.correctResponse(index);
    this.nextQues();
  };

  private incorrectResponse = (index: number): void => {
    console.log('Incorrect response');
    this.props.incorrectResponse(index);
    this.nextQues();
  };

  private nextQues = (): void => {
    const activeCardIndex = (this.state.activeQues + 1) % 2;
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.cardOneAnimate, {
          toValue: activeCardIndex === 0 ? 0 : 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(this.cardTwoAnimate, {
          toValue: activeCardIndex === 1 ? 0 : 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(
        activeCardIndex === 1 ? this.cardOneAnimate : this.cardTwoAnimate,
        {
          toValue: -1,
          duration: 0,
          useNativeDriver: true,
        },
      ),
    ]).start();
    this.setState((prevState) => ({
      activeQues: this.getNextQues(prevState.activeQues, this.props.session),
      sessionQuesNo: prevState.sessionQuesNo + 1,
    }));
  };

  private getNextQues = (startIndex: number, session: number): number => {
    let nextIndex = startIndex + 1;
    while (
      nextIndex < this.props.questions.length &&
      session % parseInt(this.props.questions[nextIndex]?.box) != 0
    ) {
      nextIndex++;
    }
    return nextIndex;
  };
}

const styles = StyleSheet.create({
  cardParent: {
    height: 250,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardAnimated: {
    height: 250,
    width: 250,
    position: 'absolute',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  buttonView: {
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },
  correctButton: {
    backgroundColor: 'green',
  },
  incorrectButton: {
    backgroundColor: 'red',
  },
});
