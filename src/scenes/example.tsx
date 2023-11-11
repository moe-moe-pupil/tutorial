import { Circle, makeScene2D } from '@motion-canvas/2d';
import { all, chain, createRef, sequence, waitFor, waitUntil } from '@motion-canvas/core';
import { Logo } from '../components/logo';
import { setupView } from '../constants/styles';
import { scaleShow, scaleHide, fadeHide } from '../utils/motion';
import { CC } from '../components/CC';
import { SubTitle } from '../components/SubTitle';
import { tutorialSubTitle } from '../constants/subtitles';

export default makeScene2D(function* (view) {
  setupView(view)

  const logoRef = createRef<Logo>();
  const subTitleRef = createRef<SubTitle>();
  const ccRef = createRef<CC>();
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
  yield* waitUntil('music over', subTitleRef().start())
});
