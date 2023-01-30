import { Tab } from "./Tab";

export class TabGroup {

  private _isHidden: boolean = false;
  
  private _disabledIndexList: number[] = [];

  public constructor(private _tabs: Tab[], private _activeIndex: number = -1) {
    this.init();
  }

  public get isHidden() {
    return this._isHidden;
  }

  public get disabledIndexList() {
    return this._disabledIndexList;
  }

  public get tabs(): Tab[] {
    return this._tabs;
  }

  public get activeIndex() {
    return this._activeIndex;
  }

  public set activeIndex(index: number) {
    if (this.isTabDisabled(index)) {
      return;
    }

    this._activeIndex = index;
  }

  private init() {

    this.tabs.forEach((tab: Tab, i) => {
      if(tab.isDisabled) {
        this._disabledIndexList.push(i);
      }

      if (!tab.isDisabled && this._activeIndex === -1) {
        this._activeIndex = i;
      }

      tab.index = i;
    });

    this._isHidden = this._activeIndex === -1;
  }

  public isTabDisabled(index: number) {
    return this._disabledIndexList.includes(index);
  }
}
