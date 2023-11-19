import { test_mapNumber } from "./fp";

test('mapNumber', ()=>{
  expect(test_mapNumber(10)).toBe('100')
  expect(test_mapNumber(3)).toBe('350')
  expect(test_mapNumber(10)).not.toBe('350')
})
