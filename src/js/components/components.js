import Swiper from "swiper/bundle";
import { screenWidth } from "../_vars.js";
import Inputmask from "inputmask";
import SmoothScroll from "smooth-scroll/dist/smooth-scroll.polyfills.js";

// плавная прокрутка по якорям

const scroll = new SmoothScroll('a[href*="#"]');

// слайдеры

const gallerySwiper = new Swiper(".gallery__swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  breakpoints: {
    992: {
      slidesPerView: 1.1,
    },
    1000: {
      slidesPerView: 1.3,
    },
    1440: {
      slidesPerView: 2.2,
    },
  },
  navigation: {
    nextEl: ".gallery__btn-next",
    prevEl: ".gallery__btn-prev",
  },
});

if (screenWidth <= 1024.5) {
  const reviewsSwiper = new Swiper(".reviews__swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    breakpoints: {
      480: {
        slidesPerView: 1.3,
      },
      768: {
        slidesPerView: 1.5,
      },
      864: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: ".reviews__btn-next",
      prevEl: ".reviews__btn-prev",
    },
  });
}

// маска телефона

const phoneInputs = document.querySelectorAll("input[data-phone]");

if (phoneInputs) {
  phoneInputs.forEach((phone) => {
    Inputmask({
      mask: "+7 999 999-99-99",
      showMaskOnHover: false,
    }).mask(phone);
  });
}
