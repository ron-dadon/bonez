import { Bone, BoneSetValueFunction } from './bone'
import { useBoneSet, useBoneValue } from './index'

export function useBone<T>(bone: Bone<T>): [T, BoneSetValueFunction<T>] {
  const state = useBoneValue(bone)
  const setState = useBoneSet(bone)

  return [state, setState]
}
