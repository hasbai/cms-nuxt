import {type Content} from '@/models'

export const configStore = defineStore('config', {
  state: () => {
    return {
      color: '#00796B',
    }
  },
  actions: {},
  persist: true,
})

export const mainStore = defineStore('main', () => {
  let showMenu = false
  let contents = new Array<Content>()
  return {
    showMenu,
    contents,
  }
})
