import { NodeProps, Node, Layout, Img, signal, Rect } from "@motion-canvas/2d"
import { Reference, Signal, SignalValue, SimpleSignal, createSignal, makeRef, waitFor, createRefArray, all, createRef } from "@motion-canvas/core"
import { TOPMOST } from "../../constants/number"
import { fadeShow } from "../../utils/motion"

export interface ImgLayoutProps extends NodeProps {
  imgs: string[]
}

export class ImgLayout extends Node {
  @signal()
  public imgs = createSignal<string[]>([])
  public imgsRef = createRefArray<Img>()
  public layoutRef = createRef<Layout>()
  public constructor(props?: ImgLayoutProps) {
    super({ ...props })
    this.imgs(props.imgs)
    this.add(
      <Layout layout gap={10}
        width={'100%'}
        wrap={'wrap'}
        ref={this.layoutRef}
      />
    )
  }

  public *addImgs(imgs: string[], delay: number = 0.2): any {
    if (imgs.length > 0) {
      this.layoutRef().add(
        <Rect
          width={200}
          height={200}
          fill={'#fff'}
        >
          < Img
            src={imgs[0]}
            clip
            height={200}
            width={200}
            opacity={0}
            ref={this.imgsRef}
          />
        </Rect>
      )
      const newImgs = imgs.slice(1, imgs.length)
      yield* this.imgsRef[this.imgsRef.length - 1].opacity(1, delay)
      if (newImgs.length > 0) {
        yield* waitFor(delay)
        yield* this.addImgs(newImgs, delay)
      }
    }
  }
}
