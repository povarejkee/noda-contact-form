import { Component, Input } from '@angular/core';

import { TLoaderContentMode } from '@core/ui/table/types/table.types';

@Component({
  selector: 'ng-loader-content',
  templateUrl: './loader-content.component.html',
  styleUrls: ['./loader-content.component.scss'],
})
export class LoaderContentComponent {
  @Input() public mode: TLoaderContentMode = 'standard';
  @Input() public diameter: number = 100;
}
