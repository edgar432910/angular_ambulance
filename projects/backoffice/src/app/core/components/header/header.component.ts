import { Component, OnInit, Inject } from '@angular/core';
import { AuthApplication } from '../../application/auth.application';
import { StorageApplication } from '../../application/storage.application';
import jwt_decode from 'jwt-decode';
interface IPayload {
  name: string;
  email: string;
  role: string[];
}
@Component({
  selector: 'amb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username = '';

  constructor(
    @Inject(AuthApplication) private authAplication: AuthApplication,
    private storageApplication: StorageApplication
  ) {}

  ngOnInit(): void {
    const accessToken = this.storageApplication.getField(
      'accessToken'
    ) as string;
    const payload: IPayload = jwt_decode(accessToken);
    this.username = payload.name;
  }

  logout() {
    this.authAplication.logout();
  }
}
