function doNotAllowQuickClickOnNextPrevButton(timeBetweenTwoClick) {
  const nextButtons: any = document.querySelectorAll('.gaia-ui-listtable-pagercomponent-next');
  const prevButtons: any = document.querySelectorAll('.gaia-ui-listtable-pagercomponent-prev');
  [prevButtons, nextButtons].forEach((buttons) => {
    disableButtons(buttons, timeBetweenTwoClick);
  });
}

function disableButtons(buttons, timeBetweenTwoClick) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      button.disabled = true;

      setTimeout(() => {
        button.disabled = false;
      }, timeBetweenTwoClick);
    });
  });
}

export {doNotAllowQuickClickOnNextPrevButton};
