import {dispatchNames, stateInterface, questionInterface} from './utils';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

interface dispatchInterface {
  type: string;
  payload?: any;
}

const addNewQues = (ques: questionInterface): dispatchInterface => ({
  type: dispatchNames.addNewQues,
  payload: ques,
});

const incorrectResponse = (index: number): dispatchInterface => ({
  type: dispatchNames.incorrectResponse,
  payload: {
    index,
  },
});

const correctResponse = (index: number): dispatchInterface => ({
  type: dispatchNames.correctResponse,
  payload: {
    index,
  },
});

const submitSession = (): dispatchInterface => ({
  type: dispatchNames.submitSession,
});

const resetState = (newState: stateInterface): dispatchInterface => ({
  type: dispatchNames.resetState,
  payload: newState,
});

export const _AddNewQues = (question: string, answer: string) => (
  dispatch: any,
) => {
  dispatch(
    addNewQues({
      question,
      answer,
      _id: uuidv4(),
      box: '1',
    }),
  );
};

export const _ResetState = (newState: stateInterface) => (dispatch: any) => {
  dispatch(resetState(newState));
};

export const _CorrectResponse = (index: number) => (dispatch: any) => {
  dispatch(correctResponse(index));
};

export const _IncorrectResponse = (index: number) => (dispatch: any) => {
  dispatch(incorrectResponse(index));
};

export const _SubmitSession = () => (dispatch: any) => {
  dispatch(submitSession());
};
