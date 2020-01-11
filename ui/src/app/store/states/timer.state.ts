import * as moment from 'moment';

export interface IState {
  now: moment.Moment;
}

export const initialState: IState = {
  now: moment(),
};
