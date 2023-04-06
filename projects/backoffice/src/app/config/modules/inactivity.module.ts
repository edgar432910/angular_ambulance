import { NgModule, ModuleWithProviders } from '@angular/core';
import { IInactivity } from '../interfaces/inactivity.interface';
import { INACTITVITY_TOKEN } from '../tokens/inactivity.token';

@NgModule()
export class InactivityModule {
  static forRoot(config: IInactivity): ModuleWithProviders<InactivityModule> {
    return {
      ngModule: InactivityModule,
      providers: [
        {
          provide: INACTITVITY_TOKEN,
          useValue: config,
        },
      ],
    };
  }
}
