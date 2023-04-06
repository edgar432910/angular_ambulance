import { Injectable, Inject } from '@angular/core';
import { StorageInfrastructure } from '../infraestructure/storage.infraestructura';
import { StorageRepository } from '../domain/repository/storage.repository';

@Injectable()
export class StorageApplication {
  constructor(
    @Inject(StorageInfrastructure) private storage: StorageRepository
  ) {}

  getField(nameProperty: string): string | null {
    return this.storage.getStorage(nameProperty);
  }
  setField(nameProperty: string, value: string) {
    return this.storage.setStorage(nameProperty, value);
  }

  getFieldInToken(field: string): string | string[] {
    return this.storage.getFieldInToken(field);
  }
}
