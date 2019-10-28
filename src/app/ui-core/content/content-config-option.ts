import { ContentConfigSelectOption } from './content-config-select-option';
import { ContentConfigOptionType } from './content-config-option-type';

export class ContentConfigOption {
  private _key: string;
  private _name: string;
  private _type: ContentConfigOptionType;
  private _options: ContentConfigSelectOption[];
  private _isRequired: boolean;
  private _value: any;
  private _hint: string;

  constructor(
    key: string,
    name: string,
    type: ContentConfigOptionType,
    isRequired: boolean = false,
    options: ContentConfigSelectOption[] = [],
    hint: string = null,
    value: any = null
  ) {
    this._key = key;
    this._name = name;
    this._type = type;
    this._isRequired = isRequired;
    this._options = options;
    this._value = value;
    this._hint = hint;
  }

  public get name(): string { return this._name; }
  public get key(): string { return this._key; }
  public get type(): ContentConfigOptionType { return this._type; }
  public get options(): ContentConfigSelectOption[] { return this._options; }
  public get isRequired(): boolean { return this._isRequired; }
  public get value(): any { return this._value; }
  public get hint(): string { return this._hint; }

  public set value(val: any) { this._value = val; }
}