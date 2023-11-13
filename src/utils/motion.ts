import { Img, Node } from "@motion-canvas/2d"
import { easeOutElastic, waitFor, easeOutBounce, Reference, all, easeInCubic, easeInExpo, easeInOutBounce, easeOutExpo } from "@motion-canvas/core"

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

export function* jumpIn(ref: Reference<Node>) {
  ref().rotation(-40)
  yield* all(fadeShow(ref), ref().rotation(0, 1.2, easeOutElastic))
}

export function* jumpOut(ref: Reference<Node>) {
  ref().rotation(0)
  yield* all(fadeHide(ref), ref().rotation(0, 1.2, easeOutElastic))
}

export function* imgFlip(ref: Reference<Img>, newSrc?: string) {
  const width = ref().width()
  yield* ref().width(0, 0.3, easeOutExpo)
  if (newSrc) {
    ref().src(newSrc)
  }
  yield* ref().width(width, 0.3, easeOutExpo)
}
