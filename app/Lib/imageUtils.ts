import {Image} from 'react-native';

export function getImageDimensions(
  url: string,
): Promise<{width: number; height: number}> {
  return new Promise(resolve => {
    Image.getSize(
      url,
      (width, height) => {
        resolve({width, height});
      },
      () => {
        resolve({width: 0, height: 0});
      },
    );
  });
}
