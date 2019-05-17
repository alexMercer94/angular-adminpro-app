/**
 * `interface` for defining  all user properties
 */
interface IUser {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly img?: string;
  readonly google: boolean;
}
