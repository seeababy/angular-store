import { AuthResponse } from '../../../feature/auth/pages/entities/interfaces/auth-response.interface';
import { IUpdateUser } from '../../../feature/office/entities/interfaces/update-user.interface';

export class SetToken {
  static readonly type = '[User] Set Token';
  constructor(public payload: AuthResponse) {}
}

export class Logout {
  static readonly type = '[User] Logout';
}

export class UpdateMe {
  static readonly type = '[User] Update Me';
  constructor(public payload: IUpdateUser) {}
}
