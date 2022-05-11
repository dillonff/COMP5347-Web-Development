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
        console.log(typeof phone);
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
    let quantity = document.getElementById('quantity').value;
    let phoneId = getQueryString('id');

    //TODO
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

window.onload = initialize;