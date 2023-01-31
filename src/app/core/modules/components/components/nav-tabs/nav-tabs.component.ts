import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TrackBy } from '@core/decorators/decorators';
import { IOption } from '@core/interfaces/IOption';
import { WINDOW, WindowDocument } from '@core/injection/app.tokens';

@Component({
  selector: 'ng-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss'],
})
export class NavTabsComponent {
  @Input() public readonly options: IOption<['title', 'url']>[];
  @Input() public disabled: boolean = false;

  constructor(
    @Inject(WINDOW) private window: WindowDocument,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  @TrackBy('property', 'id')
  public trackByNav() {}

  public navigateTo(url: string): void {
    this.router.navigate([url], {
      relativeTo: this.activatedRoute,
    });
  }

  public isActiveUrl(path: string) {
    const url: URL = new URL(this.window.location.href);
    return url.pathname.endsWith(path);
  }
}
