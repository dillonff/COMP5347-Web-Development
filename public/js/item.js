function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}

function initialize() {
    getRequest(
        'http://localhost:3000/item/getPhoneById?id=' + getQueryString('id'),
        function (data) {
            loadPage(data);
        },
        function (xhr) {
            console.log(xhr);
        }
    )

    getRequest(
        'http://localhost:3000/item/getCartItemByUserIdAndPhoneId?phoneId=' + getQueryString('id'),
        function (data) {
            fillAmountInCart(data);
        },
        function (xhr) {
            console.log(xhr);
        }
    )
}

function fillAmountInCart(cartItem) {
    let badge = document.getElementById('amountInCart');
    if (cartItem) {
        badge.innerText = '' + cartItem.quantity;
    }
    else {
        badge.innerText = '0';
    }
}

function loadPage(phone) {
    let image = document.getElementById('image');
    let title = document.getElementById('title');
    let brand = document.getElementById('brand');
    let stock = document.getElementById('stock');
    let seller = document.getElementById('seller');
    let price = document.getElementById('price');
    let reviews = document.getElementById('reviews');

    image.innerHTML = '<img src="/public/images/' + phone.brand + '.jpeg" class="img-responsive img-thumbnail">\n'
    title.innerText = phone.title;
    brand.innerText = phone.brand;
    stock.innerText = phone.stock;
    fillUsername(phone.seller, seller);
    price.innerText = '$' + phone.price;

    let str = '';
    for (let i = 0; i < phone.reviews.length; ++i) {
        str += '<div class="row bg-info">\n' +
            '      <div class="container">\n' +
            '        <h3 id="reviewer' + i + '"></h3>\n' +
            '        <p>Rating: ' + phone.reviews[i].rating + '</p>\n' +
            '        <p>' + phone.reviews[i].comment + '</p>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '    <hr>';
    }
    reviews.innerHTML = str;
    for (let i = 0; i < phone.reviews.length; ++i) {
        fillUsername(phone.reviews[i].reviewer, document.getElementById('reviewer' + i));
    }
}

function fillUsername(id, htmlElement) {
    getRequest(
        'http://localhost:3000/item/getUsernameById?id=' + id,
        function (data) {
            let user = data;
            htmlElement.innerText = user.firstname + ' ' + user.lastname;
        },
        function (xhr) {
            console.log(xhr);
        }
    )
}

function addToCart() {
    let quantity = document.getElementById('quantity');
    let hint = document.getElementById('hint')
    let phoneId = getQueryString('id');
    let stock = document.getElementById('stock');
    let badge = document.getElementById('amountInCart');
    let formGroup = document.getElementById('formGroup');

    if (parseInt(quantity.value) < 1) {
        formGroup.setAttribute('class', 'form-group has-error');
        hint.innerText = 'Quantity must large than 0!';
    }

    else if (parseInt(quantity.value) + parseInt(badge.innerText) > parseInt(stock.innerText)) {
        formGroup.setAttribute('class', 'form-group has-error');
        hint.innerText = 'Exceeds the number in stock!';
    }
    else {
        postRequest(
            'http://localhost:3000/item/insertItem',
            'phoneId=' + phoneId + '&quantity=' + quantity.value,
            function () {
                console.log('add item success!');
            },
            function (xhr) {
                console.log(xhr);
            }
        );
        addCartSuccess();
    }
}

function addCartSuccess() {
    $('#myModal').modal('toggle');
    window.alert('Success!');
    window.location.reload();
}

function addReview() {
    let phoneId = getQueryString('id');
    let rating = document.getElementById('rating').value;
    let comment = document.getElementById('comment').value;

    postRequest(
        'http://localhost:3000/item/insertReview',
        'phoneId=' + phoneId + '&rating=' + rating + '&comment=' + comment,
        function () {
            console.log('add item success!');
        },
        function (xhr) {
            console.log(xhr);
        }
    );
    addReviewSuccess();
}

function addReviewSuccess() {
    window.alert('Success!');
    window.location.reload();
}

function getRequest(path, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
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

function postRequest(path, params, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success();
            } else {
                if (error) error(xhr);
            }
        }
    };

    xhr.open('POST', path, true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(params);
}

window.onload = initialize;