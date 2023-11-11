import { Node } from "@motion-canvas/2d"
import { easeOutElastic, waitFor, easeOutBounce, Reference } from "@motion-canvas/core"

export function* scaleShow(ref: Reference<Node>) {
  ref().scale(0)
  yield* ref().scale(1, 0.6, easeOutElastic)
  yield* waitFor(0.2)
}

export function* scaleHide(ref: Reference<Node>) {
  ref().scale(1)
  yield* ref().scale(0, 0.4, easeOutBounce)
}

export function* fadeShow(ref: Reference<Node>) {
  ref().opacity(0)
  yield* ref().opacity(1, 0.6)
  yield* waitFor(0.2)
}

export function* fadeHide(ref: Reference<Node>) {
  ref().opacity(1)
  yield* ref().opacity(0, 0.4)
}
