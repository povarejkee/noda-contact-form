import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AppViewService } from './services/app.view.service';

@UntilDestroy()
@Component({
  selector: 'noda-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private viewService: AppViewService
  ) {}

  ngOnInit(): void {
    this.setCurrentPage();
  }

  public get currentPage(): string {
    return this.viewService.getState('state', 'currentPage');
  }

  private setCurrentPage(): void {
    this.route.fragment
      .pipe(untilDestroyed(this))
      .subscribe((fragment: string) => {
        this.viewService.setState('state', 'currentPage', fragment);
      });
  }
}
