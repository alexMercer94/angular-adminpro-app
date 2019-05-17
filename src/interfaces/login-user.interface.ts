/**
 * `interface` for defining login user object
 */
interface ILoginUser {
  readonly id: string;
  readonly ok: boolean;
  readonly token: string;
  readonly user: IUser;
}
