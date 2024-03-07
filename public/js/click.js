// import axios from 'axios';
// import { showAlert } from './alerts';
// `use strict`;

// const nav = document.querySelector('.nav');

// window.addEventListener('resize', function (event) {
//   const width = document.body.clientWidth;
//   // console.log(width);
//   if (width > 1080) {
//     closeNav();
//   }
//   // console.log(
//   //   document.body.clientWidth +
//   //     ' wide by ' +
//   //     document.body.clientHeight +
//   //     ' high'
//   // );
// });

// document
//   .getElementById('slide_nav_bar')
//   .addEventListener('click', function (e) {
//     e.preventDefault();
//     openNav();
//   });
// document.getElementById('closebtn').addEventListener('click', function (e) {
//   e.preventDefault();
//   closeNav();
// });

// // nav slide bar
// function openNav() {
//   // console.log('inside');
//   if (document.getElementById('mySidenav').style.width === '250px') {
//     document.getElementById('mySidenav').style.width = '0';
//   } else {
//     document.getElementById('mySidenav').style.width = '250px';
//   }
// }

// function closeNav() {
//   document.getElementById('mySidenav').style.width = '0';
// }

// // Sticky navigation: Intersection Observer API
// // by me
// window.onscroll = function () {
//   myFunction();
// };

// // var navbar = document.getElementById("navbar");
// // var sticky = navbar.offsetTop;

// function myFunction() {
//   console.log(window.screenY);
//   if (window.pageYOffset >= 1) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// }

function deleteRow(id, type) {
  if (type == 'user') deleteUser(id);
  else deleteService(id);
}

const deleteUser = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/deleteUser',
      data: {
        id,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'User deleted successfully!');

      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    let m1 = err.response.data.split(' ')[4];
    let m2 = err.response.data.split(' ')[5];
    let m3 = err.response.data.split(' ')[6];
    let m4 = err.response.data.split(' ')[7];
    let m5 = err.response.data.split(' ')[8];

    let message = m1 + ' ' + m2 + ' ' + m3 + ' ' + m4 + ' ' + m5;
    showAlert('error', message);
  }
};

const deleteService = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/service/deleteService',
      data: {
        id,
      },
    });
    console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'Service deleted successfully!');

      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    let m1 = err.response.data.split(' ')[4];
    let m2 = err.response.data.split(' ')[5];
    let m3 = err.response.data.split(' ')[6];
    let m4 = err.response.data.split(' ')[7];
    let m5 = err.response.data.split(' ')[8];

    let message = m1 + ' ' + m2 + ' ' + m3 + ' ' + m4 + ' ' + m5;
    showAlert('error', message);
  }
};
