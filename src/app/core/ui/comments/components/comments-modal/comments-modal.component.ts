import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { IDocument } from '@store/modules/documents/interfaces/IDocument';
import { AccountDataService } from '@page/account/services/account.data.service';
import {
  IComment,
  TCommentsFromPage,
  TCommentsModalMode,
} from '@page/account/types/account.types';
import { AccountDataFlags } from '@page/account/states/account.data.flags';
import { isDisabledForm } from '@core/modules/form/handlers/form.handlers';
import { EnDocumentsStatus } from '@store/modules/documents/enums/documents.enums';
import { TrackBy } from '@core/decorators/decorators';
import { Store } from '@store/store/store';
import { MerchantsItemDataService } from '@page/merchants/components/merchants-item/services/merchants-item.data.service';

@Component({
  selector: 'ng-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
})
export class CommentsModalComponent implements OnInit {
  public comments$: Observable<IComment[]> = this.store.select(
    'comments',
    true
  );

  public readonly dataFlags: AccountDataFlags =
    this.accountDataService.getFullState('flags');

  public form: FormGroup;

  @Input() public currentDocument: IDocument;
  @Input() public mode: TCommentsModalMode = 'default';
  @Input() private from: TCommentsFromPage = 'my-account';

  @Output('close') public _close = new EventEmitter<void>();
  @Output('add') public _add = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private accountDataService: AccountDataService,
    private merchantsItemDataService: MerchantsItemDataService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getComments();
  }

  ngOnDestroy(): void {
    this.store.updateStore({ comments: null });
    this.unsubscribeFromComments();
  }

  @TrackBy('index')
  public trackByOptions() {}

  public get isEnableAddComment() {
    const { commentAllowed, status } = this.currentDocument;

    const notDone: boolean = EnDocumentsStatus[status] !== 'Done';
    const isDefaultMode: boolean = this.mode === 'default';
    const fullCondition: boolean = commentAllowed && notDone && isDefaultMode;

    return fullCondition;
  }

  public get disabled(): boolean {
    return isDisabledForm(this.form);
  }

  public close(): void {
    this._close.emit();
  }

  public submit(): void {
    const { comment } = this.form.value;

    this._add.emit(comment);
    this.form.markAsPristine();
  }

  private initForm(): void {
    this.form = this.fb.group({
      comment: null,
    });
  }

  private getComments(): void {
    const { id: documentId } = this.currentDocument;

    switch (this.from) {
      case 'my-account':
        this.accountDataService.getComments(documentId);
        break;

      case 'merchants-item':
        this.merchantsItemDataService.getComments(documentId);
        break;
    }
  }

  private unsubscribeFromComments(): void {
    switch (this.from) {
      case 'my-account':
        this.accountDataService.unsubscribeByTypes(['get-comments']);
        break;

      case 'merchants-item':
        this.merchantsItemDataService.unsubscribeByTypes(['get-comments']);
        break;
    }
  }
}
