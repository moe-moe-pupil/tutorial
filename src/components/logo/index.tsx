import { Circle, Img, NodeProps, Path, Rect, Txt } from "@motion-canvas/2d";
import { Node } from "@motion-canvas/2d";
import { Vector2, all, createRef, createSignal, easeInCirc, easeInOutCubic, easeInOutQuint, easeOutBounce, easeOutElastic, waitFor } from "@motion-canvas/core";
import { TOPMOST } from "../../constants/number";
import { Colors, WhiteLabel } from "../../constants/styles";
import moethun from "../../assets/image/moethun.png"
import { FadeText } from "../FadeText";

export interface LogoProps extends NodeProps {

}

export class Logo extends Node {
  private logoContainerRef = createRef<Rect>();
  private fadeTextRef = createRef<FadeText>();
  private pathRef = createRef<Path>();
  private logoScale = createSignal(1);
  private radius = createSignal(625 * this.logoScale());

  public constructor(props?: LogoProps) {
    super({ ...props })
    this.add(
      <Rect ref={this.logoContainerRef} scale={1} y={0} zIndex={TOPMOST} >
        <Img src={moethun} scale={2 * this.logoScale()} radius={360} zIndex={TOPMOST} />
      </Rect>
    )
  }
  public *show() {
    this.logoContainerRef().scale(0)
    yield* this.logoContainerRef().scale(1, 0.6, easeOutElastic)
    yield* waitFor(0.2)
  }

  public *hide() {
    yield* this.logoContainerRef().scale(1)
    yield* this.logoContainerRef().scale(0, 0.4, easeOutBounce)
  }

  public *animateToCorner() {
    yield* all(
      this.logoContainerRef().scale(0.2, 0.6, easeInOutCubic),
      this.logoContainerRef().opacity(0.5, 0.6),
      this.logoContainerRef().position([875, 455], 0.6, easeInOutQuint, Vector2.arcLerp),
      this.logoContainerRef().size(
        [1920 - 160, 1080 - 160],
        0.6,
        easeInOutCubic,
        Vector2.polarLerp,
      ),
    )
  }

  public *animateToCenter() {
    yield* all(
      this.logoContainerRef().scale(1, 0.6, easeInOutCubic),
      this.logoContainerRef().opacity(1, 0.6),
      this.logoContainerRef().position(0, 0.6, easeInOutQuint, Vector2.arcLerp),
      this.logoContainerRef().size(
        [1920 - 160, 1080 - 160],
        0.6,
        easeInOutCubic,
        Vector2.polarLerp,
      ),
    )
  }
}