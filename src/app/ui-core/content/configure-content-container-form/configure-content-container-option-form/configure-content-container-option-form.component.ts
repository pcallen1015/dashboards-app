import { Component, Input, OnInit } from '@angular/core';
import { ContentConfigOption } from '../../content-config-option';
import { FormGroup } from '@angular/forms';
import { ContentConfigOptionType } from '../../content-config-option-type';

@Component({
  selector: 'configure-content-container-option-form',
  templateUrl: './configure-content-container-option-form.component.html',
  styleUrls: ['./configure-content-container-option-form.component.css']
})
export class ConfigureContentContainerOptionFormComponent {
  @Input() option: ContentConfigOption;
  @Input() form: FormGroup;

  public get isValid() { return this.form.controls[this.option.key].valid; }
  public get errors() { return this.form.controls[this.option.key].errors; }

  public get items(): any[] {
    switch (this.option.type) {
      case ContentConfigOptionType.boolean:
        return [{ name: this.option.name, value: true }];
      default:
        return [];
    }
  }

  public get value(): any {
    switch (this.option.type) {
      case ContentConfigOptionType.boolean:
        return !!((this.form.value[this.option.key] || [])[0]);
      default:
        return this.form.value[this.option.key];
    }
  }

}
