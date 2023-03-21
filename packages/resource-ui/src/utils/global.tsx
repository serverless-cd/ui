const C = {
  CUSTOM_DEBIAN9: 'custom',
  CUSTOM_DEBIAN10: 'custom.debian10',
};

export function getCustomRuntime(webRuntime = '') {
  if (webRuntime?.includes('debian10')) {
    return C.CUSTOM_DEBIAN10;
  } else {
    return C.CUSTOM_DEBIAN9;
  }
}
