export interface Bone<T> {
  boneId: string,
  getValue: BoneGetValueFunction<T>,
  setValue: BoneSetValueFunction<T>,
  watch: BoneWatchFunction<T>,
  unwatch: BoneUnwatchFunction<T>
}

export interface BoneFactoryOptions<T> {
  compare: BoneCompareFunction<T>
}

export type BoneGetValueFunction<T> = () => T
export type BoneSetValueFunction<T> = (newValue: T) => void
export type BoneWatchFunction<T> = (watchCallback: BoneWatchCallback<T>) => () => void
export type BoneUnwatchFunction<T> = (watchCallback: BoneWatchCallback<T>) => void

export type BoneWatchCallback<T> = (newValue: T) => void
export type BoneCompareFunction<T> = (value:T, newValue: T) => boolean

function defaultCompareFunction<T>(value: T, newValue: T) {
  return value === newValue
}

export function bone<T>(initialValue: T, options?: BoneFactoryOptions<T>): Bone<T> {
  let value: T = initialValue
  const boneId = crypto.randomUUID()
  const watchers = new Map<BoneWatchCallback<T>,BoneWatchCallback<T>>()

  const getValue: BoneGetValueFunction<T> = function getValue()  {
    return value
  }

  const setValue: BoneSetValueFunction<T> = function setValue(newValue)  {
    const compareFn = options?.compare || defaultCompareFunction<T>
    if (compareFn(value, newValue)) return
    value = newValue
    watchers.forEach((watcher) => watcher(newValue))
  }

  const watch: BoneWatchFunction<T> = function watch(watchCallback){
    watchers.set(watchCallback, watchCallback)
    return () => watchers.delete(watchCallback)
  }

  const unwatch: BoneUnwatchFunction<T> = function unwatch(watchCallback){
    watchers.delete(watchCallback)
  }

  return { boneId, getValue, setValue, watch, unwatch }
}
