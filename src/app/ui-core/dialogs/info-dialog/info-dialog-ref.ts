import { MatDialogRef } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { InfoDialogComponent } from './info-dialog.component';

export class InfoDialogRef {
    private _dialogRef: MatDialogRef<InfoDialogComponent, void>;

    private _onDone: Subject<void> = new Subject();

    constructor(ref: MatDialogRef<InfoDialogComponent, void>) {
        this._dialogRef = ref;

        this._dialogRef.afterClosed().subscribe(() => {
            this._onDone.next();
            this._onDone.complete();
        });
    }

    public onDone(): Observable<void> { return this._onDone.asObservable(); }
}