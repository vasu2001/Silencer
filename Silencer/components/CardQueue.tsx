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
} from 'react-native';
import FlashCardComponent from './FlashCard';

export interface CardQueueProps {}

interface FlashCardInterface {
  question: string;
  answer: string;
}

export interface CardQueueState {
  activeQues: number;
}

export default class CardQueueComponent extends React.Component<
  CardQueueProps,
  CardQueueState
> {
  constructor(props: CardQueueProps) {
    super(props);
    this.state = {
      activeQues: 0,
    };

    this.width = Dimensions.get('window').width;
  }

  cardList: FlashCardInterface[] = [
    {
      question: 'captital of india',
      answer: 'delhi',
    },
    {
      question: 'captital of india 2',
      answer: 'delhi',
    },
    {
      question: 'captital of india 3',
      answer: 'delhi',
    },
  ];

  scollRef: FlatList | null = null;
  //   activeCardIndex: number = 0;
  cardOneAnimate: Animated.Value = new Animated.Value(0);
  cardTwoAnimate: Animated.Value = new Animated.Value(-1);
  width: number = 0;

  public render() {
    const evenCard: boolean = this.state.activeQues % 2 === 0;

    return (
      <View>
        <View style={styles.cardParent}>
          <Animated.View
            style={[this.cardStyle(this.cardOneAnimate), styles.cardAnimated]}>
            <FlashCardComponent
              {...this.cardList[this.state.activeQues - (evenCard ? 0 : 1)]}
            />
          </Animated.View>
          <Animated.View
            style={[this.cardStyle(this.cardTwoAnimate), styles.cardAnimated]}>
            <FlashCardComponent
              {...this.cardList[this.state.activeQues - (evenCard ? 1 : 0)]}
            />
          </Animated.View>
        </View>
        <Button title="Next" onPress={this.onPress} />
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

  private onPress = (): void => {
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
      ...prevState,
      activeQues: prevState.activeQues + 1,
    }));
  };
}

const styles = StyleSheet.create({
  cardParent: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardAnimated: {
    height: 250,
    width: 250,
    position: 'absolute',
  },
});
