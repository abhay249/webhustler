import '@babel/polyfill';
import { login, logout } from './login';
import { createAccount, contact } from './createAccount';
import { usersDisplay, servicesDisplay, contactDisplay } from './dashboard';
// import { addService } from './createService';

const signUpForm = document.querySelector('.account-create');
const loginForm = document.querySelector('.admin-login');
const logOut = document.querySelector('.logout');
const contact_us = document.querySelector('.contact-us');
// const logOut = document.querySelector('.logout');
const userBtn = document.querySelector('.users-btn');
const serviceBtn = document.querySelector('.services-btn');
const contact_btn = document.querySelector('.contact-btn');

const createAccBtn = document.querySelector('.createAccBtn');
const addServiceBtn = document.querySelector('.addServiceBtn');
const heading_span = document.querySelector('.heading-span');
const span_type = document.querySelector('.span-type');
const statusCol = document.querySelector('.status-col');
const btnBlue = document.querySelector('.btn--blue');

const service_text = document.querySelector('.service-text');
const user_text = document.querySelector('.user-text');
// userBtn.style.backgroundColor = '#81818138';

if (btnBlue)
  btnBlue.addEventListener('click', (e) => {
    e.preventDefault();
    window.setTimeout(() => {
      location.reload();
    }, 2000);
  });
if (addServiceBtn)
  addServiceBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.setTimeout(() => {
      location.assign('/service/addService');
    }, 2000);
  });

if (createAccBtn)
  createAccBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.setTimeout(() => {
      location.assign('/createAccount');
    }, 2000);
  });

if (userBtn)
  userBtn.addEventListener('click', (e) => {
    e.preventDefault();
    usersDisplay();
    serviceBtn.style.backgroundColor = '';
    contact_btn.style.backgroundColor = '';
    userBtn.style.backgroundColor = '#81818138';
    addServiceBtn.style.display = 'none';
    createAccBtn.style.display = 'inline';
    createAccBtn.style.marginTop = '-10%';
    span_type.textContent = 'Email';
    heading_span.textContent = 'Users';
    statusCol.textContent = 'Status';
  });

if (serviceBtn)
  serviceBtn.addEventListener('click', (e) => {
    e.preventDefault();
    servicesDisplay();
    userBtn.style.backgroundColor = '';
    contact_btn.style.backgroundColor = '';
    serviceBtn.style.backgroundColor = '#81818138';
    createAccBtn.style.display = 'none';
    addServiceBtn.style.display = 'inline';
    span_type.textContent = 'Type';
    heading_span.textContent = 'Services';
    statusCol.textContent = 'Status';
  });
if (contact_btn)
  contact_btn.addEventListener('click', (e) => {
    e.preventDefault();
    contactDisplay();
    userBtn.style.backgroundColor = '';
    serviceBtn.style.backgroundColor = '';
    contact_btn.style.backgroundColor = '#81818138';
    createAccBtn.style.display = 'none';
    addServiceBtn.style.display = 'none';
    span_type.textContent = 'Email';
    heading_span.textContent = 'Contact';
    statusCol.textContent = 'Phone No';
  });

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    login(email, password);
  });

if (contact_us)
  contact_us.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    contact(name, email, phone, message);
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
  });

if (logOut)
  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

if (signUpForm)
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPasssword = document.getElementById('confirmPassword').value;
    // const idCard = document.getElementById('idCard').value;
    // const state = document.getElementById('state').value;
    // const district = document.getElementById('district').value;
    // const city = document.getElementById('city').value;
    // const role = document.getElementById('role').value;
    // const canvas = document.getElementById('canvas');
    // const file = document.getElementById("file").value;
    // var image = canvas.toDataURL();
    // console.log(image);
    // image64 = image;
    // console.log(image);
    createAccount(name, email, password, confirmPasssword);
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
  });

// dom event

const nav = document.querySelector('.nav');

window.addEventListener('resize', function (event) {
  const width = document.body.clientWidth;
  // console.log(width);
  if (width > 1080) {
    closeNav();
  }
  // console.log(
  //   document.body.clientWidth +
  //     ' wide by ' +
  //     document.body.clientHeight +
  //     ' high'
  // );
});

document
  .getElementById('slide_nav_bar')
  .addEventListener('click', function (e) {
    e.preventDefault();
    openNav();
  });
document.getElementById('closebtn').addEventListener('click', function (e) {
  e.preventDefault();
  closeNav();
});

// nav slide bar
function openNav() {
  // console.log('inside');
  if (document.getElementById('mySidenav').style.width === '250px') {
    document.getElementById('mySidenav').style.width = '0';
  } else {
    document.getElementById('mySidenav').style.width = '250px';
  }
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}

// Sticky navigation: Intersection Observer API
// by me

window.onscroll = function () {
  myFunction();
};

var navlist = document.querySelector('.nav');
var sticky = navlist.offsetTop;

/* Function to stick the nav bar */
function myFunction() {
  if (window.pageYOffset >= 100) {
    navlist.classList.add('sticky');
  } else {
    navlist.classList.remove('sticky');
  }
}

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  console.log('helo');
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
