let filter = { category: "", producer: "" };
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
        $productsTable.html("");

        const { curr, next, prev, products } = data;
        products.forEach((product) => {
          let price = product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          let productStatus;
          let outOfStockMess = "";
          if (product.stock === 0) {
            productStatus = `<li>
                               <button><i class="ti-shopping-cart"></i></button>
                           </li>`;
            outOfStockMess = `<p class="card-product__price"><span class="alert-success">Hết hàng</span>
                                            </p>`;
          } else {
            productStatus = `<li class="add-To-Cart-button">
                          <form id="add-to-card" action="/api/cart/${product._id}" method="POST"
                                enctype="multipart/form-data" target="tempFrame">
                            <button type="submit"><i class="ti-shopping-cart"></i></button>
                          </form>
                        </li>`
          }

          const str = `<div class="col-md-6 col-lg-4">
                                <div class="card text-center card-product">
                                    <div class="card-product__img">
                                        <a href="products/${product._id}"> <img class="card-img" src="${product.image_url}"
                                                                              alt=""></a>
                                        <iframe name="tempFrame" style="display:none;"></iframe>
                                        <ul class="card-product__imgOverlay">
                                        <li>
                        <div style="display: none;" id="product_id">{{this._id}}</div>
                      </li>
                                            <li>
                                                <button><i class="ti-search"></i></button>
                                            </li>
                                            ${productStatus}
                                            <li>
                                                <button><i class="ti-heart"></i></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <p>${product.category}</p>
                                        <h4 class="card-product__title"><a
                                                href="products/${product._id}">${product.name}</a></h4>
                                        <p class="card-product__price">${price}</p>
                                        ${outOfStockMess}
                                    </div>
                                </div>
                            </div>`;
          const html = $.parseHTML(str);
          $productsTable.append(html);
        });

        const $pagination = $(".pagination");
        $pagination.html("");
        const str = `<li class="page-item"><a id="prev-page-item" class="page-link" href="/products?page=${prev.page}&${prev.filter}
                                ">${prev.page}</a></li>
                     <li class="page-item"><a id="curr-page-item" class="page-link"
                                                     href="/products?page=${curr.page}&${curr.filter}
                                ">${curr.page}</a></li>
                     <li class="page-item"><a id="next-page-item" class="page-link" href="/products?page=${next.page}&${next.filter}
                                ">${next.page}</a></li>`;
        const html = $.parseHTML(str);
        $pagination.append(html);
      },
    });
  });
});
