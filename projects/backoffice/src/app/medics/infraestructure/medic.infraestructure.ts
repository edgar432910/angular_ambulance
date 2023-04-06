import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/backoffice/src/environments/environment';
import { Observable } from 'rxjs';
import { MedicEntity } from '../domain/entities/medic.entity';
import { MedicRepository } from '../domain/repositories/medic.repository';
import { StorageApplication } from '../../core/application/storage.application';
import { ResultPage } from '../../shared/interfaces/result-page.interface';

@Injectable()
export class MedicInfrastructure implements MedicRepository {
  private pathEndpoint = '';
  constructor(
    private http: HttpClient,
    private storageApplication: StorageApplication
  ) {}
  getPage(page: number): Observable<ResultPage<MedicEntity>> {
    return this.http.get<ResultPage<MedicEntity>>(
      `${environment.apiUrl}/medics/page/${page}/${environment.pageSize}`
    );
  }
  delete(id: number): Observable<MedicEntity> {
    throw new Error('Method not implemented.');
  }
  update(id: number, medic: MedicEntity): Observable<MedicEntity> {
    console.log(medic);
    return this.http.put<MedicEntity>(
      `${environment.apiUrl}/medics/${id}`,
      medic
    );
  }
  insert(medic: FormData): Observable<MedicEntity> {
    return this.http.post<MedicEntity>(`${environment.apiUrl}/medics`, medic);
  }
  list(): Observable<MedicEntity[]> {
    throw new Error('Method not implemented.');
  }
}
