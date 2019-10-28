import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { View } from '../view';

@Component({
  selector: 'view-edit-form',
  templateUrl: './edit-view-form.component.html',
  styleUrls: ['./edit-view-form.component.css']
})
export class EditViewFormComponent implements OnInit {
  @Input() view: View;
  @Output() onSubmit: EventEmitter<View> = new EventEmitter<View>();
  @Output() onCancel: EventEmitter<View> = new EventEmitter<View>();

  private _form: FormGroup;
  public get form(): FormGroup { return this._form; }

  private _min: number = 1;
  public get min(): number { return this._min; }

  private _max: number = 12;
  public get max(): number { return this._max; }

  private initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.view.name, Validators.required),
      description: new FormControl(this.view.description),
      // slug: new FormControl(this.view.slug, Validators.required),
      columns: new FormControl(this.view.columns, [Validators.required, Validators.min(this._min), Validators.max(this._max)])
    });
  }

  ngOnInit() {
    this._form = this.initForm();
  }

  public submit(): void {
    // Copy form values into View and return
    this.view.name = this._form.value.name;
    this.view.description = this._form.value.description;
    // this.view.slug = this._form.value.slug;
    this.view.columns = this._form.value.columns;

    this.onSubmit.emit(this.view);
  }

  public cancel(): void {
    this.onCancel.emit(null);
  }

}
