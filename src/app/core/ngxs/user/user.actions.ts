import { AuthResponse } from "../../../feature/auth/pages/entities/interfaces/auth-response.interface";

export class SetToken {
  static readonly type = '[User] Set Token';
  constructor(public payload: AuthResponse) {}
}

export class Logout {
  static readonly type = '[User] Logout';
}