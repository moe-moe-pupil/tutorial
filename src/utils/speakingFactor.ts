import * as O from 'fp-ts/Option'
import { ap } from 'fp-ts/lib/Apply'
import { Monoid } from 'fp-ts/lib/Monoid'
import { flow, pipe } from 'fp-ts/lib/function'
import { SPEAKINGSPEED_EN, SPEAKINGSPEED_PUNC, SPEAKINGSPEED_ZH } from '../constants/number'

type SupportedLanguages = 'ZH' | 'EN'

const getZHChars = (s: string) => s.match(/[!\u4E00-\u9FA5]/g)
const getENChars = (s: string) => s.match(/[a-zA-Z]/g)
const getPuncMarkChars = (s: string) => s.match(/[,，]/g)

export const monoidAdd: Monoid<number> = {
  concat: (x, y) => x + y,
  empty: 0,
}

const getPuncMarkTime = flow(
  getPuncMarkChars,
  O.fromNullable,
  O.match(
    () => 0,
    s => s.length / SPEAKINGSPEED_PUNC
  )
)

const getZHTime = flow(
  getZHChars,
  O.fromNullable,
  O.match(
    () => 0,
    s => s.length / SPEAKINGSPEED_ZH
  )
)

const getENTime = flow(
  getENChars,
  O.fromNullable,
  O.match(
    () => 0,
    s => s.length / SPEAKINGSPEED_EN
  )
)

export const calcSubtitleSpeed = (s: string) => getPuncMarkTime(s) + getZHTime(s) + getENTime(s)