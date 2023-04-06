import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

// @Injectable({ providedIn: `root` })
@Injectable()
export class UtilsServices {
  constructor(private dialog: MatDialog) {}

  // method show confirm
  showConfirm(messageToShow: string = '') {
    const reference = this.dialog.open(ConfirmComponent, {
      width: '340px',
      disableClose: true,
    });

    if (messageToShow) {
      reference.componentInstance.messageToShow = messageToShow;
    }
    return reference.afterClosed();
  }
  showModal(
    classComponent: any,
    options: { [s: string]: string | boolean | number | object }
  ): MatDialogRef<any> {
    return this.dialog.open(classComponent, options);
  }
}
