import {getRandomArrayElement,getRandomPositiveInteger} from './util.js';


const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Сколько нежности и любви в этом простом и добром кадре',
  'Давайте внимательнее рассмотрим изображение',
  'Затусили с друзьями на море',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья.',
  'Вот это тачка!',
  'Отличное кафе.Как же круто тут кормят',
  'Господи, это такая милота.',
  'Хорошо, когда в жизни есть верные друзья ',
  'Прикольно',
];
const NAMES = ['Николай', 'Максим', 'Андрей', 'Алексей', 'Тимур', 'Степан', 'Ольга', 'Наталья', 'Вероника', 'Валентина', 'Дмитрий', 'Олег', 'Сергей'];

const PHOTO_DESCRIPTION_ARRAY_LENGTH = 25;

const AVATARS_IN_THE_LIMIT = {
  min : 1,
  max: 6
};

const LIKES_IN_THE_LIMIT = {
  min : 15,
  max: 200
};

const COMENTS_IN_THE_LIMIT = {
  min : 0,
  max: 6
};

const createMessage = () =>
  Array.from({ length: getRandomPositiveInteger(1, 2) }, () =>
    getRandomArrayElement(COMMENTS)
  ).join(' ');

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomPositiveInteger(AVATARS_IN_THE_LIMIT.min, AVATARS_IN_THE_LIMIT.max)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(LIKES_IN_THE_LIMIT.min, LIKES_IN_THE_LIMIT.max),
  comments: Array.from(
    { length: getRandomPositiveInteger(COMENTS_IN_THE_LIMIT.min,COMENTS_IN_THE_LIMIT.max) },
    (_, commentIndex) => createComment(commentIndex + 1)
  ),
});

const getPictures = () =>
  Array.from({ length: PHOTO_DESCRIPTION_ARRAY_LENGTH }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );
getPictures();
export {getPictures};
