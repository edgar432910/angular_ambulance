import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultPage } from '../../shared/interfaces/result-page.interface';
import { DriverInfrastructure } from '../infraestructure/driver.infraestructure';

import { DriverRepository } from '../domain/repositories/driver.repository';
import { DriverEntity } from '../domain/entities/driver.entity';

@Injectable()
export class DriverApplication {
  constructor(
    @Inject(DriverInfrastructure) private repository: DriverRepository
  ) {}

  getPage(page: number): Observable<ResultPage<DriverEntity>> {
    return this.repository.getPage(page);
  }
  delete(id: number): Observable<DriverEntity> {
    return this.repository.delete(id);
  }
  update(id: number, driver: DriverEntity): Observable<DriverEntity> {
    return this.repository.update(id, driver);
  }
  insert(driver: DriverEntity): Observable<DriverEntity> {
    return this.repository.insert(driver);
  }
  list(): Observable<DriverEntity[]> {
    return this.repository.list();
  }
}
