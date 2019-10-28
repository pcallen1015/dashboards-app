import { MatDialogRef } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

export class ConfirmationDialogRef {
    private _dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>;

    private _onResponse: Subject<boolean> = new Subject();

    constructor(ref: MatDialogRef<ConfirmationDialogComponent, boolean>) {
        this._dialogRef = ref;

        this._dialogRef.afterClosed().subscribe((result: boolean) => {
            this._onResponse.next(!!result);
            this._onResponse.complete();
        });
    }

    public onResponse(): Observable<boolean> { return this._onResponse.asObservable(); }
}