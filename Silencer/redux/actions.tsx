import {dispatchNames, stateInterface, questionInterface} from './utils';
import 'react-native-get-random-values';
import axios, {setAuthorizationToken} from '../axios/axios';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Dispatch} from 'react';
import Snackbar from 'react-native-snackbar';

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

const signIn = (): dispatchInterface => ({
  type: dispatchNames.signIn,
});

const signOut = (): dispatchInterface => ({
  type: dispatchNames.signOut,
});

export const _AddNewQues = (question: string, answer: string) => async (
  dispatch: Dispatch<any>,
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

    dispatch(addNewQues(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const _ResetState = () => async (dispatch: Dispatch<any>) => {
  try {
    const res: AxiosRequestConfig = await axios.get('/main/getAllQues');
    console.log(res.data);
    res.data.isSignIn = true;
    dispatch(resetState(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const _CorrectResponse = (index: number) => (
  dispatch: Dispatch<any>,
) => {
  dispatch(correctResponse(index));
};

export const _IncorrectResponse = (index: number) => (
  dispatch: Dispatch<any>,
) => {
  dispatch(incorrectResponse(index));
};

export const _SubmitSession = (state: stateInterface) => async (
  dispatch: Dispatch<any>,
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

export const _SignIn = (
  username: string,
  password: string,
  failCallback: () => void,
) => async (dispatch: Dispatch<any>) => {
  try {
    const reqBody: {username: string; password: string} = {username, password};
    const authRes = await axios.post('/auth/signIn', reqBody);

    console.log(authRes.data);

    await setAuthorizationToken(authRes.data.token);
    dispatch(signIn());
  } catch (err) {
    Snackbar.show({
      text: 'Wrong username or password',
      textColor: 'white',
      backgroundColor: 'black',
      duration: Snackbar.LENGTH_SHORT,
    });
    failCallback();
  }
};

export const _SignUp = (
  username: string,
  password: string,
  failCallback: () => void,
) => async (dispatch: Dispatch<any>) => {
  try {
    const reqBody: {username: string; password: string} = {username, password};
    const authRes = await axios.post('/auth/signUp', reqBody);

    await setAuthorizationToken(authRes.data.token);
    dispatch(signIn());
  } catch (err) {
    Snackbar.show({
      text: 'Error!',
      textColor: 'white',
      backgroundColor: 'black',
      duration: Snackbar.LENGTH_SHORT,
    });
    failCallback();
  }
};

export const _SignOut = () => async (dispatch: Dispatch<any>) => {
  try {
    await setAuthorizationToken();
    dispatch(signOut());
  } catch (err) {}
};

export const _TokenSignIn = (token: string) => async (
  dispatch: Dispatch<any>,
) => {
  try {
    await setAuthorizationToken(token);
    dispatch(signIn());
  } catch (err) {}
};
