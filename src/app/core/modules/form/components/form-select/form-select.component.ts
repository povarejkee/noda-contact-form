import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ANStyles } from '@core/animations/animations';
import { TrackBy } from '@core/decorators/decorators';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';
import { SelectOption } from '../../classes/SelectOption';

@Component({
  selector: 'ng-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  providers: [new FormControlProvider(FormSelectComponent)],
  animations: [
    ANStyles({
      fromStyle: {
        width: '0',
        opacity: '0',
        overflow: 'hidden',
      },
      toStyle: {
        width: '*',
        opacity: '1',
        overflow: 'hidden',
      },
      animationName: 'ANShowSpinner',
    }),
  ],
})
export class FormSelectComponent extends BaseFormControlComponent {
  @Input() public label: string = '';
  @Input() public options: SelectOption<any>[];
  @Input() public placeholder: string = 'Choose an option';
  @Input() public isShowEmptyOption: boolean = false;
  @Input() public loading: boolean = false;
  @Input() public activeOptionCb: (opt: SelectOption) => boolean = (_) => false;
  @Input() public disabledOptionCb: (opt: SelectOption) => boolean;

  @Output('change') private _change = new EventEmitter<SelectOption>();

  @ContentChild('triggerTpl', { read: TemplateRef })
  public triggerTpl: TemplateRef<SelectOption>;

  @ContentChild('optionTpl', { read: TemplateRef })
  public optionTpl: TemplateRef<SelectOption>;

  @TrackBy('property', 'value')
  public trackByFn() {}

  public get activeOpt(): SelectOption {
    return this.options?.find((opt: SelectOption) => opt.value === this.value);
  }

  public setValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this._change.emit(this.value);
    this.detect();
  }

  writeValue(value: unknown): void {
    this.value = value;
    this.detect();
  }

  public isDisabledOption(option: SelectOption): boolean {
    if (!this.disabledOptionCb) return false;

    return this.disabledOptionCb(option);
  }
}
