import { useEffect, useState } from 'react'
import { Bone } from './bone'

export function useBoneValue<T>(bone: Bone<T>): T {
  const [state, setState] = useState<T>(bone.getValue())

  useEffect(() => {
    return bone.watch(setState)
  }, [bone])

  return state
}
