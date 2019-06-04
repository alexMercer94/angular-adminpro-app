/**
 * `interface` for defining a hospital properties
 */
interface IHospital {
  readonly _id: string;
  readonly name: string;
  readonly img?: string;
  readonly user: IUser;
}
