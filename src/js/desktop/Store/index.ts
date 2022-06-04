/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
class Store {
  recordsSelected: HTMLInputElement[];
  checkBoxSelectAll: HTMLInputElement[];
  checkBoxRecords: HTMLInputElement[];
  recordsUnSelected: HTMLInputElement[];
  allRecords: any[];

  constructor() {
    this.checkBoxSelectAll = [];
    this.checkBoxRecords = [];
    this.recordsSelected = [];
    this.recordsUnSelected = [];
    this.allRecords = [];
  }

  setAllRecords(records) {
    this.allRecords = [...records];
  }

  setNewStoreRecordsUnSelected(newValue) {
    this.recordsUnSelected = [...newValue];
  }

  addNewItemToStoreRecordsUnSelected(newItem) {
    this.recordsUnSelected = [...this.recordsUnSelected, newItem];
  }

  setNewStoreRecordsSelected(newValue) {
    this.recordsSelected = [...newValue];
  }

  addNewItemToStoreRecordsSelected(newItem) {
    this.recordsSelected = [...this.recordsSelected, newItem];
  }

  setNewStoreCheckBoxSelectAll(newValue) {
    this.checkBoxSelectAll = [...newValue];
  }

  addNewItemToStoreCheckBoxSelectAll(newItem) {
    this.checkBoxSelectAll = [...this.checkBoxSelectAll, newItem];
  }

  setNewStoreCheckBoxRecords(newValue) {
    this.checkBoxRecords = [...newValue];
  }

  addNewItemToStoreCheckBoxRecords(newItem) {
    this.checkBoxRecords = [...this.checkBoxRecords, newItem];
  }
}

export default Store;
