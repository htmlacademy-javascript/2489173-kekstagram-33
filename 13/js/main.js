import {renderPictures} from './picture-render.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { setOnFormSubmit, hideModalWindow } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { setOnFilterClick, turnFilterOn, filterPictures } from './filter-pictures.js';


const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  renderPictures(filterPictures());
  setOnFilterClick(renderPictures);
};

const onSendDataSuccess = () => {
  hideModalWindow();
  showSuccessMessage();
};

const onSendDataError = () => {
  showErrorMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});

getData(onGetDataSuccess, showAlert);
