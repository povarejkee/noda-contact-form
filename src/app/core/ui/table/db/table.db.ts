import { ListOption } from '@core/classes/ListOption';
import { SelectOption } from '@core/modules/form/classes/SelectOption';

export const TableDB = {
  'header-menu-options': [
    new ListOption({ title: 'Unsort', type: 'unsort' }),
    new ListOption({ title: 'Sort by ASC', type: 'sort_asc' }),
    new ListOption({ title: 'Sort by DESC', type: 'sort_desc' }),
    new ListOption({ title: 'Filter', type: 'filter' }),
    new ListOption({ title: 'Hide', type: 'hide' }),
    new ListOption({ title: 'Show columns', type: 'show_columns' }),
  ],
  'filter-compare-string-options': [
    new SelectOption('Equals', 'equals'),
    new SelectOption('Contains', 'contains'),
  ],
};
