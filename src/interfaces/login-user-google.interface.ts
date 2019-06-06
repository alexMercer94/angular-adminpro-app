/**
 * `interface` for defining login user google object
 */
interface ILoginUserGoogle {
  readonly id: string;
  readonly menu: IMenuItem[];
  readonly ok: boolean;
  readonly token: string;
  readonly user: IUser;
}
