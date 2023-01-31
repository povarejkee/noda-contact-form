import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() public url: string = null;
  @Input() public theme: 'purple' | 'white' = 'white';

  constructor(private router: Router) {}

  public navigate(): void {
    this.router.navigateByUrl(this.url);
  }
}
