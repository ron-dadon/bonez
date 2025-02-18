import { Bone, BoneSetValueFunction } from './bone'

export function useBoneSet<T>(bone: Bone<T>): BoneSetValueFunction<T> {
  return bone.setValue
}

