$(function () {
  "use strict";

  //------- Parallax -------//
  skrollr.init({
    forceHeight: false,
  });

  //------- Active Nice Select --------//
  $("select").niceSelect();

  //------- hero carousel -------//
  $(".hero-carousel").owlCarousel({
    items: 3,
    margin: 10,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      810: {
        items: 3,
      },
    },
  });

  //------- Best Seller Carousel -------//
  if ($(".owl-carousel").length > 0) {
    $("#bestSellerCarousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      navText: [
        "<i class='ti-arrow-left'></i>",
        "<i class='ti-arrow-right'></i>",
      ],
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        900: {
          items: 3,
        },
        1130: {
          items: 4,
        },
      },
    });
  }

  //------- single product area carousel -------//
  $(".s_Product_carousel").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: false,
  });

  //------- mailchimp --------//
  function mailChimp() {
    $("#mc_embed_signup").find("form").ajaxChimp();
  }

  mailChimp();

  //------- fixed navbar --------//
  $(window).scroll(function () {
    const sticky = $(".header_area"),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass("fixed");
    else sticky.removeClass("fixed");
  });

  //------- Price Range slider -------//
  if (document.getElementById("price-range")) {
    const nonLinearSlider = document.getElementById("price-range");

    noUiSlider.create(nonLinearSlider, {
      connect: true,
      behaviour: "tap",
      start: [500, 2000],
      range: {
        // Starting at 500, step the value by 500,
        // until 4000 is reached. From there, step by 1000.
        min: [500],
        "10%": [500, 100],
        max: [2000],
      },
    });

    const nodes = [
      document.getElementById("lower-value"), // 0
      document.getElementById("upper-value"), // 1
    ];

    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    nonLinearSlider.noUiSlider.on(
        "update",
        function (values, handle, unencoded, isTap, positions) {
          nodes[handle].innerHTML = values[handle];
        }
    );
  }
});

$("#contactForm input[type=submit]").on("click", function (event) {
  event.preventDefault();
  $.post(
      `/api/products/${$("#product_id").val()}/comments`,
      {
        content: $("#message").val(),
      },
      function (data) {
        const commentTemplate = Handlebars.compile(
            document.getElementById("comment-template").innerHTML
        );
        const commentHtml = commentTemplate(data);
        $("#comment-list").prepend(commentHtml);
        document.getElementById("message").value = "";
      }
  ).fail(function (data) {
    if(data.status === 401)
      window.location.href = `/login?page=/products/${$('#product_id').val()}`;
  });
});


$(".add-To-Cart-button").on('click', function () {
  const cart = $('#top-ti-shopping-cart');
  const imgtodrag = $(this).parent(".card-product__imgOverlay").parent(".card-product__img").find("img").eq(0);
  if (imgtodrag) {
    const imgclone = imgtodrag.clone()
    .offset({
      top: imgtodrag.offset().top,
      left: imgtodrag.offset().left
    })
    .css({
      'opacity': '0.8',
      'position': 'absolute',
      'height': '150px',
      'width': '150px',
      'z-index': '100'
    })
    .appendTo($('body'))
    .animate({
      'top': cart.offset().top,
      'left': cart.offset().left,
      'width': 60,
      'height': 60
    }, 1000, 'easeInOutExpo');

    setTimeout(function () {
      cart.effect("shake", {
        times: 1.5
      }, 100);
    }, 1000);

    imgclone.animate({
      'width': 0,
      'height': 0
    }, function () {
      $(this).detach()
    });
  }
});

$("#add-to-card a").on('click', function () {
  $.post(
      `/api/cart/${$("#product_id").val()}`,
      {
        content: $("#qty").val(),
      },
      function (data) {
        if(data === 'Added successfully'){
          const cart = $('#top-ti-shopping-cart');
          const imgtodrag = $("#img-fluid-1");
          if (imgtodrag) {
            const imgclone = imgtodrag.clone()
            .offset({
              top: imgtodrag.offset().top,
              left: imgtodrag.offset().left
            })
            .css({
              'opacity': '0.8',
              'position': 'absolute',
              'height': '150px',
              'width': '150px',
              'z-index': '100'
            })
            .appendTo($('body'))
            .animate({
              'top': cart.offset().top,
              'left': cart.offset().left,
              'width': 60,
              'height': 60
            }, 1000, 'easeInOutExpo');

            setTimeout(function () {
              cart.effect("shake", {
                times: 1.5
              }, 100);
            }, 1000);

            imgclone.animate({
              'width': 0,
              'height': 0
            }, function () {
              $(this).detach()
            })
          }
          document.getElementById("messageError").remove();
        } else {
          const message = Handlebars.compile(
              document.getElementById("message-error").innerHTML
          );
          const messageHtml = message(data);
          $("#messageError").prepend(messageHtml);
          console.log(messageHtml);
        }
      }
  )
});
