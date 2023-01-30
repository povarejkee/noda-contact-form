export interface INotification<
  ActionType extends string = string,
  Payload extends object = null
> {
  type: ActionType;
  payload: Payload;
}
