import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  Input,
} from '@angular/core';
import { WINDOW, WindowDocument } from '@core/injection/app.tokens';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';

@Component({
  selector: 'ng-form-input-color',
  templateUrl: './form-input-color.component.html',
  styleUrls: ['./form-input-color.component.scss'],
  providers: [new FormControlProvider(FormInputColorComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputColorComponent extends BaseFormControlComponent {
  @Input() public label: string;
  @Input() public copy: boolean = true;

  constructor(
    @Inject(WINDOW) private window: WindowDocument,
    injector: Injector,
    cdr: ChangeDetectorRef
  ) {
    super(injector, cdr);
  }

  public setValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.detect();
  }

  public writeValue(value: string): void {
    this.value = value;
    this.detect();
  }

  public copyValue(): void {
    this.window.navigator.clipboard.writeText(this.value);
  }
}
