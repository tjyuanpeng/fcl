export const TOKEN = 'F_STEPS2_CONTEXT'

export interface ProvideObject {
  props: {
    current: number
  }
  handleItemClick: (index: number) => void
  addStep: (uid: number, setIndex: (index: number) => void) => void
  removeStep: (uid: number) => void
}
