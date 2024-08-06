/* eslint-disable @typescript-eslint/no-var-requires */
const Movie1 = require('../assets/movie1.png');
const Movie2 = require('../assets/movie2.png');
const Movie3 = require('../assets/movie3.png');
const Movie4 = require('../assets/movie4.png');
const Movie5 = require('../assets/movie5.png');
const Movie6 = require('../assets/movie6.png');
const Movie7 = require('../assets/movie7.png');
const Movie8 = require('../assets/movie8.png');
const Movie9 = require('../assets/movie9.png');
const Movie10 = require('../assets/movie10.png');
const Movie11 = require('../assets/movie11.png');
const Movie12 = require('../assets/movie12.png');
import { ProgramInfo } from '../domain/programInfo';

export const programInfos: ProgramInfo[] = [
  {
    id: '1',
    title: 'Movie 1',
    image: Movie1,
    description: 'Movie 1 description',
    cast: null,
  },
  {
    id: '2',
    title: 'Movie 2',
    image: Movie2,
    description: 'Movie 2 description',
    cast: ['Giovanni', 'Eric'],
  },
  {
    id: '3',
    title: 'Movie 3',
    image: Movie3,
    description: 'Movie 3 description',
    cast: null,
  },
  {
    id: '4',
    title: 'Movie 4',
    image: Movie4,
    description: 'Movie 4 description',
    cast: null,
  },
  {
    id: '5',
    title: 'Movie 5',
    image: Movie5,
    description: 'Movie 5 description',
    cast: null,
  },
  {
    id: '6',
    title: 'Movie 6',
    image: Movie6,
    description: 'Movie 6 description',
    cast: null,
  },
  {
    id: '7',
    title: 'Movie 7',
    image: Movie7,
    description: 'Movie 7 description',
    cast: null,
  },
  {
    id: '8',
    title: 'Movie 8',
    image: Movie8,
    description: 'Movie 8 description',
    cast: null,
  },
  {
    id: '9',
    title: 'Movie 9',
    image: Movie9,
    description: 'Movie 9 description',
    cast: null,
  },
  {
    id: '10',
    title: 'Movie 10',
    image: Movie10,
    description: 'Movie 10 description',
    cast: null,
  },
  {
    id: '11',
    title: 'Movie 11',
    image: Movie11,
    description: 'Movie 11 description',
    cast: null,
  },
  {
    id: '12',
    title: 'Movie 12',
    image: Movie12,
    description: 'Movie 12 description',
    cast: null,
  },
];

const shuffleArray = <T>(array: Array<T>) => {
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = temp;
  }

  return arrayCopy;
};

export const getPrograms = () => {
  return shuffleArray(programInfos);
};
