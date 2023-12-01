import servicesCategory from "./data/services-category";
import motorcycles from "./data/motorcycles";
import { Lists } from "./components/classes";

import {
  adaptiveMenu,
  bidBtns,
  brandSelects,
  categoryBtn,
  curYear,
  engineSelects,
  headerContainer,
  modal,
  modalOk,
  modelSelects,
  otherBrands,
  phoneBtn,
  screenWidth,
  servicesList,
  servicesListTitles,
  subtitle,
  yearsSelector,
} from "./_vars";

const bodyActiveAdd = () => document.body.classList.add("--active");
const bodyActiveRemove = () => document.body.classList.remove("--active");

// адаптивное меню

const toggleMenu = () => {
  if (adaptiveMenu.classList.contains("--active")) {
    adaptiveMenu.classList.remove("--active");
    bodyActiveRemove();
  } else {
    adaptiveMenu.classList.add("--active");
    bodyActiveAdd();
  }
};

if (screenWidth <= 768.5) {
  if (phoneBtn.classList.contains("--white")) {
    phoneBtn.classList.remove("--white");
    phoneBtn.classList.add("--orange");
  }

  headerContainer.addEventListener("click", ({ target }) => {
    if (
      (target && target.classList.contains("menu__link")) ||
      target.classList.contains("header__btn-close") ||
      target.classList.contains("header__btn-burger")
    ) {
      toggleMenu();
    }
  });
}

//адаптивные названия списка категорий услуг
const toggleShowCategory = () => {
  servicesListTitles.classList.toggle("--active");
};

categoryBtn.addEventListener("click", () => {
  toggleShowCategory();
});

// рендер списка категорий

servicesCategory.map((item) => {
  new Lists(
    item.title,
    "li",
    servicesListTitles,
    "services__item-title"
  ).renderCategoryTitles();
});

const renderList = (index) => {
  servicesCategory[index].service.map((item) => {
    new Lists(
      item.description,
      "li",
      servicesList,
      "services__item",
      item.price
    ).renderCategory();
  });
};
renderList(0);

const servicesItems = document.querySelectorAll(".services__item-title");

let currentIndex = 0;
const stateLists = (currentElement) => {
  currentElement.classList.add("--active");
  subtitle.innerText = currentElement.innerText;
};
stateLists(servicesItems[currentIndex]);
servicesItems.forEach((curElement, index) => {
  curElement.addEventListener("click", ({ currentTarget }) => {
    servicesItems.forEach((el) => {
      el.classList.remove("--active");
    });
    stateLists(currentTarget);
    toggleShowCategory();
    currentIndex = index;
    servicesList.innerHTML = "";
    renderList(currentIndex);
  });
});

//рендер селектов

otherBrands.forEach((otherBrand) => {
  motorcycles.map((element, i) => {
    new Lists(element.brand, "option", otherBrand, i).renderBrands();
  });
});

let indexModel = 0;

brandSelects.forEach((brandSelect) => {
  brandSelect.addEventListener("change", ({ currentTarget }) => {
    indexModel = parseInt(currentTarget.value);
    const modelObj = motorcycles[indexModel]?.model;

    modelSelects.forEach((modelSelect) => {
      modelSelect.innerHTML = `
      <option hidden selected disabled>Модель</option>
      <option value="Другая марка">Другая модель</option>
  `;
      for (const key in modelObj) {
        new Lists(key, "option", modelSelect).renderModel();
      }
    });

    engineSelects.forEach((engineSelect) => {
      engineSelect.innerHTML = `
      <option hidden selected disabled value="">Тип двигателя</option>
      <option value="Другой тип">Другой тип</option>
  `;
    });
  });
});

modelSelects.forEach((modelSelect) => {
  modelSelect.addEventListener("change", ({ currentTarget }) => {
    const typeArr = motorcycles[indexModel]?.model[currentTarget.value];
    engineSelects.forEach((engineSelect) => {
      engineSelect.innerHTML = `
      <option hidden selected disabled value="">Тип двигателя</option>
      <option value="Другой тип">Другой тип</option>
  `;
      typeArr?.map((el) => {
        new Lists(el, "option", engineSelect).renderModel();
      });
    });
  });
});

// селектор года выпуска
const years = Array.from({ length: 20 }, (_, i = 1) => curYear - i);

yearsSelector.forEach((selector) => {
  years.map((year) => new Lists(year, "option", selector).renderYears());
});

// модалки

const showModal = (element) => {
  bodyActiveAdd();
  element.classList.add("--active");
};

const hideModal = (element) => {
  bodyActiveRemove();
  element.classList.remove("--active");
};

bidBtns.forEach((btn) => {
  btn.addEventListener("click", () => showModal(modal));
});

document.addEventListener("click", ({ target }) => {
  if (
    (target && target.classList.contains("close-btn")) ||
    target.classList.contains("overlay")
  ) {
    hideModal(modal) || hideModal(modalOk);
    if (adaptiveMenu.classList.contains("--active")) {
      adaptiveMenu.classList.remove("--active");
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && document.body.classList.contains("--active")) {
    hideModal(modal);
    hideModal(modalOk);
    if (adaptiveMenu.classList.contains("--active")) {
      adaptiveMenu.classList.remove("--active");
    }
  }
});

/*В случае успешной отправки формы нужно запустить эту функцию:
showModal(modalOk)
Откроется модалка с уведомлением что всё Ок*/
