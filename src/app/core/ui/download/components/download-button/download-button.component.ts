import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ng-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
