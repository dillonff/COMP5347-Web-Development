window.onload = initialize;

let initialInfo = [];
let relatedPhongListings = [];
let userId = "";

function initialize() {
  axios
    .get("http://localhost:3000/userPage/getUserId")
    .then(function (response) {
      userId = response.data;

      loadUserPage();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function loadUserPage() {
  const tabs = document.getElementsByClassName("tab");
  const contents = document.getElementsByClassName("content");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].index = i;
    tabs[i].onclick = function () {
      for (let j = 0; j < tabs.length; j++) {
        tabs[j].className = tabs[j].className.replace(" selected", "").trim();
        contents[j].className = contents[j].className
          .replace(" show-contents", "")
          .trim();
      }
      this.className = this.className + " selected";
      contents[this.index].className =
        contents[this.index].className + " show-contents";
    };
  }

  const reqUrlone = "http://localhost:3000/userPage/getUserInfo/" + userId;
  getRequest(
    reqUrlone, //get basic user info
    function (data) {
      initialInfo = data;
      fillInfo();
    },
    function (xhr) {
      console.error(xhr);
    }
  );

  getRequest(
    "http://localhost:3000/userPage/changeImageRoutes/hellochangeimage", //change db image routes
    function (data) {
      console.log("change image routes↓");
      console.log(data);
    },
    function (xhr) {
      console.error(xhr);
    }
  );

  let reqUrltwo = "http://localhost:3000/userPage/phoneListings/" + userId; //get related phone listings
  axios
    .get(reqUrltwo)
    .then(function (response) {
      relatedPhongListings = response.data;
      fillPhoneListings();
      // fillPhoneReviews();
    })
    .catch(function (error) {
      console.log(error);
    });
}

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
  xhr.open("GET", path, true);
  xhr.send();
}

function fillInfo() {
  document.getElementById("firstName").value = initialInfo[0].firstname;
  document.getElementById("lastName").value = initialInfo[0].lastname;
  document.getElementById("email").value = initialInfo[0].email;
}

function fillPhoneListings() {
  var tbody_tag = document.querySelector("tbody");
  tbody_tag.innerHTML = "";
  for (let i = 0; i < relatedPhongListings.length; i++) {
    let create_phoneinfo_row = document.createElement("tr");
    create_phoneinfo_row.setAttribute("id", "phone" + i);
    create_phoneinfo_row.innerHTML =
      '<td class="phone-title">' +
      relatedPhongListings[i].title +
      "</td>" +
      "<td>" +
      relatedPhongListings[i].brand +
      "</td>" +
      '<td><image class="related-phone-image" src="' +
      relatedPhongListings[i].image +
      '"/></td>' +
      "<td>" +
      relatedPhongListings[i].stock +
      "</td>" +
      "<td>" +
      relatedPhongListings[i].price +
      "</td>" +
      '<td><input type="checkbox" name="disableCBName" id="disableCheckbox' +
      i +
      '"/></td>' +
      '<td><input type="checkbox" name="deleteCBName" id="deleteCheckbox' +
      i +
      '"/></td>';
    tbody_tag.appendChild(create_phoneinfo_row);

    if (relatedPhongListings[i].disabled != undefined) {
      let disCheckboxId = "disableCheckbox" + i;
      let disCheckboxEle = document.getElementById(disCheckboxId);
      disCheckboxEle.checked = true;
    }
  }
}

function updateProfile() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let data =
    "firstname=" +
    firstName +
    "&lastname=" +
    lastName +
    "&email=" +
    email +
    "&id=" +
    userId;
  console.log("will send to server: " + data);
  let initialPwd = prompt("please input the your password: ");
  // console.log(121212121212,pwd);
  if (initialPwd == null) {
    console.log("cancel to input current password!");
  } else {
    let pwd2 = md5(initialPwd);
    let pwd = { userPwd: pwd2 };
    axios
      .post("http://localhost:3000/userPage/checkPwd", pwd)
      .then(function (response) {
        if (response.data == "correctpwd") {
          axios
            .post("http://localhost:3000/userPage/updateUserInfo", data)
            .then(function (response) {
              console.log(response);
              if (response.data == "successProfile") {
                alert("Updated!");
                loadUserPage();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert("Incorrect password!");
          loadUserPage();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function changePassword() {
  let curPasswordInitial = document.getElementById("cur-pwd").value;
  let newPassword = document.getElementById("new-pwd").value;
  // console.log(66666666666,curPasswordInitial)
  if (curPasswordInitial == "") {
    alert("please input your current password!");
  } else {
    let curPassword2 = md5(curPasswordInitial);
    let curPassword = { userPwd: curPassword2 };
    axios
      .post("http://localhost:3000/userPage/checkPwd", curPassword)
      .then(function (response) {
        console.log(response, 77777777777777777);
        if (response.data == "correctpwd") {
          let newPassword2 = md5(newPassword);
          let data = "password=" + newPassword2 + "&id=" + userId;
          axios
            .post("http://localhost:3000/userPage/userInfo/pwd", data)
            .then(function (response) {
              console.log(response);
              if (response.data == "successPwd") {
                alert("Password changed successfully!");
                loadUserPage();
                document.getElementById("cur-pwd").value = "";
                document.getElementById("new-pwd").value = "";
              } else {
                alert(response);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert("Current password is incorrect!");
          loadUserPage();
          document.getElementById("cur-pwd").value = "";
          document.getElementById("new-pwd").value = "";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function addNewListing() {
  const newBrand = document.getElementById("create-brand").value;
  const newTitle = document.getElementById("create-title").value;
  const newStock = document.getElementById("create-stock").value;
  const newPrice = document.getElementById("create-price").value;

  if (!isNumber(newStock) || !isNumber(newPrice)) {
    alert("The stock and price must be a number!");
    document.getElementById("create-stock").value = "";
    document.getElementById("create-price").value = "";
  } else if (
    newBrand != "pendingBrand" &&
    newTitle != "" &&
    newStock != "" &&
    newPrice != ""
  ) {
    const data =
      "title=" +
      newTitle +
      "&brand=" +
      newBrand +
      "&stock=" +
      newStock +
      "&price=" +
      newPrice +
      "&id=" +
      userId;
    axios
      .post("http://localhost:3000/userPage/userInfo/newlisting", data)
      .then(function (response) {
        console.log(response);
        if (response.data == "successAddListing") {
          alert("Add new listing successfully!");
          loadUserPage();
          fillPhoneListings();
          document.getElementById("create-brand").value = "pendingBrand";
          document.getElementById("create-title").value = "";
          document.getElementById("create-stock").value = "";
          document.getElementById("create-price").value = "";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    alert("You have to input all the information above");
  }
}

function saveChanges() {
  let disableInfo = {};
  let notDis = {};
  let deleteInfo = {};
  let disableCB_tags = document.getElementsByName("disableCBName");
  let deleteCB_tags = document.getElementsByName("deleteCBName");

  for (let i = 0; i < relatedPhongListings.length; i++) {
    if (disableCB_tags[i].checked == true) {
      disableInfo["disableId"] = relatedPhongListings[i]._id;
    } else {
      notDis["notDisableId"] = relatedPhongListings[i]._id;
    }
    if (deleteCB_tags[i].checked == true) {
      deleteInfo["deleteId"] = relatedPhongListings[i]._id;
    }
  }

  function postDisableReq() {
    return axios.post(
      "http://localhost:3000/userPage/disablePhoneListings",
      disableInfo
    );
  }
  function postNotDisableReq() {
    return axios.post(
      "http://localhost:3000/userPage/notDisablePhoneListings",
      notDis
    );
  }

  function postDeleteReq() {
    return axios.post(
      "http://localhost:3000/userPage/deletePhoneListings",
      deleteInfo
    );
  }

  axios
    .all([postDisableReq(), postNotDisableReq(), postDeleteReq()])
    .then(
      axios.spread(function (disable, notDisable, deletePhong) {
        // debugger
        console.log("disable: ", disable);
        console.log("notDisable: ", notDisable);
        console.log("deletePhong: ", deletePhong);
      })
    )
    .then(() => {
      alert("Changes Saved!");
    })
    .catch(function (error) {
      console.log(error);
    });
  loadUserPage();
}

function signOut() {
  axios
    .get("http://localhost:3000/logout")
    .then(function (response) {
      window.location.href = "http://localhost:3000/";

      history.pushState(null, null, "http://localhost:3000/");
      window.addEventListener("popstate", function () {
        history.pushState(null, null, "http://localhost:3000/");
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function isNumber(val) {
  let regPos = /^\d+(\.\d+)?$/;
  let regNeg =
    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}
