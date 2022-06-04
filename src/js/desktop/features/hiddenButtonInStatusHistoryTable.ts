import {appService} from '../../service';

async function hiddenButtonInStatusHistoryTable(config) {
  const responseFormLayout = await appService.getFormLayout();
  const tableFieldIndex = responseFormLayout.layout
    .filter((item) => item.type === 'SUBTABLE')
    .findIndex((item) => item.code === config.tableDropdown);
  const tableDom = document.querySelectorAll('.subtable-row-gaia')[tableFieldIndex];
  tableDom
    .querySelectorAll('.add-row-image-gaia')
    .forEach((element: HTMLElement) => element.classList.toggle('hidden-icon-add-remove-row-in-table'));
  tableDom
    .querySelectorAll('.remove-row-image-gaia')
    .forEach((element: HTMLElement) => element.classList.toggle('hidden-icon-add-remove-row-in-table'));
}

export {hiddenButtonInStatusHistoryTable};
