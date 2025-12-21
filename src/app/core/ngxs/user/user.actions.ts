export class SetToken {
  static readonly type = '[User] Set Token';
  constructor(public token: string) {}
}

export class ClearToken {
  static readonly type = '[User] Clear Token';
}