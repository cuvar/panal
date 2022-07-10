export function getCurrentScreenSize() {
  const currentScreenSize = window.innerWidth < 768 ? 'sm' : window.innerWidth < 1024 ? 'md' : 'lg';
  return currentScreenSize;
}
