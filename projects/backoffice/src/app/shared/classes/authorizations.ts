export class Authorizations {
  public MEDIC_EDIT = ['AUDITOR', 'ADMIN'];

  getPropertyValue(property: string): string[] {
    return this.MEDIC_EDIT;
  }
}
