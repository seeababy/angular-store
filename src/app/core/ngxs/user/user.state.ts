import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user.model';
import { SetToken, ClearToken } from './user.actions';

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
    ctx.setState({
      token: action.token
    });
  }

  @Action(ClearToken)
  clearToken(ctx: StateContext<UserStateModel>) {
    ctx.setState({
      token: null
    });
  }
}