export class SetToken {
  static readonly type = '[User] Set Token';
  constructor(public token: string) {}
}

export class Logout {
  static readonly type = '[User] Logout';
}