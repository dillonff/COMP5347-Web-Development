const axios = require("axios");

function initialize() {
    axios
        .get('http://localhost:3000/search/getPhones')
        .then(function (response) {
            loadPage(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function loadPage(phones) {
    let container = document.getElementById('phoneList');
    let str = '';
    for (let i = 0; i < phones.length; ++i) {
        let brand = phones[i].brand;
        let title = phones[i].title;
        let price = phones[i].price;
        let id = phones[i]._id;
        str += '<div class="row">\n' +
            '        <div class="col-xs-2">\n' +
            '            <img src="/public/phone_default_images/' + brand +'.jpeg" class="img-responsive">\n' +
            '        </div>\n' +
            '        <div class="col-xs-7 center-block">\n' +
            '            <h4>'+ title +'</h4>\n' +
            '            <p>Price: $' + price + '</p>' +
            '        </div>\n' +
            '        <div class="col-xs-3">\n' +
            '            <p><a class="btn btn-default" href="/item?id=' + id +'" role="button">View details &raquo;</a></p>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <hr>';
    }
    container.innerHTML = str;
}

window.onload = initialize;