import { Request } from '@app/models/request.model';
import { Response } from '@app/models/response.model';

export interface IState {
  request?: Request;
  response?: Response;
  status?: string;
}

export const initialState: IState = {};
