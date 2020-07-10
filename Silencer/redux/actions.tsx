import {dispatchNames, stateInterface, questionInterface} from './utils';
import {v4 as uuid4} from 'uuid';

interface dispatchInterface {
  type: string;
  payload?: any;
}

const addNewQues = (ques: questionInterface): dispatchInterface => ({
  type: dispatchNames.addNewQues,
  payload: ques,
});

const incorrectResponse = (index: number): dispatchInterface => ({
  type: dispatchNames.incorectResponse,
  payload: {
    index,
  },
});

const correctResponse = (index: number): dispatchInterface => ({
  type: dispatchNames.corectResponse,
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
      _id: uuid4(),
      box: '1',
    }),
  );
};

export const _ResetState = (newState: stateInterface) => (dispatch: any) => {
  dispatch(resetState(newState));
};
