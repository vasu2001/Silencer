import {dispatchNames} from './utils';
import 'react-native-get-random-values';
import axios, {setAuthorizationToken} from '../axios/axios';
import Snackbar from 'react-native-snackbar';

const addNewQues = (ques) => ({
  type: dispatchNames.addNewQues,
  payload: ques,
});

const incorrectResponse = (index) => ({
  type: dispatchNames.incorrectResponse,
  payload: {
    index,
  },
});

const correctResponse = (index) => ({
  type: dispatchNames.correctResponse,
  payload: {
    index,
  },
});

const submitSession = () => ({
  type: dispatchNames.submitSession,
});

const resetState = (newState) => ({
  type: dispatchNames.resetState,
  payload: newState,
});

const signIn = () => ({
  type: dispatchNames.signIn,
});

const signOut = () => ({
  type: dispatchNames.signOut,
});

export const _AddNewQues = (question, answer) => async (dispatch) => {
  try {
    const reqBody = {
      answer,
      question,
    };

    const res = await axios.post('/main/newQues', reqBody);

    dispatch(addNewQues(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const _ResetState = () => async (dispatch) => {
  try {
    const res = await axios.get('/main/getAllQues');
    console.log(res.data);
    res.data.isSignIn = true;
    dispatch(resetState(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const _CorrectResponse = (index) => (dispatch) => {
  dispatch(correctResponse(index));
};

export const _IncorrectResponse = (index) => (dispatch) => {
  dispatch(incorrectResponse(index));
};

export const _SubmitSession = (state) => async (dispatch) => {
  try {
    const reqBody = {
      newSessionNo: state.session + 1,
      newBoxes: state.questions.map((question) => ({
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

export const _SignIn = (username, password, failCallback) => async (
  dispatch,
) => {
  try {
    const reqBody = {username, password};
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

export const _SignUp = (username, password, failCallback) => async (
  dispatch,
) => {
  try {
    const reqBody = {username, password};
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

export const _SignOut = () => async (dispatch) => {
  try {
    await setAuthorizationToken();
    dispatch(signOut());
  } catch (err) {}
};

export const _TokenSignIn = (token) => async (dispatch) => {
  try {
    await setAuthorizationToken(token);
    dispatch(signIn());
  } catch (err) {}
};
