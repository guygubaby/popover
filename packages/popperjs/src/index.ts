import { createPopper } from '@popperjs/core/lib/popper-lite'
import offsetModifier from '@popperjs/core/lib/modifiers/offset'
import type { Instance, Placement } from '@popperjs/core'
import preventOverflowModifier from '@popperjs/core/lib/modifiers/preventOverflow.js'
import flipModifier from '@popperjs/core/lib/modifiers/flip.js'
import arrowModifier from '@popperjs/core/lib/modifiers/arrow'

export { createPopper, offsetModifier, preventOverflowModifier, flipModifier, arrowModifier }
export type { Instance, Placement }
