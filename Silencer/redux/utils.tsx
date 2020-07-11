export interface questionInterface {
  _id: string;
  question: string;
  answer: string;
  box: string;
}

export interface stateInterface {
  session: number;
  questions: questionInterface[];
}

export const dispatchNames: {[key: string]: string} = {
  addNewQues: 'ADD_NEW_QUES',
  correctResponse: 'CORRECT_RESPONSE',
  incorrectResponse: 'INCORRECT_RESPONSE',
  submitSession: 'SUBMIT_SESSION',
  resetState: 'RESET_STATE',
};
