import { Injectable, Inject } from '@angular/core';
import { AuthRepository } from '../domain/repository/auth.repository';
import { AuthInfrastructure } from '../infraestructure/auth.infrastructure';
import { AuthEntity } from '../domain/entities/auth.entity';
import { Router } from '@angular/router';
import { Tokens } from './tokens.interface';
import { StorageInfrastructure } from '../infraestructure/storage.infraestructura';
import { StorageRepository } from '../domain/repository/storage.repository';
import { LayoutService } from '../../config/services/layout.service';
import { ILayout } from '../../config/interfaces/layout.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AuthApplication {
  private userLogged = false;
  constructor(
    @Inject(AuthInfrastructure) private authRepository: AuthRepository,
    @Inject(StorageInfrastructure) private storageRepository: StorageRepository,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  login(auth: AuthEntity) {
    this.authRepository.login(auth).subscribe((response: Tokens) => {
      console.log({ response });
      const { accessToken, refreshToken } = response;
      this.storageRepository.setStorage('accessToken', accessToken);
      this.storageRepository.setStorage('refreshToken', refreshToken);
      this.userLogged = true;
      this.router.navigate(['/dashboard']);
      const configLayout: ILayout = { header: true, menu: true };
      this.layoutService.configuration = configLayout;
    });
  }
  logout() {
    this.storageRepository.clear();
    this.userLogged = false;
    this.router.navigate(['/']);
  }
  // necesito saber si esta logueado o no
  get isAutenticated(): boolean {
    return (
      this.userLogged || !!this.storageRepository.getStorage('accessToken')
    );
  }
  getNewAccessToken(refreshToken: string): Observable<Tokens> {
    return this.authRepository.getNewAccessToken(refreshToken);
  }
}
