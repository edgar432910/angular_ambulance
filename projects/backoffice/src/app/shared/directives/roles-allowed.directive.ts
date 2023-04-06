import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthApplication } from '../../core/application/auth.application';
import { StorageApplication } from '../../core/application/storage.application';
import { Authorizations } from '../classes/authorizations';

@Directive({
  selector: '[roles-allowed]',
})
export class RolesAllowedDirective {
  @Input('roles-allowed') dirAuthorization: string = '';
  rolesAllowed: string[] = [];
  hashView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authApplication: AuthApplication,
    private storageApplication: StorageApplication
  ) {}
  ngOnInit() {
    const authorization = new Authorizations();
    this.rolesAllowed = authorization.getPropertyValue(this.dirAuthorization);
    this.execute();
  }

  execute() {
    const isUserLogged = this.authApplication.isAutenticated;
    const rolesUser = this.storageApplication.getFieldInToken(
      'roles'
    ) as string[];

    const isUserAuthorized = rolesUser.some((role) =>
      this.rolesAllowed.includes(role)
    );
    if (isUserLogged && isUserAuthorized && !this.hashView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hashView = true;
    } else {
      this.viewContainerRef.clear();
      this.hashView = false;
    }
  }
}
