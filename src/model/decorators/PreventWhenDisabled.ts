/**
 * Prevents a class method from executing when the class instance
 * has a `disabled` property that is set to `true`.
 */
export function PreventWhenDisabled(_: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  function replacementMethod(this: any, ...args: any[]) {
    if (!this.disabled) return originalMethod.apply(this, args)
    console.log(`${this.title}:${propertyKey} is disabled and will not execute.`)
  }
  descriptor.value = replacementMethod
  return descriptor
}
