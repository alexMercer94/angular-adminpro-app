/**
 * `interface` for defining login user object
 */
interface ILoginUser {
  readonly id: string;
  readonly menu: IMenuItem[];
  readonly ok: boolean;
  readonly token: string;
  readonly user: IUser;
}
