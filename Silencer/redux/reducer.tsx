import {stateInterface, dispatchNames} from './utils';

const MainReducer = (
  state: stateInterface = {questions: [], session: 1, isSignIn: false},
  action: {type: string; payload?: any},
) => {
  let newState: stateInterface;
  console.log(action);

  switch (action.type) {
    case dispatchNames.addNewQues:
      newState = {...state};
      newState.questions.push(action.payload);
      return newState;

    case dispatchNames.correctResponse:
      newState = {...state};
      newState.questions[action.payload.index].box = getNextBox(
        newState.questions[action.payload.index].box,
      );
      // newState.activeQues++;
      return newState;

    case dispatchNames.incorrectResponse:
      newState = {...state};
      newState.questions[action.payload.index].box = '1';
      // newState.activeQues++;
      return newState;

    case dispatchNames.submitSession:
      return {
        ...state,
        session: state.session + 1,
      };

    case dispatchNames.resetState: {
      return {
        ...action.payload,
      };
    }

    case dispatchNames.signIn:
      return {
        ...state,
        isSignIn: true,
      };

    case dispatchNames.signOut:
      return {
        ...state,
        isSignIn: false,
      };

    default:
      return state;
  }
};

const getNextBox = (box: string): string => {
  switch (box) {
    case '1':
      return '3';
    case '3':
      return '5';
    case '5':
      return '5';
    default:
      return '1';
  }
};

export default MainReducer;
