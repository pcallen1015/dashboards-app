import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ContentConfigOption } from '../content-config-option';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContentConfig } from '../content-config';

@Component({
  selector: 'content-configure-form',
  templateUrl: './configure-content-container-form.component.html',
  styleUrls: ['./configure-content-container-form.component.css']
})
export class ConfigureContentContainerFormComponent implements OnInit {
  @Input() config: ContentConfig = new ContentConfig();
  @Input() options: ContentConfigOption[] = [];
  @Output() onSubmit: EventEmitter<ContentConfig> = new EventEmitter<ContentConfig>();
  @Output() onCancel: EventEmitter<ContentConfig> = new EventEmitter<ContentConfig>();

  private _form: FormGroup;
  public get form(): FormGroup { return this._form; }

  constructor() { }

  private initForm(): FormGroup {
    let group: any = {};
    this.options.forEach((option: ContentConfigOption) => {
      let value = this.config.getParam(option.key) || null;
      group[option.key] = option.isRequired ? new FormControl(value, Validators.required) : new FormControl(value);
    });

    return new FormGroup(group);
  }

  public ngOnInit(): void {
    this._form = this.initForm();
  }

  private hasValue(option: ContentConfigOption): boolean {
    return this._form.value.hasOwnProperty(option.key) && this._form.value[option.key] !== null && this._form.value[option.key] !== undefined;
  }

  public submit(): void {  
    this.options.forEach((option: ContentConfigOption) => {
      if (this.hasValue(option)) this.config.setParam(option.key, this._form.value[option.key]);
    });

    this.onSubmit.emit(this.config);
  }

  public cancel(): void {
    this.onCancel.emit(null);
  }

}
