document
  .querySelector("#comment-pagination")
  .addEventListener("click", (event) => {
    const id = document.getElementById("product_id").value;
    $.ajax({
      url: `http://localhost:8080/api/products/${id}/comments?page=${event.target.innerText}`,
      type: "GET",
      dateType: "JSON",
      success: function (data) {
        const $comment = $("#comment-list");
        $comment.empty();

        const { comments, prev, next, curr } = data;
        const prevItem = document.getElementById("prev-page-item");
        prevItem.innerText = prev;
        prevItem.value = prev;

        const nextItem = document.getElementById("next-page-item");
        nextItem.innerText = next;
        nextItem.value = next;

        const currItem = document.getElementById("curr-page-item");
        currItem.innerText = curr;
        currItem.value = curr;

        comments.forEach((comment) => {
          const str = `<div class="review_item">
                        <div class="media">
                            <div class="d-flex">
                                <img class="avatar" src="${comment.user_avatar_url}" alt="/img/male_avatar.svg"/>
                            </div>
                            <div class="media-body">
                                <h4>${comment.user_name}</h4>
                                <h5>${comment.createdAt}</h5>
                            </div>
                        </div>
                        <p>${comment.content}</p>
                    </div>`;

          const html = $.parseHTML(str);
          $comment.append(html);
        });
      },
    });
  });
