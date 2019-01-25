import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from './confirmation.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) { }

  ask(msg: string, ok: () => void, nok?: () => void): void {
    const data = { msg, cancel: !!nok };
    this.dialog
        .open(ConfirmationComponent, { data })
        .afterClosed()
        .subscribe(choice => {
          if(choice === 'yes') ok ? ok() : null;
          else if(choice === 'no') nok ? nok() : null;
        });
  }
}
