/**
 * `interface` for defining search all collections object
 */
interface ISearchAllCollections {
  readonly ok: boolean;
  readonly hospitals: IHospital[];
  readonly medicos: IMedico[];
  readonly users: IUser[];
}
