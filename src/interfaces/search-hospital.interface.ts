/**
 * `interface` for defining search hospitals object
 */
interface ISearchHospitals {
  readonly ok: boolean;
  readonly hospitals: IHospital[];
}
