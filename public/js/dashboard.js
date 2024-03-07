import axios from 'axios';
import { showAlert } from './alerts';
// const createAccBtn = document.querySelector('.createAccBtn');
const addServiceBtn = document.querySelector('.addServiceBtn');
// const loading = document.querySelector('.loading');
// loading.remove();
// const service_text_container = document.querySelector(
//   '.service-text-container'
// );

function deleteRow(id) {
  console.log('id', id);
}

export const usersDisplay = async () => {
  // addServiceBtn.style.opacity = 0;
  // createAccBtn.style.opacity = 1;
  // location.reload();

  try {
    const res = await axios({
      method: 'GET',
      url: '/getUsers',
    });

    const service_text = document.querySelectorAll('.service-text');
    const user_text = document.querySelectorAll('.user-text');
    const contact_text = document.querySelectorAll('.contact-text');
    const user_text_container = document.querySelector('.user-text-container');
    // const loading = document.querySelectorAll('.loading');
    // const welcome = document.querySelectorAll('.welcome');

    // loading.remove();
    // console.log(res.data.data);
    if (res.data.status === 'success') {
      service_text.forEach((element) => {
        element.remove();
      });
      user_text.forEach((element) => {
        element.remove();
      });
      contact_text.forEach((element) => {
        element.remove();
      });
      // welcome.innerHTML += loading;
      // setTimeout(function () {
      //   loading.remove();

      // }, 3000);

      res.data.data.forEach((data) => {
        var content = `
        <div class="dash-content user-text">
        <div class="column-span">
        <span class="name-span"> ${data.name}</span>
        </div>
        <div class="column-span">
        <span class="name-span"> ${data.email}</span>
        </div>
        ${
          data.active
            ? '<div class="column-span">\n          \t<span class="name-span"> Active</span></div>'
            : '<div class="column-span">\n          \t<span class="name-span"> Inactive</span></div>'
        }
        <div class="column-span">
        <button class="btn--blue" id='${data._id}' onclick = deleteRow('${data._id}','user') >Delete</button>
        </div>
        </div>
        `;
        user_text_container.innerHTML += content;
        content = '';
      });

      //   showAlert('success', 'Logged out Sucessfully');
      //   window.setTimeout(() => {
      //   location.assign('/admin');
      //   }, 2000);
    }
  } catch (err) {
    console.log(err);

    showAlert('error', 'Error cannot process! Try again');
  }
};

export const servicesDisplay = async () => {
  // addServiceBtn.style.opacity = 1;
  // createAccBtn.style.opacity = 0;
  // location.reload();
  try {
    const res = await axios({
      method: 'GET',
      url: '/getServices',
    });

    // const da = JSON.parse('!{data}');
    // console.log(res.data.data[0], res.data.data.length);
    const service_text = document.querySelectorAll('.service-text');
    const user_text = document.querySelectorAll('.user-text');
    const contact_text = document.querySelectorAll('.contact-text');
    const service_text_container = document.querySelector('.service-container');
    const loading = document.querySelectorAll('.loading');
    const welcome = document.querySelectorAll('.welcome');

    if (res.data.status === 'success') {
      user_text.forEach((element) => {
        element.remove();
      });
      service_text.forEach((element) => {
        element.remove();
      });
      contact_text.forEach((element) => {
        element.remove();
      });
      // welcome.innerHTML += loading;
      // setTimeout(function () {
      //   loading.remove();
      // }, 3000);
      res.data.data.forEach((data) => {
        var content = `
        <div class="dash-content service-text">
          <div class="column-span">
          <span class="name-span"> ${data.name}</span>
          </div>
          <div class="column-span">
          <span class="name-span"> ${data.type}</span>
          </div>
          ${
            data.active
              ? '<div class="column-span">\n          \t<span class="name-span"> Active</span></div>'
              : '<div class="column-span">\n          \t<span class="name-span"> Inactive</span></div>'
          }
          <div class="column-span">
            <button class="btn--blue" id='${data._id}' onclick = deleteRow('${data._id}','service') >Delete</button>
          </div>
          </div>
          `;
        service_text_container.innerHTML += content;
        content = '';
      });

      // res.data.data.forEach((data) => {
      //   var content = `
      //   <div class="dash-content service-text">
      //     <div class="column-span">
      //       <span class="name-span"> ${data.name}</span>
      //     </div>
      //     <div class="column-span">
      //       <span class="name-span"> ${data.type}</span>
      //     </div>
      //     ${
      //       data.active
      //         ? '<div class="column-span">\n        \t<span class="name-span"> Active</span></div>'
      //         : '<div class="column-span">\n        \t<span class="name-span"> Inactive</span></div>'
      //     }
      //     <div class="column-span">
      //       <span class="name-span"> action</span>
      //     </div>
      //   </div>
      // `;
      //   service_text_container.innerHTML += content;
      //   content = '';
      // });
      //   showAlert('success', 'Logged out Sucessfully');
      //   window.setTimeout(() => {
      //   location.assign('/admin');
      //   }, 2000);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Error cannot process! Try again');
  }
};
export const contactDisplay = async () => {
  // addServiceBtn.style.opacity = 1;
  // createAccBtn.style.opacity = 0;
  // location.reload();
  try {
    const res = await axios({
      method: 'GET',
      url: '/getContact',
    });

    // const da = JSON.parse('!{data}');
    // console.log(res.data.data[0], res.data.data.length);
    const service_text = document.querySelectorAll('.service-text');
    const user_text = document.querySelectorAll('.user-text');
    const contact_text = document.querySelectorAll('.contact-text');
    const contact_text_container = document.querySelector('.contact-container');
    const loading = document.querySelectorAll('.loading');
    const welcome = document.querySelectorAll('.welcome');

    if (res.data.status === 'success') {
      user_text.forEach((element) => {
        element.remove();
      });
      service_text.forEach((element) => {
        element.remove();
      });
      contact_text.forEach((element) => {
        element.remove();
      });
      // welcome.innerHTML += loading;
      // setTimeout(function () {
      //   loading.remove();
      // }, 3000);
      res.data.data.forEach((data) => {
        var content = `
        <div class="dash-content contact-text">
          <div class="column-span">
            <span class="name-span"> ${data.name}</span>
          </div>
          <div class="column-span">
            <span class="name-span"> ${data.email}</span>
          </div>
          <div class="column-span">
            <span class="name-span"> ${data.phoneNumber}</span>
          </div>
          ${
            data.message
              ? `<div class="column-span">\n          \t<span class="name-span"> ${data.message}</span></div>`
              : `<div class="column-span">\n          \t<span class="name-span"> ${data.timestamp}</span></div>`
          }
          </div>
          `;
        contact_text_container.innerHTML += content;
        content = '';
      });

      // res.data.data.forEach((data) => {
      //   var content = `
      //   <div class="dash-content service-text">
      //     <div class="column-span">
      //       <span class="name-span"> ${data.name}</span>
      //     </div>
      //     <div class="column-span">
      //       <span class="name-span"> ${data.type}</span>
      //     </div>
      //     ${
      //       data.active
      //         ? '<div class="column-span">\n        \t<span class="name-span"> Active</span></div>'
      //         : '<div class="column-span">\n        \t<span class="name-span"> Inactive</span></div>'
      //     }
      //     <div class="column-span">
      //       <span class="name-span"> action</span>
      //     </div>
      //   </div>
      // `;
      //   service_text_container.innerHTML += content;
      //   content = '';
      // });
      //   showAlert('success', 'Logged out Sucessfully');
      //   window.setTimeout(() => {
      //   location.assign('/admin');
      //   }, 2000);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Error cannot process! Try again');
  }
};
