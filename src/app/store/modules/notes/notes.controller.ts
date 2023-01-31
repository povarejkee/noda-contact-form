import { Injectable } from '@angular/core';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Observable } from 'rxjs';

import { NotesApiService } from '@store/modules/notes/notes.api.service';

import { INote } from '@store/modules/notes/interfaces/INote';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class NotesController {
  constructor(private notesService: NotesApiService) {}

  public getNote(merchantId: string): Observable<IPaginationData<INote>> {
    return this.notesService.getNote(merchantId);
  }

  public createNote(notes: INote): Observable<INote> {
    return this.notesService.createNote(notes);
  }
}
