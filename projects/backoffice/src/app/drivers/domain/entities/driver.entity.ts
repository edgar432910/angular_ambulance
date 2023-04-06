export type DriverPropertiesOptional = Partial<{
  readonly id: number;
  readonly activo: boolean;
}>;

export type DriverPropertiesRequired = Required<{
  readonly nombre: string;
  //   readonly lastname: string;
  //   readonly surname: string;
  //   readonly cmp: string;
  //   readonly email: string;
  //   readonly dni: string;
  //   readonly typeDNI: number;
}>;

export type DriverProperties = DriverPropertiesRequired &
  Required<DriverPropertiesOptional>;

export class DriverEntity {
  private readonly id: number | null = null;
  private nombre: string = '';
  //   private lastname: string = '';
  //   private surname: string = '';
  //   private cmp: string = '';
  //   private email: string = '';
  //   private dni: string = '';
  //   private typeDNI: number = 0;
  private activo: boolean = false;

  constructor(properties: DriverPropertiesOptional & DriverPropertiesOptional) {
    Object.assign(this, properties);
  }

  get properties(): DriverProperties {
    return {
      id: this.id as number,
      nombre: this.nombre,
      activo: this.activo,
    };
  }
}
