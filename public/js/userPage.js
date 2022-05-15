window.onload = initialize;

let userDetail = [];
let relatedPhoneListings = [];
let userId = '';

function initialize() {
  axios
    .get('http://localhost:3000/userPage/getUserId')
    .then(function (response) {
      userId = response.data;

      loadUserPage();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function loadUserPage() {
  const tabs = document.getElementsByClassName('tab');
  const contents = document.getElementsByClassName('content');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].index = i;
    tabs[i].onclick = function () {
      for (let j = 0; j < tabs.length; j++) {
        tabs[j].className = tabs[j].className.replace(' selected', '').trim();
        contents[j].className = contents[j].className
          .replace(' show-contents', '')
          .trim();
      }
      this.className = this.className + ' selected';
      contents[this.index].className =
        contents[this.index].className + ' show-contents';
    };
  }
  //  get user info
  const userReqUrl = 'http://localhost:3000/userPage/getUserInfo/' + userId;
  getRequest(
    userReqUrl,
    function (data) {
      userDetail = data;
      fillUserInfo();
    },
    function (xhr) {
      console.error(xhr);
    }
  );
  //change phone image routes
  getRequest(
    'http://localhost:3000/userPage/changeImageRoutes/changeimage',
    function (data) {},
    function (xhr) {
      console.error(xhr);
    }
  );

  //get related phone listings
  const phoneReqUrl = 'http://localhost:3000/userPage/phoneListings/' + userId;
  axios
    .get(phoneReqUrl)
    .then(function (response) {
      relatedPhoneListings = response.data;
      fillPhoneListings();
      fillPhoneReviews();
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Get http request
function getRequest(path, success, error) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}

// Fill users info.
function fillUserInfo() {
  document.getElementById('firstName').value = userDetail[0].firstname;
  document.getElementById('lastName').value = userDetail[0].lastname;
  document.getElementById('email').value = userDetail[0].email;
}

// Fill phone listing
function fillPhoneListings() {
  let tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  for (let i = 0; i < relatedPhoneListings.length; i++) {
    let Phones_row = document.createElement('tr');
    Phones_row.setAttribute('id', 'phone' + i);
    Phones_row.innerHTML =
      '<td class="phone-title">' +
      relatedPhoneListings[i].title +
      '</td>' +
      '<td>' +
      relatedPhoneListings[i].brand +
      '</td>' +
      '<td><image class="related-phone-image" src="' +
      relatedPhoneListings[i].image +
      '"/></td>' +
      '<td>' +
      relatedPhoneListings[i].stock +
      '</td>' +
      '<td>' +
      relatedPhoneListings[i].price +
      '</td>' +
      '<td><input type="checkbox" name="disableBox" id="disableCheckbox' +
      i +
      '"/></td>' +
      '<td><input type="checkbox" name="deleteBox" id="deleteCheckbox' +
      i +
      '"/></td>';
    tbody.appendChild(Phones_row);

    if (relatedPhoneListings[i].disabled == true) {
      let disCheckboxId = 'disableCheckbox' + i;
      let disCheckboxEle = document.getElementById(disCheckboxId);
      disCheckboxEle.checked = true;
    }
  }
}

// Fill related phone reviews
function fillPhoneReviews() {
  let reviews = document.getElementById('reviews');
  let str = '';

  for (let i = 0; i < relatedPhoneListings.length; i++) {
    let userReview = relatedPhoneListings[i].reviews;

    if (userReview != undefined) {
      for (let k = 0; k < userReview.length; k++) {
        str +=
          '<div class="row bg-info">\n' +
          '      <div class="box">\n' +
          '        <h3 id="Reviewer' +
          k +
          '">Reviewer:</h3>\n' +
          '        <p>Phone Title: ' +
          relatedPhoneListings[i].title +
          '</p>\n' +
          '        <p>Brand: ' +
          relatedPhoneListings[i].brand +
          '</p>\n' +
          '        <p>Rating: ' +
          relatedPhoneListings[i].reviews[k].rating +
          '</p>\n' +
          '        <p>Comment: ' +
          relatedPhoneListings[i].reviews[k].comment +
          '</p>\n' +
          '      </div>\n' +
          '    </div>\n' +
          '    <hr>';
      }
      reviews.innerHTML = str;
      for (let k = 0; k < userReview.length; k++) {
        fillUsername(
          relatedPhoneListings[i].reviews[k].reviewer,
          document.getElementById('Reviewer' + k)
        );
      }
    }
  }
}

function fillUsername(id, htmlElement) {
  getRequest(
    'http://localhost:3000/userPage/getUserInfo/' + id,
    function (data) {
      let user = data;
      let reviewerName = '';
      reviewerName = 'Reviewer: ' + user[0].firstname + ' ' + user[0].lastname;
      htmlElement.innerText = reviewerName;
    },
    function (xhr) {
      console.log(xhr);
    }
  );
}

function verifyEmail() {
  let email = document.getElementById('email').value;

  if (!emailIsValid(email)) {
    alert('Invalid email format!');
  } else {
    $('#myModal').modal('show');
  }
}

function confirmUpdate() {
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let email = document.getElementById('email').value;
  let data =
    'firstname=' +
    firstName +
    '&lastname=' +
    lastName +
    '&email=' +
    email +
    '&id=' +
    userId;

  let initialPwd = document.getElementById('password').value;
  let encodePwd = md5(initialPwd);
  let pwd = 'userPwd=' + encodePwd;

  axios
    .post('http://localhost:3000/userPage/checkPwd', pwd)
    .then(function (response) {
      if (response.data == 'correctpwd') {
        axios
          .post('http://localhost:3000/userPage/updateUserInfo', data)
          .then(function (response) {
            if (response.status == 200) {
              alert('Updated!');
              loadUserPage();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        document
          .getElementById('formGroup')
          .setAttribute('class', 'form-group has-error');
        document.getElementById('hint').innerText = 'Incorrect password!';
        loadUserPage();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Change password
function changePassword() {
  let initialPassword = document.getElementById('cur-pwd').value;
  let newPassword = document.getElementById('new-pwd').value;
  if (initialPassword == '') {
    alert('Please enter your current password.');
  } else {
    let encodePwd = md5(initialPassword);
    let curPassword = 'userPwd=' + encodePwd;
    axios
      .post('http://localhost:3000/userPage/checkPwd', curPassword)
      .then(function (response) {
        if (response.data == 'correctpwd') {
          let newPwd = md5(newPassword);
          let data = 'password=' + newPwd + '&id=' + userId;
          axios
            .post('http://localhost:3000/userPage/userInfo/pwd', data)
            .then(function (response) {
              if (response.status == 200) {
                alert('Password change saved, Please relogin.');
                loadUserPage();
                initialPassword = '';
                newPassword = '';
              } else {
                alert(response);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert('Current password is incorrect!');
          loadUserPage();
          document.getElementById('cur-pwd').value = '';
          document.getElementById('new-pwd').value = '';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function addNewListing() {
  let newBrand = document.getElementById('create-brand').value;
  let newTitle = document.getElementById('create-title').value;
  let newStock = document.getElementById('create-stock').value;
  let newPrice = document.getElementById('create-price').value;

  if (isNaN(newStock) || isNaN(newPrice)) {
    alert('Stock and Price must be numbers!');
    document.getElementById('create-stock').value = '';
    document.getElementById('create-price').value = '';
  } else if (
    newBrand != 'pendingBrand' &&
    newTitle != '' &&
    newStock != '' &&
    newPrice != ''
  ) {
    let data =
      'title=' +
      newTitle +
      '&brand=' +
      newBrand +
      '&stock=' +
      newStock +
      '&price=' +
      newPrice +
      '&id=' +
      userId;
    axios
      .post('http://localhost:3000/userPage/userInfo/newlisting', data)
      .then(function (response) {
        if (response.status == 200) {
          alert('Add new listing successfully!');
          newBrand = 'pendingBrand';
          newTitle = '';
          newStock = '';
          newPrice = '';
          loadUserPage();
          fillPhoneListings();
          document.getElementById('create-brand').value = 'pendingBrand';
          document.getElementById('create-title').value = '';
          document.getElementById('create-stock').value = '';
          document.getElementById('create-price').value = '';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    alert('Please input all the information needed!');
  }
}

function saveChanges() {
  let disableInfo = '';
  let notDis = '';
  let deleteInfo = '';
  let disableBoxs = document.getElementsByName('disableBox');
  let deleteBoxs = document.getElementsByName('deleteBox');

  for (let i = 0; i < relatedPhoneListings.length; i++) {
    if (disableBoxs[i].checked == true) {
      disableInfo = 'disableId=' + relatedPhoneListings[i]._id;
    } else {
      notDis = 'notDisableId=' + relatedPhoneListings[i]._id;
    }
    if (deleteBoxs[i].checked == true) {
      deleteInfo = 'deleteId=' + relatedPhoneListings[i]._id;
    }
  }

  function postDisableReq() {
    axios.post(
      'http://localhost:3000/userPage/disablePhoneListings',
      disableInfo
    );
  }
  function postNotDisableReq() {
    axios.post(
      'http://localhost:3000/userPage/notDisablePhoneListings',
      notDis
    );
  }

  function postDeleteReq() {
    axios.post(
      'http://localhost:3000/userPage/deletePhoneListings',
      deleteInfo
    );
  }

  axios
    .all([postDisableReq(), postNotDisableReq(), postDeleteReq()])

    .then(() => {
      alert('Changes Saved!');
    })
    .catch(function (error) {
      console.log(error);
    });
  loadUserPage();
}

function signOut() {
  axios
    .get('http://localhost:3000/logout')
    .then(function (response) {
      window.location.href = 'http://localhost:3000/';

      history.pushState(null, null, 'http://localhost:3000/');
      window.addEventListener('popstate', function () {
        history.pushState(null, null, 'http://localhost:3000/');
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
