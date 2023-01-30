import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ANStyles } from '@core/animations/animations';
import { TrackBy } from '@core/decorators/decorators';
import { isJSType } from '@core/handlers/condition.handlers';
import { randomid } from '@core/handlers/shared.handlers';
import { WINDOW } from '@core/injection/app.tokens';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { SelectOption } from '../../classes/SelectOption';
import { TInputSelectOptions } from '../../types/form.types';

@UntilDestroy()
@Component({
  selector: 'ng-form-input-select',
  template: '',
  animations: [
    ANStyles({
      fromStyle: {
        transform: 'translateY(50%)',
        opacity: '0',
      },
      toStyle: {
        transform: 'translateY(0%)',
        opacity: '1',
      },
      animationName: 'ANShowOptions',
    }),
    ANStyles({
      fromStyle: {
        transform: 'translateY(-50%)',
        height: '0px',
        opacity: '0',
      },
      toStyle: {
        transform: 'translateY(0%)',
        height: '*',
        opacity: '1',
      },
      animationName: 'ANShowWarning',
    }),
    ANStyles({
      fromStyle: {
        width: '0px',
        opacity: '0',
        overflow: 'hidden',
      },
      toStyle: {
        width: '*',
        opacity: '1',
        overflow: 'hidden',
      },
      animationName: 'ANShowWidth',
    }),
  ],
  exportAs: 'geoSelectRef',
})
export abstract class FormInputSelectComponent
  extends BaseFormControlComponent<any>
  implements OnInit
{
  public id: string = randomid();
  public isShowOptionsList: boolean = false;

  @Input() public placeholder: string = 'Type your text';
  @Input() public emptyMessage: string = 'The list of options is empty...';
  @Input() public mask: string = '';
  @Input() public activeLabel: boolean = false;
  @Input() public prefix: string = null;
  @Input() public showMaskTyped: boolean = false;
  @Input() public minlength: number = null;
  @Input() public maxlength: number = null;
  @Input() public readonly: boolean = false;
  @Input() public copy: boolean = false;
  @Input() public options: TInputSelectOptions = [];
  @Input() public pasteHandler: (v: string) => void;

  @ViewChild('inputRef') private inputRef: ElementRef<HTMLInputElement>;

  @HostListener('document:click', ['$event.target'])
  documentClick(targetEl$: HTMLElement) {
    const isHostContain: boolean = Boolean(
      targetEl$.closest(`[data-id="${this.id}"]`)
    );
    const isBlur: boolean = !isHostContain && this.isShowOptionsList;

    if (isBlur) {
      this.blur();
    }
  }

  constructor(
    protected injector: Injector,
    protected cdr: ChangeDetectorRef,
    @Inject(WINDOW) private window: Window
  ) {
    super(injector, cdr);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public setValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.cdr.detectChanges();
  }

  public copyValue(): void {
    this.window.navigator.clipboard.writeText(String(this.value));
  }

  public focus(): void {
    this.showOptionsList(true);
  }

  public selectOption(option: SelectOption): void {
    this.setValue(option.value);
    this.isShowOptionsList = false;
  }

  public blur(): void {
    this.onTouched();
    this.showOptionsList(false);
    this.cdr.detectChanges();
  }

  private showOptionsList(flag: boolean): void {
    this.isShowOptionsList = flag;
  }

  public paste(e: Event) {
    const { value } = e.target as HTMLInputElement;

    if (isJSType(this.pasteHandler, 'function')) this.pasteHandler(value);
  }

  @TrackBy('index')
  public trackByFn() {}

  public isDisabled(): boolean {
    return this.disabled || this.readonly;
  }
}
