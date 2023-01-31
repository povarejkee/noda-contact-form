import { Attribute, Component, Input } from '@angular/core';
import { TContactIcon } from '@core/modules/components/components/contact-button/contact-icon.type';

@Component({
  selector: 'ng-contact-button',
  templateUrl: './contact-button.component.html',
  styleUrls: ['./contact-button.component.scss'],
})
export class ContactButtonComponent {
  @Input() public text: string[] = ['text', 'bold'];

  constructor(
    @Attribute('icon') public icon: TContactIcon,
    @Attribute('href') public href: string
  ) {}
}
