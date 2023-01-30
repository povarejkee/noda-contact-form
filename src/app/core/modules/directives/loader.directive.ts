import { ComponentRef, Directive, Input, OnInit } from '@angular/core';
import { TSize } from '@core/types/state.types';
import { LoaderComponent } from '../components/components/loader/loader.component';
import { FactoryResolveDirective } from './factory-resolve.directive';

type TAsyncConxtext<T = unknown> = {
  ngLoader: T;
};

@Directive({
  selector: '[ngLoader]',
  exportAs: 'loaderRef',
})
export class LoaderDirective
  extends FactoryResolveDirective<LoaderComponent>
  implements OnInit
{
  private $loaderComponent: ComponentRef<LoaderComponent>;
  private asyncContext: TAsyncConxtext = { ngLoader: null };
  private isLoad: boolean = false;

  @Input()
  set ngLoader(value: any) {
    if (value) {
      this.isLoad ? this.setContext(value) : this.showComponent(value);
    } else {
      this.showLoader();
    }
  }

  @Input() set ngLoaderSize(size: Exclude<TSize, 'large'>) {
    if (this.$loaderComponent && size) {
      this.$loaderComponent.instance.size = size;
      this.$loaderComponent.changeDetectorRef.detectChanges();
    }
  }

  ngOnInit() {
    this.showLoader();
  }

  private removeLoader(): void {
    this.isLoad = true;
    this.$loaderComponent?.onDestroy(() => {});
    this.$loaderComponent = null;
    this.clearContainer();
  }

  public showLoader(): void {
    this.clearContainer();
    this.$loaderComponent = this.insertComponent(LoaderComponent);
  }

  public showComponent(value: any): void {
    this.removeLoader();
    this.setContext(value);
    this.insertTemplate(this.asyncContext);
  }

  private setContext(context: any) {
    this.asyncContext.ngLoader = context;
  }
}
