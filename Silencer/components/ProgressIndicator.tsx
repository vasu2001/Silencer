import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ProgressBarAndroid,
  Dimensions,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

export interface ProgressIndicatorProps {
  questionBoxes: {
    boxFrequency: string;
    noOfQues: number;
  }[];
}

export interface ProgressIndicatorState {}

export default class ProgressIndicatorComponent extends React.Component<
  ProgressIndicatorProps,
  ProgressIndicatorState
> {
  constructor(props: ProgressIndicatorProps) {
    super(props);
    this.state = {};
  }

  colors: string[] = ['red', 'orange', 'yellow'];
  labels: {[key: string]: string} = {
    '1': 'Beginning',
    '3': 'Intermediate',
    '5': 'Learned',
  };

  public render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.headingText}>My Progress</Text>
        <PieChart
          data={this.props.questionBoxes.map((item, index) => ({
            name: this.labels[item.boxFrequency],
            frequency: item.noOfQues,
            color: this.colors[index],
            legendFontColor: 'black',
            legendFontSize: 15,
          }))}
          width={Dimensions.get('window').width - 20}
          height={150}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            // borderWidth: 1,
          }}
          accessor="frequency"
          backgroundColor="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    marginHorizontal: 10,
    // borderWidth: 1,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
  },
});
