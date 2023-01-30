import { ToastrType } from './toastr.types';

export class ToastrModel {
  constructor(
    public message: string,
    public title: string,
    public type: ToastrType
  ) {}
}
