import { SPEAKINGSPEED_EN, SPEAKINGSPEED_PUNC, SPEAKINGSPEED_ZH } from "../constants/number"
import { calcSubtitleSpeed } from "./speakingFactor"

test('calcSubtitleSpeed', () => {
  expect(calcSubtitleSpeed("w")).toBe(1 / SPEAKINGSPEED_EN)
  expect(calcSubtitleSpeed("hello, world")).toBe(10 / SPEAKINGSPEED_EN + 1 / SPEAKINGSPEED_PUNC)
  expect(calcSubtitleSpeed('你好啊，我是萌苏恩')).toBe(8 / SPEAKINGSPEED_ZH + 1 / SPEAKINGSPEED_PUNC)
  expect(calcSubtitleSpeed('你好，world')).toBe(2 / SPEAKINGSPEED_ZH + 1 / SPEAKINGSPEED_PUNC + 5 / SPEAKINGSPEED_EN)
})
