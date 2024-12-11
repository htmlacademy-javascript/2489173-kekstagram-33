import { resetScale } from './scale-image';
import { resetEffects } from './effect-image';

const MAX_HASHTAG_COUNT = 5;
const UNVALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const maxСommentFieldLength = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ErrorMessage = {
  HASHTAG_COUNT: 'Превышено количество хэштегов',
  DUPLICATE_HASHTAGS: 'Хэштеги повторяются',
  INVALID_HASHTAG: 'Введён невалидный хэштег',
  MAX_LENGTH_COMMENTS: `Длина комментария больше ${maxСommentFieldLength} символов`
};

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
const prepareHashtags = (value) => value.toLowerCase().trim().replace(/\s+/g, ' ').split(' ');
const validateHashtags = (value) => {
  const hashtags = prepareHashtags(value);
  const hashTagsRegularityCheck = hashtags.some((hashtag) => !UNVALID_SYMBOLS.test(hashtag));
  return !hashTagsRegularityCheck || value === '';
};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  ErrorMessage.INVALID_HASHTAG
);

const validateHashtagsNumber = (value) => {
  const hashtags = prepareHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

pristine.addValidator(
  hashtagField,
  validateHashtagsNumber,
  ErrorMessage.HASHTAG_COUNT
);


const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

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
  ErrorMessage.MAX_LENGTH_COMMENTS
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

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export { setOnFormSubmit, hideModalWindow };
