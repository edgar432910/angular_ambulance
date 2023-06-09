import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicEntity } from '../domain/entities/medic.entity';
import { MedicInfrastructure } from '../infraestructure/medic.infraestructure';
import { MedicRepository } from '../domain/repositories/medic.repository';
import { ResultPage } from '../../shared/interfaces/result-page.interface';
// medic application es un servicion , la capa de aplicacion es

@Injectable()
export class MedicApplication {
  constructor(
    @Inject(MedicInfrastructure) private repository: MedicRepository
  ) {}

  getPage(page: number): Observable<ResultPage<MedicEntity>> {
    return this.repository.getPage(page);
  }
  delete(id: number): Observable<MedicEntity> {
    return this.repository.delete(id);
  }
  update(id: number, medic: MedicEntity): Observable<MedicEntity> {
    return this.repository.update(id, medic);
  }
  insert(medic: FormData): Observable<MedicEntity> {
    return this.repository.insert(medic);
  }
  list(): Observable<MedicEntity[]> {
    return this.repository.list();
  }
}
