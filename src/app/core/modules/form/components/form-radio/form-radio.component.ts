import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackBy } from '@core/decorators/decorators';
import { TAdjustPosition } from '@core/types/state.types';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';
import { RadioOption } from '../../classes/RadioOption';
import { TControlErrorModule } from '../../types/form.types';

@Component({
  selector: 'ng-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [new FormControlProvider(FormRadioComponent)],
})
export class FormRadioComponent extends BaseFormControlComponent {
  @Input() public isTest: boolean = false;

  @Input('label') public label: string = null;
  @Input('options') public options: RadioOption[] = [];
  @Input('required') public required: boolean = false;
  @Input('buttonsGap') public buttonsGap: string = '10px';
  @Input('direction') public direction: 'row' | 'column' = 'row';
  @Input('labelPosition') public labelPosition: TAdjustPosition = 'after';
  @Input('errorModule') override errorModule: TControlErrorModule =
    'form-radio';
  @Input('disabledOptionCb') public disabledOptionCb: (
    opt: RadioOption
  ) => boolean;

  ngOnInit(): void {
    super.ngOnInit();
  }

  public setValue(value: boolean): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.detect();
  }

  writeValue(value: unknown): void {
    this.value = value;
    this.onTouched();
  }

  @TrackBy('property', 'id')
  public trackByOption() {}

  public isDisabledOption(option: RadioOption): boolean {
    if (this.disabledOptionCb) {
      return this.disabledOptionCb(option);
    }

    return this.disabled;
  }

  public get isInvalidControl(): boolean {
    return this.errorStrategy === 'default' && this.formControl?.invalid;
  }
}
