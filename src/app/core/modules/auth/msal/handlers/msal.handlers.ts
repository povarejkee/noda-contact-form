export function isIE(): boolean {
  return Boolean(
    ~window.navigator.userAgent.indexOf('MSIE') ||
      ~window.navigator.userAgent.indexOf('Trident/')
  );
}
