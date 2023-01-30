import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ANStyles } from '@core/animations/animations';
import { isNullish } from '@core/handlers/condition.handlers';
import {
  deepCopy,
  nativeElement,
  randomid,
} from '@core/handlers/shared.handlers';
import { WINDOW, WindowDocument } from '@core/injection/app.tokens';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICountry } from '@store/modules/locations/interfaces/ICountry';
import { LocationsController } from '@store/modules/locations/locations.controller';
import { ICallingCode } from '@store/modules/users/interfaces/ICallingCode';
import { UsersController } from '@store/modules/users/users.controller';
import { BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  take,
} from 'rxjs/operators';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';
import { SelectOption } from '../../classes/SelectOption';
import { TAutocomplete, TInput } from '../../types/form.types';

@UntilDestroy()
@Component({
  selector: 'ng-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.scss'],
  providers: [new FormControlProvider(FormAutocompleteComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    ANStyles({
      fromStyle: {
        opacity: '0.3',
        transform: 'translateY(20px)',
      },
      toStyle: {
        opacity: '1',
        transform: 'translateY(0px)',
      },
      animationName: 'ANShowOptions',
    }),
    ANStyles({
      fromStyle: {
        height: '0px',
      },
      toStyle: {
        height: '*',
      },
      animationName: 'ANShowErrors',
    }),
  ],
})
export class FormAutocompleteComponent
  extends BaseFormControlComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  public id: string = randomid();
  public inputValue: any = this.value;
  public isShowOptions: boolean = false;
  public isFocusedInput: boolean = false;
  public options$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  @Input() public placeholder: string = 'Type your text';
  @Input() public bindLabel: string = 'id';
  @Input() public bindValue: string = 'title';
  @Input() public mask: string;
  @Input() public prefix: string;
  @Input() public activeLabel: boolean = false;
  @Input() public handleChilds: boolean = true;
  @Input() public copy: boolean = false;
  @Input() public type: TAutocomplete = 'default';
  @Input() public inputType: TInput = 'text';
  @Input() public options: SelectOption[] = [];
  @Input() public inputValueFormatter: (opt: any) => string = (opt: any) =>
    opt[this.bindLabel];

  @ContentChild('optionTpl', { read: TemplateRef })
  public optionTpl: TemplateRef<SelectOption>;

  @ContentChild('prefixTpl', { read: TemplateRef })
  public prefixTpl: TemplateRef<SelectOption>;

  @ViewChild('inputRef', { read: ElementRef })
  public inputRef$: ElementRef<HTMLInputElement>;

  @HostListener('window:click', ['$event.target'])
  private hideOptionsList(el$: HTMLElement): void {
    const document: Document = this.injector.get(DOCUMENT);
    const parentElement: HTMLElement = el$.closest(
      `[data-autocomplete="${this.id}"]`
    );
    const isClose: boolean = !Boolean(parentElement);
    const isNotActive: boolean = document.activeElement !== this.input$;

    if (isClose && this.isShowOptions && isNotActive) {
      this.blur();
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.initAutoCompleteOptions();
  }

  private initAutoCompleteOptions(): void {
    switch (this.type) {
      case 'country': {
        this.initCountryOptions();
        break;
      }
      case 'calling-codes': {
        this.initCallingCodesOptions();
        break;
      }
      default: {
        this.initDefaultOptions();
      }
    }
  }

  private initDefaultOptions(): void {
    this.updateOptions(this.options);
    setTimeout(() => {
      this.updateInputValue(this.value);
    }, 0);
  }

  private initCountryOptions(): void {
    const locationsController: LocationsController =
      this.injector.get(LocationsController);

    this.bindValue = 'code';
    this.bindLabel = 'name';

    locationsController
      .getCountries()
      .pipe(filter(Boolean), take(1), map(deepCopy))
      .subscribe((options: ICountry[]) => {
        this.updateOptions(options);
        this.updateInputValue(this.value);

        if (this.handleChilds) this.initControlCountryValueListener();
      });
  }

  private initControlCountryValueListener(): void {
    this.formControl?.valueChanges
      .pipe(
        startWith(this.value),
        delay(0),
        distinctUntilChanged(),
        debounceTime(50),
        untilDestroyed(this)
      )
      .subscribe((value) => {
        this.setGeoChildsStatus(value);
      });
  }

  private initCallingCodesOptions(): void {
    const usersController: UsersController = this.injector.get(UsersController);

    this.bindValue = 'countryCode';
    this.bindLabel = 'name';
    this.inputValueFormatter = (opt: ICallingCode) => opt.code;

    usersController
      .getCallingCodes()
      .pipe(
        filter(Boolean),
        take(1),
        map(deepCopy),
        map((codes: ICallingCode[]) => {
          const transformedCodes: ICallingCode[] = codes.map((c) => {
            c.name = `${c.code} ${c.name}`;
            return c;
          });

          return transformedCodes;
        })
      )
      .subscribe((options: ICallingCode[]) => {
        this.updateOptions(options);
        this.updateInputValue(this.value);
      });
  }

  private setGeoChildsStatus(value: any): void {
    const childs: string[] = ['state', 'city'];
    const {
      control: { parent },
    } = this.formControl;
    const method = isNullish(value) ? 'disable' : 'enable';

    if (!this.disabled) {
      childs.forEach((c) => parent.get(c)?.[method]());
    }
  }

  private get input$(): HTMLInputElement {
    return this.inputRef$ && nativeElement(this.inputRef$);
  }

  public setValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.updateInputValue(value);
    this.toggleOptionsState(false);
    this.detect();
  }

  public writeValue(value: any): void {
    this.value = value;
    this.updateInputValue(value);
  }

  public selectOption(option: any): void {
    this.setValue(option[this.bindValue]);
  }

  public copyValue(): void {
    const window: WindowDocument = this.injector.get(WINDOW);

    window.navigator.clipboard.writeText(this.value);
  }

  public blur(): void {
    const value: string = this.input$.value === '' ? null : this.value;

    this.onTouched();
    this.setValue(value);
  }

  public toggleOptionsState(isShowOptions: boolean): void {
    this.isShowOptions = isShowOptions;
    this.isFocusedInput = isShowOptions;
  }

  private updateOptions(options: any[]): void {
    this.options$.next(options);
  }

  private updateInputValue(value: any): void {
    const options: any[] = this.options$.getValue();
    const currentOption: any = options.find(
      (opt) => opt[this.bindValue] === value
    );

    this.inputValue = currentOption
      ? this.inputValueFormatter(currentOption)
      : null;

    if (this.input$) {
      this.input$.value = this.inputValue;
    }

    this.cdr.detectChanges();
  }

  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);

    setTimeout(() => {
      switch (this.type) {
        case 'country': {
          this.setGeoChildsStatus(this.value);
          break;
        }
      }
    });
  }
}
