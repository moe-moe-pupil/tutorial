import { Img, makeScene2D } from '@motion-canvas/2d';
import { all, chain, createRef, waitUntil } from '@motion-canvas/core';
import { Logo } from '../components/logo';
import { setupView } from '../constants/styles';
import { scaleShow, scaleHide, fadeHide, jumpIn, imgFlip, fadeShow } from '../utils/motion';
import { CC } from '../components/CC';
import { SubTitle } from '../components/SubTitle';
import { tutorialSubTitle } from '../constants/subtitles';
import hello from '../assets/image/hello.png'
import confused from '../assets/image/confused.png'
import { ImgLayout } from '../components/ImgLayout';
import { GAMEENGINEIMGS } from '../constants/gameEngineImgs';

export default makeScene2D(function* (view) {
  setupView(view)
  const logoRef = createRef<Logo>();
  const subTitleRef = createRef<SubTitle>();
  const ccRef = createRef<CC>();
  const imgRef = createRef<Img>();
  const gameEngineImgsRef = createRef<ImgLayout>();
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
  view.add(<Img clip height={800} ref={imgRef} src={hello} opacity={0} />)
  view.add(<ImgLayout imgs={[]} ref={gameEngineImgsRef} />)
  yield waitUntil('imgFlip', imgFlip(imgRef, confused))
  yield waitUntil('gameEngineImgs', all(fadeHide(imgRef), gameEngineImgsRef().addImgs(GAMEENGINEIMGS, 0.1)))
  yield* waitUntil('music over', all(jumpIn(imgRef), subTitleRef().start()))
});
