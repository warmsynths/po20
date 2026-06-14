import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import bass from '../assets/bass.svg?raw';
import bassDrum from '../assets/bassdrum.svg?raw';
import snareDrum from '../assets/snareDrum.svg?raw';
import hiHat from '../assets/hiHat.svg?raw';
import tom from '../assets/tom.svg?raw';
import blip from '../assets/blip.svg?raw';
import hardSync from '../assets/hardsync.svg?raw';
import noiseFx from '../assets/noiseFx.svg?raw';
import arpeggio from '../assets/arpeggio.svg?raw';
import melodicArp from '../assets/melodicArp.svg?raw';
import fallingArp from '../assets/fallingArp.svg?raw';
import octaveArp from '../assets/octaveArp.svg?raw';
import lead from '../assets/lead.svg?raw';
import vibrato from '../assets/vibrato.svg?raw';
import portamento from '../assets/portamento.svg?raw';
import echo from '../assets/echo.svg?raw';
import button from '../assets/button.svg?raw';

const icons = {
  1: bass,
  2: bassDrum,
  3: snareDrum,
  4: hiHat,
  5: tom,
  6: blip,
  7: hardSync,
  8: noiseFx,
  9: arpeggio,
  10: melodicArp,
  11: fallingArp,
  12: octaveArp,
  13: lead,
  14: vibrato,
  15: portamento,
  16: echo,
  'button': button
};

export function getIconSvg(id) {
  return icons[id] || '';
}

export function getIcon(id) {
  const svgText = getIconSvg(id);
  if (!svgText) return null;
  return unsafeSVG(svgText);
}
