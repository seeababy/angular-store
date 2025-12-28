import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SetToken, Logout } from './user.actions';

export interface UserStateModel {
  token: string | null;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    token: null
  }
})
@Injectable()
export class UserState {

  @Action(SetToken)
  setToken(ctx: StateContext<UserStateModel>, action: SetToken) {
    ctx.setState({ token: action.token });
  }

  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>) {
    ctx.setState({ token: null });
    localStorage.removeItem('token');
  }
}
