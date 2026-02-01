import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SetToken, Logout } from './user.actions';
import { IUser } from '../../entities/interfaces/user.interface';

export interface UserStateModel {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    accessToken: null!,
    refreshToken: null!,
    user: null!,
  }
})
@Injectable()
export class UserState {

  @Action(SetToken)
  setToken(ctx: StateContext<UserStateModel>, action: SetToken) {
    ctx.setState({ ...action.payload });
  }

  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>) {
      ctx.setState({
        accessToken: null!,
        refreshToken: null!,
        user: null!,
      });
  }
}
