import { Circle, Img, makeScene2D } from '@motion-canvas/2d';
import { all, chain, createRef, sequence, waitFor, waitUntil } from '@motion-canvas/core';
import { Logo } from '../components/logo';
import { setupView } from '../constants/styles';
import { scaleShow, scaleHide, fadeHide, jumpIn, imgFlip } from '../utils/motion';
import { CC } from '../components/CC';
import { SubTitle } from '../components/SubTitle';
import { tutorialSubTitle } from '../constants/subtitles';
import hello from '../assets/image/hello.png'
import confused from '../assets/image/confused.png'

export default makeScene2D(function* (view) {
  setupView(view)
  const logoRef = createRef<Logo>();
  const subTitleRef = createRef<SubTitle>();
  const ccRef = createRef<CC>();
  const imgRef = createRef<Img>();
  view.add(<Logo ref={logoRef} />)
  view.add(<CC ref={ccRef} />)
  view.add(<SubTitle
    ref={subTitleRef}
    contents={tutorialSubTitle}
  />)

  yield chain(
    scaleShow(logoRef),
    all(
      scaleHide(logoRef),
      fadeHide(ccRef)
    )
  )
  view.add(<Img clip height={800}  ref={imgRef} src={hello} opacity={0} />)
  yield waitUntil('imgFlip', imgFlip(imgRef, confused))
  yield* waitUntil('music over', all(jumpIn(imgRef), subTitleRef().start()))
});
