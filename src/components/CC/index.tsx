import { NodeProps, Node, Img } from "@motion-canvas/2d"
import { createRef } from "@motion-canvas/core"
import ccImg from '../../assets/image/CC_BY.svg'

export interface CCProps extends NodeProps {

}

export class CC extends Node {
  private imgRef = createRef<Img>()
  public constructor(props?: CCProps) {
    super({ ...props })
    this.add(
      <Img ref={this.imgRef} scale={6} src={ccImg} offset={[-1, -1]} x={450} y={360} />
    )
  }
}
