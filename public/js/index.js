function initialize() {
    getRequest(
        'http://localhost:3000/index/getPhones',
        function (data) {
            loadHighRatingPhones(data);
        },
        function (xhr) {
            console.log(xhr);
        }
    )
}

function loadHighRatingPhones(phones) {
    let bestSellerContainer = document.getElementById('bestSeller');

    let bestSeller = getHighRatingPhones(phones);

    let str = '';
    for (let i = 0; i < bestSeller.length; ++i) {
        let brand = bestSeller[i].brand;
        let avgRating = 0;
        let id = bestSeller[i]._id;

        for (let j = 0; j < bestSeller[i].reviews.length; ++j) {
            avgRating += bestSeller[i].reviews[j].rating;
        }
        avgRating /= bestSeller[i].reviews.length;

        str += '<div class="row">\n' +
            '            <div class="col-xs-3">\n' +
            '              <img src="/public/images/' + brand +'.jpeg" class="img-responsive">\n' +
            '            </div>\n' +
            '            <div class="col-xs-4">\n' +
            '              <p>Rating: ' + avgRating + '</p>\n' +
            '            </div>\n' +
            '            <div class="col-xs-5">\n' +
            '              <p><a class="btn btn-default" href="/item?id=' + id +'" role="button">View details &raquo;</a></p>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '          <hr>';
    }

    bestSellerContainer.innerHTML = str;

    let soldOutSoonContainer = document.getElementById('soldOutSoon');

    let soldOutSoon = getLowStockPhones(phones);

    str = '';
    for (let i = 0; i < soldOutSoon.length; ++i) {
        let brand = soldOutSoon[i].brand;
        let stock = soldOutSoon[i].stock;
        let id = soldOutSoon[i]._id;

        str += '<div class="row">\n' +
            '            <div class="col-xs-3">\n' +
            '              <img src="/public/images/' + brand +'.jpeg" class="img-responsive">\n' +
            '            </div>\n' +
            '            <div class="col-xs-4">\n' +
            '              <p>' + stock + ' quantity available</p>\n' +
            '            </div>\n' +
            '            <div class="col-xs-5">\n' +
            '              <p><a class="btn btn-default" href="/item?id=' + id +'" role="button">View details &raquo;</a></p>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '          <hr>';
    }

    soldOutSoonContainer.innerHTML = str;
}

function getHighRatingPhones(phones) {
    return phones.sort(function (a, b) {
        let avgA = 0;
        let avgB = 0;

        if (a.reviews.length >= 2) {
            for (let i = 0; i < a.reviews.length; ++i) {
                if (a.reviews[i]) {
                    avgA += a.reviews[i].rating;
                }
            }
            if (a.reviews.length !== 0) {
                avgA /= a.reviews.length;
            }
        }
        if (b.reviews.length >= 2) {
            for (let i = 0; i < b.reviews.length; ++i) {
                if (b.reviews[i]) {
                    avgB += b.reviews[i].rating;
                }
            }
            if (b.reviews.length !== 0) {
                avgB /= b.reviews.length;
            }
        }
        return avgB - avgA;
    }).slice(0, 5);
}

function getLowStockPhones(phones) {
    return phones.sort(function (a, b) {
        return a.stock - b.stock;
    }).slice(0, 5);
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