export * from './general'
export * from './profile'
export * from './file'
export * from './my-class'

import { useGeneralStore } from './general'
import { useProfileStore } from './profile'
import { useFileStore } from './file'
import { useMyClassStore } from './my-class'

export type Stores = ReturnType<typeof useStores>

export function useStores() {
  return {
    general: useGeneralStore(),
    profile: useProfileStore(),
    file: useFileStore(),
    myClass: useMyClassStore()
  }
}
