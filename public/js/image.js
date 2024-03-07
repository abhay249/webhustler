let base64String1 = '';
let base64String2 = '';
const createServiceBtn = document.querySelector('.add-service');
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
// alert 'success' or 'error'
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

function imageUploaded1() {
  var file1 = document.querySelector('.image1')['files'][0];

  var reader1 = new FileReader();

  reader1.onload = function () {
    base64String1 = reader1.result;

    imageBase64Stringsep1 = base64String1;
  };
  reader1.readAsDataURL(file1);
}

function imageUploaded2() {
  var file2 = document.querySelector('.image2')['files'][0];

  var reader2 = new FileReader();

  reader2.onload = function () {
    base64String2 = reader2.result;

    imageBase64Stringsep2 = base64String2;
  };
  reader2.readAsDataURL(file2);
}

if (createServiceBtn)
  createServiceBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('image');

    const name = document.getElementById('name').value;
    const slug = document.getElementById('slug').value;
    const type = document.getElementById('propertyType').value;
    const content1 = document.getElementById('content1').value;
    const content2 = document.getElementById('content2').value;
    const content3 = document.getElementById('content3').value;
    const content4 = document.getElementById('content4').value;
    const image1 = base64String1;
    const image2 = base64String2;
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
    addService(
      name,
      slug,
      type,
      content1,
      content2,
      content3,
      content4,
      image1,
      image2
    );
    document.getElementById('name').value = '';
    document.getElementById('slug').value = '';
    document.getElementById('propertyType').value = '';
    document.getElementById('content1').value = '';
    document.getElementById('content2').value = '';
    document.getElementById('content3').value = '';
    document.getElementById('content4').value = '';
    document.getElementById('image1').value = '';
    document.getElementById('image2').value = '';
  });

const addService = async (
  name,
  slug,
  type,
  content1,
  content2,
  content3,
  content4,
  image1,
  image2
) => {
  console.log(image1);
  try {
    const res = await axios({
      method: 'POST',
      url: '/service/createService',
      data: {
        name,
        slug,
        type,
        content1,
        content2,
        content3,
        content4,
        image1,
        image2,
      },
    });
    // console.log(res.data.data.user.city, res.data.status);

    if (res.data.status === 'success') {
      showAlert('success', 'Service added successfully!');

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

    let message = m1 + ' ' + m2 + ' ' + m3 + ' ' + m4 + ' ' + m5;
    showAlert('error', message);
  }
};
