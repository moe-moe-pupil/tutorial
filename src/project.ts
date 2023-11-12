import { makeProject } from '@motion-canvas/core';

import example from './scenes/example?scene';
import audio from './assets/bgm/CarefreebyDeKobe.mp3'

export default makeProject({
  scenes: [example],
  audio
});
