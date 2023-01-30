import { Component, Input } from '@angular/core';

import { IComment } from '@page/account/types/account.types';

@Component({
  selector: 'ng-comments-item',
  templateUrl: './comments-item.component.html',
  styleUrls: ['./comments-item.component.scss'],
})
export class CommentsItemComponent {
  @Input() public comment: IComment;
  @Input() public isLast: boolean;
}
