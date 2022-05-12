function initialize() {
    let title = document.getElementById('title');
    let hint = document.getElementById('hint');

    title.innerText = 'Start to search your phone';
    hint.innerText = 'Please key in the key word and select the brand and the price filters';
}

function getSearchResult() {
    let keyWord = document.getElementById('keyWord').value;
    let brand = document.getElementById('brand').value;
    let price = document.getElementById('price').value;

    getRequest(
        'http://localhost:3000/search/getFilteredPhones?keyWord=' + keyWord +'&brand=' + brand + '&price=' + price,
        function (data) {
            loadPage(data);
        },
        function (xhr) {
            console.log(xhr);
        }
    )
}

function loadPage(phones) {
    let title = document.getElementById('title');
    let hint = document.getElementById('hint');
    let container = document.getElementById('phoneList');
    let str = '';
    for (let i = 0; i < phones.length; ++i) {
        console.log(i);
        let brand = phones[i].brand;
        let title = phones[i].title;
        let price = phones[i].price;
        let id = phones[i]._id;
        str += '<div class="row">\n' +
            '        <div class="col-xs-2">\n' +
            '            <img src="/public/images/' + brand + '.jpeg" class="img-responsive">\n' +
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

    title.innerText = 'Searching Results';
    if (str === '') {
        hint.innerText = 'Sorry, we have not found a phone that meets the filter criteria.'
    }
    else {
        hint.innerText = 'We have found these phones for you!';
    }
    container.innerHTML = str;
}

function login() {
    $.ajax({
        url: '/saveLastPage',
        type: 'post',
        data: {'lastPage': window.location.href},
        dataType: 'json'
    })

    window.location.href = "/login"
}

function register() {
    $.ajax({
        url: '/saveLastPage',
        type: 'post',
        data: {'lastPage': window.location.href},
        dataType: 'json'
    })

    window.location.href = "/register"
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