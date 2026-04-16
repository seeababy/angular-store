import { Selector } from '@ngxs/store';
import { UserState, UserStateModel } from './user.state';
import { IUser } from '../../entities/interfaces/user.interface';

export class UserSelectors {
  @Selector([UserState])
  static isAuthorized(state: UserStateModel): boolean {
    return !!state.user;
  }

  @Selector([UserState])
  static userShortName(state: UserStateModel): string | null {
    return state.user?.shortName ?? null;
  }

  @Selector([UserState])
  static userColor(state: UserStateModel): string | null {
    return state.user?.color ?? null;
  }

  @Selector([UserState])
  static userId(state: UserStateModel): string | null {
    return state.user?.id ?? null;
  }

  @Selector([UserState])
  static userToken(state: UserStateModel): string | null {
    return state.accessToken ?? null;
  }

  @Selector([UserState])
  static user(state: UserStateModel): IUser | null {
    return state.user;
  }
}
