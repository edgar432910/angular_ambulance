import { Injectable, Inject } from '@angular/core';
import { LAYOUT_TOKEN } from '../tokens/layout.token';
import { ILayout } from '../interfaces/layout.interface';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class LayoutService {
  private configSubject: BehaviorSubject<ILayout>;
  constructor(@Inject(LAYOUT_TOKEN) private config: ILayout) {
    this.configSubject = new BehaviorSubject<ILayout>(this.config);
  }

  set configuration(value: any) {
    // quiero que desaparezca el menu en el loging
    let config = this.configSubject.getValue();
    // merge
    config = Object.assign(config, value);
    this.configSubject.next(config);
  }
  get configuration(): any {
    // solo te permite leer valores
    return this.configSubject.asObservable();
  }
}
