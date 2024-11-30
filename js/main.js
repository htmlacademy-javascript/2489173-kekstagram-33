// import {getPictures} from './data.js';
// import './form.js';


import {renderPictures} from './picture-render.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { setOnFormSubmit, hideModalWindow } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';


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

getData(renderPictures, showAlert);


// renderPictures(getPictures());
