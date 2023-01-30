import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ANRepeatState } from '@core/animations/animations';
import { EnMask } from '@core/enums/mask.enums';
import { isJSType } from '@core/handlers/condition.handlers';
import { trim } from '@core/handlers/string.handlers';
import { WINDOW } from '@core/injection/app.tokens';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';
import { TInput, TMask } from '../../types/form.types';

@Component({
  selector: 'ng-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [new FormControlProvider(FormInputComponent)],
  animations: [
    ANRepeatState({
      fromStyle: {
        transform: 'scale(0)',
        opacity: '0',
      },
      toStyle: {
        transform: 'scale(1)',
        opacity: '1',
      },
    }),
  ],
})
export class FormInputComponent
  extends BaseFormControlComponent
  implements OnInit
{
  @Input() public type: TInput = 'text';
  @Input() public autocomplete: string;
  @Input() public placeholder: string = 'Type your text';
  @Input() public activeLabel: boolean = false;
  @Input() public prefix: string = null;
  @Input() public min: number = null;
  @Input() public max: number = null;
  @Input() public minlength: number = null;
  @Input() public maxlength: number = null;
  @Input() public step: string | number = 1;
  @Input() public copy: boolean = false;
  @Input() public mask: string = null;
  @Input() public maskType: TMask = 'default';
  @Input() public maskPatterns: any = null;
  @Input() public showMaskTyped: boolean = false;
  @Input() public dropSpecialCharacters: boolean = true;
  @Input() public allowNegativeNumbers: boolean = false;
  @Input() public thousandSeparator: string = '';
  @Input() public float: number = 0;
  @Input() public email: boolean = false;
  @Input() public country: string = null;
  @Input() public currency: string;
  @Input() public encrypt: boolean = false;
  @Input() public placeHolderCharacter: string;
  @Input() public pasteHandler: (v: string) => void;

  @ViewChild('inputRef', { read: ElementRef })
  public inputRef$: ElementRef<HTMLInputElement>;

  constructor(
    protected injector: Injector,
    protected cdr: ChangeDetectorRef,
    @Inject(WINDOW) private window: Window
  ) {
    super(injector, cdr);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initMaskByType(this.maskType);
  }

  private initMaskByType(maskType: TMask): void {
    switch (maskType) {
      case 'tax': {
        this.mask = EnMask.TAX;
        break;
      }
      case 'swift': {
        this.mask = EnMask.SWIFT;
        break;
      }
      case 'iban': {
        this.mask = EnMask.IBAN;
        break;
      }
      case 'sort-routing': {
        this.mask = EnMask.SORT_ROUTING;
        break;
      }
      case 'string': {
        this.mask = EnMask.STRING;
        break;
      }
      case 'uppercase': {
        this.mask = EnMask.UPPERCASE;
        break;
      }
      case 'lowercase': {
        this.mask = EnMask.LOWERCASE;
        break;
      }
      case 'number': {
        this.mask = EnMask.NUMBER;
        break;
      }
      case 'phone': {
        this.mask = EnMask.PHONE;
        break;
      }
    }
  }

  public isExistRange(): boolean {
    const isExistRange: boolean = isJSType(this.maxlength, 'number');

    return isExistRange;
  }

  public setValue(value: string): void {
    const newValue: string = trim(value) || this.resetVal;

    this.value = newValue;
    this.onChange(newValue);
    this.updateCustomErrors(null);
    this.detect();
  }

  public copyValue(): void {
    this.window.navigator.clipboard.writeText(this.value);
  }

  writeValue(value: any): void {
    this.value = value;

    this.detect();
  }

  public blur(input$: HTMLInputElement): void {
    this.onTouched();
    input$.value = trim(input$.value);
  }

  public paste(e: Event) {
    const { value } = e.target as HTMLInputElement;

    if (isJSType(this.pasteHandler, 'function')) this.pasteHandler(value);
  }

  public isShowCopyBtn(): void {
    const { copy, readonly, value } = this;

    return copy && readonly && value;
  }
}
