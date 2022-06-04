/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import Swal from 'sweetalert';

async function showError(errorMessage: string) {
  await Swal({
    icon: 'error',
    title: 'Error',
    text: errorMessage,
  });
}

export {showError};
