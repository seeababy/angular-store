import { Selector } from '@ngxs/store';
import { UserState } from './user.state';
import { UserStateModel } from './user.model';

export class UserSelectors {

  @Selector([UserState])
  static token(state: UserStateModel): string | null {
    return state.token;
  }

  @Selector([UserState])
  static isAuthorized(state: UserStateModel): boolean {
    return !!state.token;
  }
}