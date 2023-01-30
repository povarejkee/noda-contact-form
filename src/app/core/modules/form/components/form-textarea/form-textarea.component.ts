import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { trim } from '@core/handlers/string.handlers';
import { WINDOW } from '@core/injection/app.tokens';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';

@Component({
  selector: 'ng-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  providers: [new FormControlProvider(FormTextareaComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTextareaComponent
  extends BaseFormControlComponent
  implements OnInit
{
  @Input() public placeholder: string = '';
  @Input() public minlength: number = null;
  @Input() public maxlength: any = null;
  @Input() public rows: string = '5';
  @Input() public cols: string = '10';
  @Input() public readonly: boolean = false;
  @Input() public copy: boolean = false;

  constructor(
    protected injector: Injector,
    protected cdr: ChangeDetectorRef,
    @Inject(WINDOW) private window: Window
  ) {
    super(injector, cdr);
  }

  public setValue(value: string): void {
    const newValue: string = trim(value);

    this.value = value;
    this.onChange(newValue);
    this.onTouched();
    this.detect();
  }

  public copyValue(): void {
    this.window.navigator.clipboard.writeText(this.value);
  }

  writeValue(value: any): void {
    this.value = value;
    this.detect();
  }

  public isShowCopyBtn(): void {
    const { copy, readonly, value } = this;

    return copy && readonly && value;
  }

  public isDisabledReset(): boolean {
    const { disabled, readonly } = this;

    return disabled || readonly || !this.value;
  }
}
