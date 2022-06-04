function disableFieldsInStatusHistoryTable(config, record) {
  record[config.tableDropdown].value.forEach((item) => {
    if (config.dateTimeDropdown) {
      setDisabledField(item, config.dateTimeDropdown);
    }
    if (config.userSelectionDropdown) {
      setDisabledField(item, config.userSelectionDropdown);
    }
    if (config.statusBeforeDropdown) {
      setDisabledField(item, config.statusBeforeDropdown);
    }
    if (config.statusAfterDropdown) {
      setDisabledField(item, config.statusAfterDropdown);
    }
    if (config.actionNameDropdown) {
      setDisabledField(item, config.actionNameDropdown);
    }
  });
}

function setDisabledField(item, fieldName) {
  item.value[fieldName].disabled = true;
}
export {disableFieldsInStatusHistoryTable};