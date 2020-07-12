import {dispatchNames, stateInterface, questionInterface} from './utils';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import axios from '../axios/axios';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

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

export const _AddNewQues = (question: string, answer: string) => async (
  dispatch: any,
) => {
  try {
    interface reqBodyInterface {
      answer: string;
      question: string;
    }

    const reqBody: reqBodyInterface = {
      answer,
      question,
    };

    const res: AxiosResponse = await axios.post('/main/newQues', reqBody);

    dispatch(
      addNewQues({
        question,
        answer,
        _id: res.data._id,
        box: '1',
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const _ResetState = () => async (dispatch: any) => {
  try {
    const res: AxiosRequestConfig = await axios.get('/main/getAllQues');
    console.log(res.data);
    dispatch(resetState(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const _CorrectResponse = (index: number) => (dispatch: any) => {
  dispatch(correctResponse(index));
};

export const _IncorrectResponse = (index: number) => (dispatch: any) => {
  dispatch(incorrectResponse(index));
};

export const _SubmitSession = (state: stateInterface) => async (
  dispatch: any,
) => {
  try {
    interface reqBodyInterface {
      newBoxes: {_id: string; box: string}[];
      newSessionNo: number;
    }

    const reqBody: reqBodyInterface = {
      newSessionNo: state.session + 1,
      newBoxes: state.questions.map((question: questionInterface) => ({
        _id: question._id,
        box: question.box,
      })),
    };

    await axios.post('/main/submitSession', reqBody);

    dispatch(submitSession());
  } catch (error) {
    console.log(error);
  }
};
