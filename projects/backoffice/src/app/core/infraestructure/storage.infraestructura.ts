import { StorageRepository } from '../domain/repository/storage.repository';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

interface IPayload {
  name: string;
  email: string;
  roles: string[];
}

@Injectable()
export class StorageInfrastructure implements StorageRepository {
  setStorage(nameProperty: string, value: string): void {
    sessionStorage.setItem(nameProperty, value);
  }
  getStorage(nameProperty: string): string | null {
    return sessionStorage.getItem(nameProperty);
  }
  clear(): void {
    return sessionStorage.clear();
  }
  getFieldInToken(field: string): string | string[] {
    const accessToken = sessionStorage.getItem('accessToken') as string;
    const payload: any = jwt_decode(accessToken) as IPayload;
    return payload[field];
  }
}
