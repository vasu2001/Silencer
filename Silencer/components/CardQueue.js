import * as React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FlashCardComponent from './FlashCard';
import Snackbar from 'react-native-snackbar';

export default class CardQueueComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeQues: this.getNextQues(-1, this.props.session),
      sessionQuesNo: 0,
    };

    this.width = Dimensions.get('window').width;
  }

  scollRef = null;
  cardOneAnimate = new Animated.Value(0);
  cardTwoAnimate = new Animated.Value(-1);
  width = 0;
  //to check if anyother component has already dispatched for sessionSubmit
  wait = false;

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

  render() {
    const evenCard = this.state.sessionQuesNo % 2 === 0;
    const cardOneIndex = this.state.activeQues - (evenCard ? 0 : 1);
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

  cardStyle = (animatedValue) => ({
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

  correctResponse = (index) => {
    console.log('Correct response');
    this.props.correctResponse(index);
    this.nextQues();
  };

  incorrectResponse = (index) => {
    console.log('Incorrect response');
    this.props.incorrectResponse(index);
    this.nextQues();
  };

  nextQues = () => {
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

  getNextQues = (startIndex, session) => {
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
