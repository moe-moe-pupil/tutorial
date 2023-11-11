import { NodeProps, Node, Txt } from "@motion-canvas/2d"
import { createRef, createSignal, startPlayback, waitFor, waitUntil } from "@motion-canvas/core"

export interface SubTitleContentProps {
  text: string, duration: number
}
export interface SubTitleProps extends NodeProps {
  contents?: SubTitleContentProps[]
}

export class SubTitle extends Node {
  txtRef = createRef<Txt>()
  idx = createSignal(0)
  contents: SubTitleContentProps[] = [
    { text: "placeholder", duration: 1 }
  ]
  public constructor(props?: SubTitleProps) {
    super({ ...props })
    this.contents = props.contents ?? this.contents
    this.add(
      <Txt
        ref={this.txtRef}
        fill={'#fff'}
        y={450}
        fontWeight={600}
        fontSize={60}
        textAlign={'center'}
        text={''}
      />
    )
  }

  public *start(): any {
    this.txtRef().text(this.contents[this.idx()].text)
    yield* waitFor(this.contents[this.idx()].duration)
    if (this.idx() < this.contents.length - 1) {
      this.idx(this.idx() + 1)
      yield* this.start()
    }
  }
}
