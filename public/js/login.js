import axios from 'axios';
import { showAlert } from './alerts';

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

export const login = async (email, password) => {
  // console.log(idCard, dateOfBirth);
  try {
    const res = await axios({
      method: 'POST',
      url: '/login',
      data: {
        email,
        password,
      },
    });
    // console.log(res.data.data.user.city, res.data.status);

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');

      // let now = Date.now();
      // const dateActive = 1666598774169;

      // const dateDactive = dateActive + 5 * 60 * 1000;
      // console.log("now", now, "dateD", dateDactive);
      // if (now > dateDactive) {
      //   window.setTimeout(() => {
      //     location.assign("/sessionOut");
      //   }, 1500);
      // } else
      // if (res.data.data.user.city === "Mur") {
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
      // } else {
      //   window.setTimeout(() => {
      //     location.assign("/niya");
      //   }, 1500);
      // }
    }
    // console.log("You are allowed");
    // router.get(viewController.getSecond);
  } catch (err) {
    let m1 = err.response.data.split(' ')[4];
    let m2 = err.response.data.split(' ')[5];
    let m3 = err.response.data.split(' ')[6];
    let m4 = err.response.data.split(' ')[7];
    let m5 = err.response.data.split(' ')[8];
    console.log(err.response.data);
    let message = m1 + ' ' + m2 + ' ' + m3 + ' ' + m4 + ' ' + m5;
    showAlert('error', message);
  }
};

// document.querySelector(".form-login").addEventListener("submit", (e) => {
//   e.preventDefault();
//   const id = document.getElementById("name1").value;
//   const dateOfBirth = document.getElementById("course").value;
//   login(id, dateOfBirth);
// });

// module.exports = router;

export const logout = async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/logout',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged out Sucessfully');
      window.setTimeout(() => {
        location.reload();
        // location.assign('/admin');
      }, 2000);
    }
  } catch (err) {
    showAlert('error', 'Error not logged out! Try again');
  }
};

// export const serBtn = async () => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: '/logout',
//     });
//     if (res.data.status === 'success') {
//       showAlert('success', 'Logged out Sucessfully');
//       window.setTimeout(() => {
//         location.assign('/admin');
//       }, 2000);
//     }
//   } catch (err) {
//     showAlert('error', 'Error not logged out! Try again');
//   }
// };

// export const AccBtn = async () => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: '/logout',
//     });
//     if (res.data.status === 'success') {
//       showAlert('success', 'Logged out Sucessfully');
//       window.setTimeout(() => {
//         location.assign('/admin');
//       }, 2000);
//     }
//   } catch (err) {
//     showAlert('error', 'Error not logged out! Try again');
//   }
// };
