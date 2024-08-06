import { scaledPixels } from '../helpers/scaledPixels';

export const sizes = {
  program: {
    landscape: { width: scaledPixels(250), height: scaledPixels(200) },
    portrait: { width: scaledPixels(443), height: scaledPixels(250) },
    long: { width: scaledPixels(416), height: scaledPixels(250) },
  },
  menu: {
    open: scaledPixels(300),
    closed: scaledPixels(100),
    icon: scaledPixels(60),
  },
};
