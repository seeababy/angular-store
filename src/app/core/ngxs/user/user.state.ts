import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SetToken, Logout, UpdateMe } from './user.actions';
import { IUser } from '../../entities/interfaces/user.interface';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../entities/interfaces/api-response.interface';

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
  },
})
@Injectable()
export class UserState {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

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

  @Action(UpdateMe)
  updateMe(ctx: StateContext<UserStateModel>, action: UpdateMe) {
    return this.http.patch<ApiResponse<IUser>>(`${this.apiUrl}/users/me`, action.payload).pipe(
      tap((res) => {
        if (res.data) {
          const user = res.data;
          ctx.patchState({
            user: {
              ...ctx.getState().user,
              firstName: user.firstName,
              lastName: user.lastName,
              birthdayDate: user.birthdayDate,
              phoneNumber: user.phoneNumber,
              color: user.color,
              shortName: user.shortName
            },
          });
        }
      }),
    );
  }
}
