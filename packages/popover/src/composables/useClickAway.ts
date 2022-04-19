import { unref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import { useEventListener } from '@vueuse/core'

export default function useClickAway(target: MaybeRef<HTMLElement>, handler: (event: Event) => void) {
  const event = 'pointerdown'

  if (typeof window === 'undefined' || !window) return

  const listener = (event: Event) => {
    const el = unref(target)
    if (!el) return

    if (el === event.target || event.composedPath().includes(el)) return

    handler(event)
  }

  return useEventListener(window, event, listener)
}
