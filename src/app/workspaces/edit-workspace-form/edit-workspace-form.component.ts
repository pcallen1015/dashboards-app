import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Workspace } from '../workspace';

@Component({
  selector: 'workspace-edit-form',
  templateUrl: './edit-workspace-form.component.html',
  styleUrls: ['./edit-workspace-form.component.scss']
})
export class EditWorkspaceFormComponent implements OnInit {
  @Input() workspace: Workspace;
  @Output() onSubmit: EventEmitter<Workspace> = new EventEmitter<Workspace>();
  @Output() onCancel: EventEmitter<Workspace> = new EventEmitter<Workspace>();

  private _form: FormGroup;
  public get form(): FormGroup { return this._form; }

  private initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.workspace.name, Validators.required),
      description: new FormControl(this.workspace.description),
    });
  }

  public ngOnInit(): void {
    this._form = this.initForm();
  }

  public submit(): void {
    this.workspace.name = this._form.value.name;
    this.workspace.description = this._form.value.description;

    this.onSubmit.emit(this.workspace);
  }

  public cancel(): void {
    this.onCancel.emit(null);
  }

}
