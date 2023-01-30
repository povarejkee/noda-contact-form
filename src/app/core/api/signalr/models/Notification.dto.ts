import { INotification } from '../interfaces/INotification';

export class NotificationDto<A extends string = string, P extends object = null>
  implements INotification<A, P>
{
  constructor(public type: A, public payload: P = null) {}
}
