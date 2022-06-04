/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {Button, Dropdown, Label, MultipleChoice} from '@kintone/kintone-ui-component/esm/js';
import {CONFIG_CLASS_NAME} from '../../config/constants';
import I18N from '../../../language';

function createLabel(text: string, className: string): HTMLElement {
  const label = new Label({text});
  const labelElm = label.render();
  labelElm.className = className;
  return labelElm;
}

function createButton(text: string, className: string): Button {
  const button = new Button({text});
  const buttonElm = button.render();
  buttonElm.className = className;
  return button;
}

function createDiv(className: string): HTMLElement {
  const div = document.createElement('div');
  div.className = className;
  return div;
}

function createDropDown(className: string) {
  const dropdown = new Dropdown({});
  const dropdownElm = dropdown.render();
  dropdownElm.className = className;
  return dropdown;
}

function createContainerDropdown(labelText: string) {
  const div = createDiv(CONFIG_CLASS_NAME.CONTAINER_DROPDOWN);
  const label = createLabel(labelText, CONFIG_CLASS_NAME.LABEL_DROPDOWN);
  const dropDown = createDropDown('');
  [label, dropDown.render()].forEach((element) => div.appendChild(element));
  return {div, dropDown};
}

function createSelectMultiViews() {
  const div = createDiv(CONFIG_CLASS_NAME.CONTAINER_MULTI_VIEWS);
  const labelMultiSelectViews = createLabel(I18N.LABEL_MULTI_SELECT_VIEWS, CONFIG_CLASS_NAME.LABEL_MULTI_SELECT_VIEWS);
  const multiSelect = new MultipleChoice({});
  div.appendChild(labelMultiSelectViews);
  div.appendChild(multiSelect.render());
  return {div, multiSelect};
}

export {createLabel, createButton, createDiv, createDropDown, createContainerDropdown, createSelectMultiViews};
