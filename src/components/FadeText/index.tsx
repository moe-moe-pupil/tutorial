import { Node, Line, Txt, makeScene2D, Rect, blur, Img, saturate, brightness, NodeProps } from "@motion-canvas/2d";
import { createRef, createSignal, easeInOutCubic, waitFor } from "@motion-canvas/core";

export interface FadeTextProps extends NodeProps {
    text: string,
    fontSize: number
}

export class FadeText extends Node {
    lineRef = createRef<Line>();

    titleEndProgress = createSignal(0)
    titleStartProgress = createSignal(0)
    titleNode = createRef<Node>();

    public constructor(props?: FadeTextProps) {
        super({ ...props })
        this.add(
            <Node cache>
                <Txt zIndex={props.zIndex} fontSize={props.fontSize} fontWeight={800} text={props.text} x={0} y={280} fill={"#8f00ff"} lineHeight={props.fontSize}  textAlign={"center"} />
                <Node ref={this.titleNode} cache compositeOperation={"source-out"} >
                    {/* <Line ref={this.lineRef} start={this.titleStartProgress} end={this.titleEndProgress} points={TitleLinePoints[0] as any} y={40} stroke={"white"} lineWidth={246} /> */}
                </Node>
            </Node>
        )
    }

    public *fade() {

        this.lineRef().compositeOperation("source-in")
        yield this.titleEndProgress(1, 1, easeInOutCubic)
        yield* waitFor(.3)

        this.lineRef().compositeOperation("source-out")
        yield* waitFor(.8)

        yield* this.titleStartProgress(1, 1)
        yield* waitFor(0.5)
    }
}
