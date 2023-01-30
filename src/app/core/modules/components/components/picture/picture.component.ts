import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ng-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureComponent {
  @Input('url') public url: string = null;
  @Input('from') public from: 'assets' | 'any' = 'assets';
  @Input('fit') public fit: 'cover' | 'contain' = 'cover';
  @Input('upload') public upload: boolean = false;
  @Input('alt') public alt: string = 'picture';
}
