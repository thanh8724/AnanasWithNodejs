function slider_header() {
  $(document).ready(function () {
    $(".header__slide--box").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinity: false,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      prevArrow: `<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: block;"><ion-icon name="chevron-back-outline"></ion-icon></button>`,
      nextArrow: `<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: block;"><ion-icon name="chevron-forward-outline"></ion-icon></button>`,
    });
  });
}
function slider_banner() {
  $(document).ready(function () {
    $(".main__banner--boxImg").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinity: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 10000,
      dots: true,
    });
  });
}
function slider__bannerShop() {
  $(document).ready(function () {
    $(".shop__banner--right---boxShow").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinity: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 10000,
      dots: true,
    });
  });
}
function slider__products() {
  $(document).ready(function () {
    $(".box__showProducts--items").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinity: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      prevArrow: `<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: block;"><ion-icon name="chevron-back-outline"></ion-icon></button>`,
      nextArrow: `<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: block;"><ion-icon name="chevron-forward-outline"></ion-icon></button>`,
    });
  });
}
function slider_cmt() {
  $(document).ready(function () {
    $(".box__comment").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinity: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      prevArrow: `<div class="prev__comment">
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </div>`,
      nextArrow: `<div class="next__comment">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </div>`,
    });
  });
}
function run() {
  slider_header();
  slider_banner();
  slider__bannerShop();
  slider__products();
  slider_cmt();
}
if (
  document.querySelector(".box__comment") ||
  document.querySelector(".box__showProducts--items") ||
  document.querySelector(".shop__banner--right---boxShow") ||
  document.querySelector(".main__banner--boxImg") ||
  document.querySelector(".header__slide--box")
) {
  run();
}
