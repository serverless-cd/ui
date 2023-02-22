export { default as i18n } from './i18n';

const createFakeElement = (value) => {
  const fakeElement = document.createElement('textarea');

  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0';

  fakeElement.style.position = 'absolute';
  fakeElement.style.left = '-999px';
  fakeElement.style.top = `${window.pageYOffset || document.documentElement.scrollTop}px`;
  fakeElement.setAttribute('readonly', '');
  fakeElement.value = value;
  return fakeElement;
};

export const copyText = (value) => {
  const element = createFakeElement(value);
  document.body.appendChild(element);
  element.focus();
  element.select();
  element.setSelectionRange(0, element.value.length);

  document.execCommand('copy');
  document.body.removeChild(element);
};
