import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InstructionsDB } from '../../db/instructions.db';
import { InstructionsService } from '../../services/instructions.service';

@Component({
  selector: 'ng-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructionsComponent {
  public constructor(
    private instructionsService: InstructionsService
  ) {}

  public get images(): typeof InstructionsDB.images {
    return this.instructionsService.getDataFromDB(['images']);
  }

  public get links(): typeof InstructionsDB.links {
    return this.instructionsService.getDataFromDB(['links']);
  }

}
