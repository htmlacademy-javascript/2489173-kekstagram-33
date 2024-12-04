import { resetScale } from './scale-image';
import { resetEffects } from './effect-image';

const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.img-upload__cancel');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = formElement.querySelector('.img-upload__submit');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;
const maxСommentFieldLength = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ErrorMessage = {
  HASHTAG_COUNT: 'Превышено количество хэштегов',
  DUPLICATE_HASHTAGS: 'Хэштеги повторяются',
  INVALID_HASHTAG: 'Введён невалидный хэштег',
  MAX_LENGTH_COMMENTS: `Длина комментария больше ${maxСommentFieldLength} символов`
};


const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//Открытие и закрытие формы
const showModalWindow = () => {
  overlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const hideModalWindow = () => {
  formElement.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModalWindow();
  }
}

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onCancelButtonClick = () => {
  hideModalWindow();
};

const onFileInputChange = () => {
  const file = fileField.files[0];
  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showModalWindow();
};

//Валидации формы
const startsWithHash = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// const validateTags = (value) => {
//   const tags = value
//     .trim()
//     .split(' ')
//     .filter((tag) => tag.trim().length);
//   return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
// };
// pristine.addValidator(
//   hashtagField,
//   validateTags,
//   'Неправильно заполнены хэштеги'
// );

const validateTagsHasValidCount = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags);
};

pristine.addValidator(
  hashtagField,
  validateTagsHasValidCount,
  ErrorMessage.HASHTAG_COUNT
);

const validateTagsHasUniqueTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasUniqueTags(tags);
};

pristine.addValidator(
  hashtagField,
  validateTagsHasUniqueTags,
  ErrorMessage.DUPLICATE_HASHTAGS
);

const validateTagsIsValidTag = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTagsIsValidTag,
  ErrorMessage.INVALID_HASHTAG
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const validateComment = (value) => value.length < maxСommentFieldLength;

pristine.addValidator(
  commentField,
  validateComment,
  ErrorMessage.DUPLICATE_HASHTAGS
);

const setOnFormSubmit = (cb) => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(formElement));
      unblockSubmitButton();
    }
  });
};

// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// };

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
// formElement.addEventListener('submit', pristine.validate);
// form.addEventListener('submit', onFormSubmit());

export { setOnFormSubmit, hideModalWindow };
