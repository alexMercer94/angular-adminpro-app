/**
 * `interface` for defining all medicos object
 */
interface IAllMedicos {
  readonly ok: boolean;
  readonly total: number;
  readonly medicos: IMedico[];
}
