/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {CONFIG_CLASS_NAME} from '../constants';
import I18N from '../../../language';
import '../index.css';
import {ItemData} from '@kintone/kintone-ui-component/esm/js/MultipleChoice/Item';
import {CONDITION, DEFAULT_OPTION, FIELD_TYPE, ROOT_CONTENT, VIEW_ALL, VIEW_ALL_FIELDS} from '../../constant';
import {dropdowns, PropertyObject} from '../type';
import {createContainerDropdown, createLabel, createSelectMultiViews} from '../../components';
import {Dropdown, MultipleChoice} from '@kintone/kintone-ui-component/esm/js';

class PluginSettings {
  body: HTMLElement | null;
  elements: Record<string, HTMLElement> = {};
  subtableDropdown: Dropdown;
  viewsMultiChoice: MultipleChoice;
  dropdowns: dropdowns;
  subtableFields: any = [];
  fieldsWithinTable: any = [];
  allOptionsOfFieldText: any;
  views: any;
  form: any;

  constructor() {
    this.body = document.getElementById(ROOT_CONTENT);
  }

  async initUi(getViews, getForm) {
    this.views = getViews;
    this.form = getForm;
    this.createPluginSettingElements();
    this.appendElementsToBody();
    await this.setOptionsForMultiSelectViews();
    await this.setOptionsForDropdownSubtableField();
  }

  createPluginSettingElements(): void {
    const labelPluginName = createLabel(I18N.LABEL_PLUGIN_NAME, CONFIG_CLASS_NAME.LABEL_PLUGIN_NAME);

    const {div: multiSelectViewsElement, multiSelect: multiSelectViews} = createSelectMultiViews();

    const labelStatusHistoryTable = createLabel(I18N.LABEL_STATUS_HISTORY_TABLE, CONFIG_CLASS_NAME.LABEL_STATUS_HISTORY_TABLE);
    const subLabelStatusHistoryTable = createLabel(I18N.CAPTION_STATUS_HISTORY_TABLE, CONFIG_CLASS_NAME.CAPTION_STATUS_HISTORY_TABLE);
    const {div: containerTableDropdown, dropDown: tableDropdown} = createContainerDropdown(I18N.LABEL_TABLE);
    const {div: containerDateTimeDropdown, dropDown: dateTimeDropdown} = createContainerDropdown(I18N.LABEL_DATE_AND_TIME);
    const {div: containerUserSelectionDropdown, dropDown: userSelectionDropdown} = createContainerDropdown(I18N.LABEL_USER_SELECTION);
    const {div: containerStatusBeforeDropdown, dropDown: statusBeforeDropdown} = createContainerDropdown(I18N.LABEL_STATUS_BEFORE);
    const {div: containerStatusAfterDropdown, dropDown: statusAfterDropdown} = createContainerDropdown(I18N.LABEL_STATUS_AFTER);
    const {div: containerActionNameDropdown, dropDown: actionNameDropdown} = createContainerDropdown(I18N.LABEL_ACTION_NAME);

    this.elements = {
      labelPluginName,
      multiSelectViewsElement,
      labelStatusHistoryTable,
      subLabelStatusHistoryTable,
      containerTableDropdown,
      containerDateTimeDropdown,
      containerUserSelectionDropdown,
      containerStatusBeforeDropdown,
      containerStatusAfterDropdown,
      containerActionNameDropdown,
    };
    this.subtableDropdown = tableDropdown;
    this.viewsMultiChoice = multiSelectViews;
    this.dropdowns = {
      dateTimeDropdown,
      userSelectionDropdown,
      statusBeforeDropdown,
      statusAfterDropdown,
      actionNameDropdown,
    };
  }

  appendElementsToBody() {
    for (const key in this.elements) {
      this.body?.appendChild(this.elements[key]);
    }
  }

  async setOptionsForMultiSelectViews() {
    const {views} = this.views;
    const multiChoiceItems: ItemData[] = [];
    for (const key in views) {
      if (views[key].type === 'LIST') {
        multiChoiceItems.push({
          value: views[key].id,
          label: views[key].name,
        });
      }
    }
    multiChoiceItems.push(VIEW_ALL);
    multiChoiceItems.push(VIEW_ALL_FIELDS);
    this.viewsMultiChoice.setItems(multiChoiceItems);
    this.viewsMultiChoice.setValue([VIEW_ALL.value]);
  }

  async setOptionsForDropdownSubtableField() {
    const {properties} = this.form;
    const subTableFields: PropertyObject[] = properties.filter((prop: PropertyObject) => prop.type === CONDITION.TYPE_SUBTABLE);
    const dropdownItems = subTableFields.map((subTableField) => {
      return {
        label: `${subTableField.label} (${subTableField.code})`,
        value: subTableField.code,
      };
    });
    dropdownItems.unshift(DEFAULT_OPTION);
    this.subtableFields = subTableFields;
    this.subtableDropdown.setItems(dropdownItems);
    this.subtableDropdown.setValue('');
  }

  setOptionsForDropdownDatetimeField() {
    const fieldsDateTime = this.getFieldsWithinTableByType(FIELD_TYPE.DATETIME);
    fieldsDateTime.unshift(DEFAULT_OPTION);
    this.dropdowns.dateTimeDropdown.setItems(fieldsDateTime);
  }

  setOptionsForDropdownUserSelectionField() {
    const fieldsUserSelection = this.getFieldsWithinTableByType(FIELD_TYPE.USER_SELECT);
    fieldsUserSelection.unshift(DEFAULT_OPTION);
    this.dropdowns.userSelectionDropdown.setItems(fieldsUserSelection);
  }

  setOptionsForDropdownTextField() {
    const fieldsText = this.getFieldsWithinTableByType(FIELD_TYPE.SINGLE_LINE_TEXT);
    fieldsText.unshift(DEFAULT_OPTION);
    [this.dropdowns.statusBeforeDropdown, this.dropdowns.statusAfterDropdown, this.dropdowns.actionNameDropdown].forEach((dropdown) =>
      dropdown.setItems(fieldsText)
    );
    this.allOptionsOfFieldText = fieldsText;
  }

  setEnableListDropdown(listdropdown: Record<string, Dropdown>, isEnable: boolean = true) {
    for (const key in listdropdown) {
      isEnable ? listdropdown[key].enable() : listdropdown[key].disable();
    }
  }

  getFieldsWithinTableByType(type: string) {
    return this.fieldsWithinTable
      .filter((field: PropertyObject) => field.type === type)
      .map((field: PropertyObject) => {
        return {
          label: `${field.label} (${field.code})`,
          value: field.code,
        };
      });
  }
}
export {PluginSettings};
