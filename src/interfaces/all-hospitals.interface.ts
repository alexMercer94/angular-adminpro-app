/**
 * `interface` for defining all hospitals object
 */
interface IAllHospitals {
  readonly ok: boolean;
  readonly total: number;
  readonly hospitals: IHospital[];
}
