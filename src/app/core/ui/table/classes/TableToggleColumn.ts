export class TableToggleColumn {
  constructor(
    public columnDef: string,
    public title: string,
    public active: boolean
  ) {}

  public setActiveStatus(isActive: boolean): TableToggleColumn {
    this.active = isActive;

    return this;
  }
}
