import {
  Component,
  ContentChild,
  HostListener,
  Input,
  TemplateRef,
} from '@angular/core';

import { isNotNullish } from '@core/handlers/condition.handlers';

import { BaseFormControlComponent } from '@core/modules/form/classes/BaseFormControlComponent';
import { FormControlProvider } from '@core/modules/form/classes/FormControlProvider';

@Component({
  selector: 'ng-custom-select',
  templateUrl: './form-custom-select.component.html',
  styleUrls: ['./form-custom-select.component.scss'],
  providers: [new FormControlProvider(FormCustomSelectComponent)],
})
export class FormCustomSelectComponent extends BaseFormControlComponent {
  public options: any[] = [];
  public value: any = null;
  public disabled: boolean = false;
  public isShowPanel: boolean = false;

  @Input() public loading: boolean;
  @Input() public label: string;
  @Input() public bindValue: string = 'id';
  @Input() public bindTitle: string = 'name';
  @Input('options') public set _options(value: any[]) {
    if (value) {
      this.options = this.leaveOnlyUnique(value);
    }
  }

  @ContentChild('customTemplate', { read: TemplateRef })
  public customTemplate: TemplateRef<any>;

  @HostListener('window:click', ['$event.target'])
  public closePanel(el$: HTMLElement): void {
    const panelElement: HTMLDivElement = el$.closest('[data-type="panel"]');
    const isClosePanel: boolean = this.isShowPanel && !panelElement;

    if (isClosePanel) this.showPanel(false);
  }

  public leaveOnlyUnique(options: any[]): any[] {
    const uniqueObject: any = options.reduce((accum, opt) => {
      const value: any = opt[this.bindValue];
      accum[value] = opt;

      return accum;
    }, {});

    return Object.values(uniqueObject);
  }

  public getValue(): string {
    const { value, bindTitle } = this;

    if (isNotNullish(value)) {
      const option = this.getOption(value);

      return option?.[bindTitle];
    }

    return this.label;
  }

  public getOption(value: any): any {
    return this.options.find((opt) => opt[this.bindValue] === value);
  }

  public setValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  public togglePanel(): void {
    this.showPanel(!this.isShowPanel);
  }

  public showPanel(flag: boolean): void {
    this.isShowPanel = flag;
  }

  setDisabledState(flag: boolean): void {
    this.disabled = flag;
  }

  public trackByFn(index: number, item: any): any {
    return (item as any)[this.bindValue];
  }

  public get isDisabled(): boolean {
    return this.disabled || !this.options.length;
  }
}
