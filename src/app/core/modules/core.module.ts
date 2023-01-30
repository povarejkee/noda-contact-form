import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const imports = [CommonModule];

@NgModule({
  imports,
  exports: imports,
})
export class CoreModule {}
