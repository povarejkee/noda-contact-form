import { NgModule } from '@angular/core';
import { ComponentsModule } from '@core/modules/components/components.module';
import { CoreModule } from '@core/modules/core.module';
import { DirectivesModule } from '@core/modules/directives/directives.module';
import { FormModule } from '@core/modules/form/form.module';
import { MaterialModule } from '@core/modules/material/material.module';
import { PipesModule } from '@core/modules/pipes/pipes.module';
import { PopupModule } from '../popup/popup.module';
import { TableColumnFilterComponent } from './components/table-column-filter/table-column-filter.component';
import { TableToggleColumnsResetComponent } from './components/table-toggle-columns-reset/table-toggle-columns-reset.component';
import { TableToggleColumnsComponent } from './components/table-toggle-columns/table-toggle-columns.component';
import { TableComponent } from './components/table/table.component';
import { TableCellContentSlice } from './directives/table-cell-content-slice.directive';

const components = [
  TableComponent,
  TableColumnFilterComponent,
  TableToggleColumnsComponent,
  TableToggleColumnsResetComponent,
];

const directives = [TableCellContentSlice];

@NgModule({
  declarations: [...components, ...directives],
  imports: [
    CoreModule,
    MaterialModule,
    ComponentsModule,
    FormModule,
    PipesModule,
    PopupModule,
    DirectivesModule,
  ],
  exports: components,
})
export class TableModule {}
