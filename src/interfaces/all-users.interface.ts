/**
 * `interface` for defining all users object
 */
interface IAllUsers {
  readonly ok: boolean;
  readonly total: number;
  readonly users: IUser[];
}
