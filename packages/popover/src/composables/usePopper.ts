import { nextTick, onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue'
import type { Instance } from '@bryce-loskie/popperjs'
import {
  arrowModifier as arrow,
  createPopper,
  flipModifier as flip,
  offsetModifier as offset,
  preventOverflowModifier as preventOverflow,
} from '@bryce-loskie/popperjs'
import type { MaybeRef } from '@vueuse/core'
import type { Nullable } from '@bryce-loskie/utils'

const toInt = (x: string) => parseInt(x, 10)

type Placements =
  'auto' |
  'auto-start' |
  'auto-end' |
  'top' |
  'top-start' |
  'top-end' |
  'bottom' |
  'bottom-start' |
  'bottom-end' |
  'right' |
  'right-start' |
  'right-end' |
  'left' |
  'left-start' |
  'left-end'

interface UsePopperOptions {
  arrowPadding: MaybeRef<string>
  emit: (event: 'open:popper' | 'close:popper', ...args: any[]) => void
  locked: MaybeRef<boolean>
  offsetDistance: MaybeRef<string>
  offsetSkid: MaybeRef<string>
  placement: MaybeRef<Placements>
  popperNode: MaybeRef<HTMLElement>
  triggerNode: MaybeRef<HTMLElement>
}

const usePopper = ({
  arrowPadding,
  emit,
  locked,
  offsetDistance,
  offsetSkid,
  placement,
  popperNode,
  triggerNode,
}: UsePopperOptions) => {
  const isOpen = ref(false)
  const popperInstance = shallowRef<Nullable<Instance>>(null)

  // Enable or disable event listeners to optimize performance.
  const setPopperEventListeners = (enabled: boolean) => {
    popperInstance.value?.setOptions(options => ({
      ...options,
      modifiers: [...(options.modifiers || []), { name: 'eventListeners', enabled }],
    }))
  }

  const enablePopperEventListeners = () => setPopperEventListeners(true)
  const disablePopperEventListeners = () => setPopperEventListeners(false)

  const close = () => {
    if (!isOpen.value) return

    isOpen.value = false
    emit('close:popper')
  }

  const open = () => {
    if (isOpen.value) return

    isOpen.value = true
    emit('open:popper')
  }

  const initializePopper = async() => {
    await nextTick()
    popperInstance.value = createPopper(unref(triggerNode), unref(popperNode), {
      placement: unref(placement),
      modifiers: [
        preventOverflow,
        flip,
        {
          name: 'flip',
          enabled: !unref(locked),
        },
        arrow,
        {
          name: 'arrow',
          options: {
            padding: toInt(unref(arrowPadding)),
          },
        },
        offset,
        {
          name: 'offset',
          options: {
            offset: [toInt(unref(offsetSkid)), toInt(unref(offsetDistance))],
          },
        },
      ],
    })

    // Update its position
    popperInstance.value.update()
  }

  // When isOpen or placement change
  watch([() => isOpen.value, placement], async([isOpen]) => {
    if (isOpen) {
      await initializePopper()
      enablePopperEventListeners()
    }
    else {
      disablePopperEventListeners()
    }
  })

  onBeforeUnmount(() => {
    popperInstance.value?.destroy()
  })

  return {
    isOpen,
    popperInstance,
    open,
    close,
  }
}

export default usePopper
