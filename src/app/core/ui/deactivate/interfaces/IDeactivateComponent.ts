export interface IDeactivateComponent {
  canDeactivate: () => Promise<boolean>;
}
