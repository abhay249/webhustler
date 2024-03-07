// const { doc } = require("prettier");
import axios from 'axios';
import { showAlert } from './alerts';
// const canvas = document.getElementById("canvas");
// const hideAlert = () => {
//   const el = document.querySelector(".alert");
//   if (el) el.parentElement.removeChild(el);
// };
// // alert 'success' or 'error'
// const showAlert = (type, msg) => {
//   hideAlert();
//   const markup = `<div class="alert alert--${type}">${msg}</div>`;
//   document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
//   window.setTimeout(hideAlert, 5000);
// };

export const createAccount = async (name, email, password, confirmPassword) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/signup',
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
    });
    // console.log(res);
    if (res.data.status === 'success')
      showAlert('success', 'Created Successfully');
    // console.log(res);
  } catch (err) {
    // console.log(err);
    showAlert('error', 'Not created');
  }
};
export const contact = async (name, email, phoneNumber, message) => {
  // console.log(idCard, dateOfBirth);
  try {
    const res = await axios({
      method: 'POST',
      url: '/saveContact',
      data: {
        name,
        email,
        phoneNumber,
        message,
      },
    });
    if (res.data.status === 'success')
      showAlert('success', 'Saved');
    // console.log(res);
  } catch (err) {
    // console.log(err);
    showAlert('error', 'Not saved');
  }
};
