/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {Dropdown} from '@kintone/kintone-ui-component/esm/js';
import {PluginSettingsType} from '../../type';

function checkUniqueDropdownField(fieldsTextDropdown: Dropdown[], element: Dropdown, pluginSettings: PluginSettingsType) {
  const elementValue = element.getValue();
  const elementIndex = fieldsTextDropdown.indexOf(element);

  const allDropdownItems: any[] = pluginSettings.allOptionsOfFieldText;
  const selectedDropdownValues: string[] = fieldsTextDropdown.reduce((finalArr: any[], dropdown: Dropdown) => {
    if (dropdown.getValue() !== '') {
      finalArr.push(dropdown.getValue());
    }
    return finalArr;
  }, []);
  const restItems = allDropdownItems.filter(({value: itemValue}) => !selectedDropdownValues.some((dropdownValue) => dropdownValue === itemValue));
  fieldsTextDropdown.forEach((dropdown, index) => {
    if (dropdown.getValue() === elementValue && index !== elementIndex) {
      dropdown.setValue('');
    }
    const isDropdownValueExistsInRestItems = restItems.some((item) => item.value === dropdown.getValue());
    if (isDropdownValueExistsInRestItems) {
      dropdown.setItems(restItems);
    } else {
      const labelOfDropdown: HTMLElement | null = dropdown.render().querySelector('.kuc-dropdown-selected-label');
      const currentValue = {
        label: labelOfDropdown?.innerText,
        value: dropdown.getValue(),
      };
      const newItems = [...restItems, currentValue];
      dropdown.setItems(newItems);
    }
  });

  const allDropdownValues = fieldsTextDropdown.filter((dropdown) => dropdown.getValue() !== '');

  if (allDropdownValues.length === fieldsTextDropdown.length) {
    fieldsTextDropdown.forEach((dropdown) => dropdown.setItems(pluginSettings.allOptionsOfFieldText));
  }
}

export {checkUniqueDropdownField};
