import { ImageSourcePropType } from 'react-native';

export type ProgramInfo = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  description: string;
  cast: string[] | null;
};
