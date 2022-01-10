let filter = {category: "", producer: ""};
document.querySelectorAll(".products-filter").forEach((e) => {
    e.addEventListener("change", (evt) => {
        if (String(evt.target.value).startsWith("Laptop")) {
            filter.category = evt.target.value;
        } else {
            filter.producer = evt.target.value;
        }

        $.ajax({
            url: "http://localhost:8080/api/products",
            type: "GET",
            data: filter,
            dateType: "JSON",
            success: function (data) {
                const $productsTable = $("#products-table");
                $productsTable.empty();
                data.forEach((product) => {
                    const str = `<div class="col-md-6 col-lg-4">
                                <div class="card text-center card-product">
                                    <div class="card-product__img">
                                        <a href="products/${product._id}"> <img class="card-img" src="${product.image_url}"
                                                                              alt=""></a>
                                        <ul class="card-product__imgOverlay">
                                            <li>
                                                <button><i class="ti-search"></i></button>
                                            </li>
                                            <li>
                                            <li class="add-To-Cart-button">
                                                <form id="add-to-card" action="/api/cart/${product._id}" method="POST"
                                                      enctype="multipart/form-data" target="temp">
                                                    <button type="submit"><i class="ti-shopping-cart"></i></button>
                                                </form>
                                            </li>
                                            <li>
                                                <button><i class="ti-heart"></i></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <p>${product.category}</p>
                                        <h4 class="card-product__title"><a
                                                href="products/${product._id}">${product.name}</a></h4>
                                        <p class="card-product__price">${product.price}₫</p>
                                    </div>
                                </div>
                            </div>`;
                    const html = $.parseHTML(str);
                    $productsTable.append(html);
                });
            },
        });
    });
});

function searchProductsHandler() {
    const searchValue = document.getElementById("search-text-bar").value;
    $.ajax({
        url: "http://localhost:8080/api/products/search-by-name",
        type: "GET",
        data: {name: searchValue},
        dateType: "JSON",
        success: function (data) {
            const $productsTable = $("#products-table");
            $productsTable.empty();
            data.forEach((product) => {
                const str = `<div class="col-md-6 col-lg-4">
                                <div class="card text-center card-product">
                                    <div class="card-product__img">
                                        <a href="products/${product._id}"> <img class="card-img" src="${product.image_url}"
                                                                              alt=""></a>
                                        <ul class="card-product__imgOverlay">
                                            <li>
                                                <button><i class="ti-search"></i></button>
                                            </li>
                                            <li>
                                            <li class="add-To-Cart-button">
                                                <form id="add-to-card" action="/api/cart/${product._id}" method="POST"
                                                      enctype="multipart/form-data" target="temp">
                                                    <button type="submit"><i class="ti-shopping-cart"></i></button>
                                                </form>
                                            </li>
                                            <li>
                                                <button><i class="ti-heart"></i></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <p>${product.category}</p>
                                        <h4 class="card-product__title"><a
                                                href="products/${product._id}">${product.name}</a></h4>
                                        <p class="card-product__price">${product.price}₫</p>
                                    </div>
                                </div>
                            </div>`;
                const html = $.parseHTML(str);
                $productsTable.append(html);
            });
        },
    });
}

function selectedOption() {

    const selectedValue = document.getElementById("sorting-selected").value;
    $.ajax({
        url: "http://localhost:8080/api/products/sorting",
        type: "GET",
        data: {["sort-by"]: selectedValue},
        dateType: "JSON",
        success: function (data) {
            const $productsTable = $("#products-table");
            $productsTable.empty();
            data.forEach((product) => {
                const str = `<div class="col-md-6 col-lg-4">
                                <div class="card text-center card-product">
                                    <div class="card-product__img">
                                        <a href="products/${product._id}"> <img class="card-img" src="${product.image_url}"
                                                                              alt=""></a>
                                        <ul class="card-product__imgOverlay">
                                            <li>
                                                <button><i class="ti-search"></i></button>
                                            </li>
                                            <li>
                                            <li class="add-To-Cart-button">
                                                <form id="add-to-card" action="/api/cart/${product._id}" method="POST"
                                                      enctype="multipart/form-data" target="temp">
                                                    <button type="submit"><i class="ti-shopping-cart"></i></button>
                                                </form>
                                            </li>
                                            <li>
                                                <button><i class="ti-heart"></i></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <p>${product.category}</p>
                                        <h4 class="card-product__title"><a
                                                href="products/${product._id}">${product.name}</a></h4>
                                        <p class="card-product__price">${product.price}₫</p>
                                    </div>
                                </div>
                            </div>`;
                const html = $.parseHTML(str);
                $productsTable.append(html);
            });
        },
    });
}
document.querySelector(".pagination").addEventListener("click", event => {
    const id = document.getElementById("product_id").id;
    console.log("Hello");
    $.ajax({
        url: `http://localhost:8080/api/products/${id}/comments`,
        type: "GET",
        dateType: "JSON",
        success: function (data) {
            console.log(data);
            const $comment = $("#pagination");
            $comment.empty();
            data.forEach(($comment) => {
                const str= <div className="review_item">
                    <div className="media">
                        <div className="d-flex">
                            <img className="avatar" src="${comment.user_avatar_url}" alt="/img/male_avatar.svg"/>
                        </div>
                        <div class="media-body">
                            <h4>${comment.user_name}</h4>
                            <h5>${comment.createdAt}</h5>
                        </div>
                    </div>
                    <p>${comment.content}</p>
                </div>
                const html = $.parseHTML(str);
                $comment.append(html);
            });
        }
    });
});
