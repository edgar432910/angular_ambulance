import { Observable } from 'rxjs';
import { AuthEntity } from '../entities/auth.entity';
import { Tokens } from '../../application/tokens.interface';

export interface AuthRepository {
  login(auth: AuthEntity): Observable<Tokens>;
  getNewAccessToken(refreshToken: string): Observable<Tokens>;
}
