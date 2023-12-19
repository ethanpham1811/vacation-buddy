/* join conditional styling classes */
export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
