import { ListOption } from '@core/classes/ListOption';
import { SelectOption } from '@core/modules/form/classes/SelectOption';

import { TFormControl } from '@core/modules/form/types/form.types';

export type TContactFormControl = ListOption<
  null,
  {
    type: TFormControl;
    label: string;
    required: boolean;
    controlName: string;
    placeholder?: string;
    mask?: string;
    options?: SelectOption[];
  }
>;
