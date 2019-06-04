/**
 * `interface` for defining  medico properties
 */
interface IMedico {
  readonly _id: string;
  readonly name: string;
  readonly user: IUser;
  readonly hospital: IHospital;
  readonly img?: string;
}
