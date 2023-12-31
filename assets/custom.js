function changeImageCollectionCard() { 
  let variantBtnElements = document.querySelectorAll('.variant_btn');
  variantBtnElements.forEach(buttonElement => {
    buttonElement.addEventListener('click', () => {
  
      let cardElement = buttonElement.parentElement.parentElement.parentElement;
      let linkElements = cardElement.querySelectorAll('a');
      let imageElement = cardElement.querySelector('.card__media img');
      let imageUrl = buttonElement.dataset.image;
      let variantUrl = buttonElement.dataset.url;
  
      linkElements.forEach(linkElement => {
        linkElement.href = variantUrl;
      })
  
      Array.from(buttonElement.parentNode.children).forEach(sibling => {
        if (sibling !== buttonElement) {
          sibling.classList.remove('active')
        }
      })
  
      buttonElement.classList.add('active')
      // imageElement.classList.add('loading')
      // setTimeout(() => {imageElement.classList.remove('loading')}, 300)
      
      imageElement.src = imageUrl;
    })
  })
}
changeImageCollectionCard()

function changeVariant() { 
  let slideshowContainerElements = document.querySelectorAll('.slideshow_container')
  let productImagesElements = document.querySelectorAll('.product_images')
  let productVariantOptionsCustomElements = document.querySelectorAll('.product-variant-options-custom')
  let variantProductFeaturesElements = document.querySelectorAll('.variant_product_features')
  
  if (productVariantOptionsCustomElements) {
    productVariantOptionsCustomElements.forEach(elem => {
      elem.addEventListener('click', function (evt) {
        if (slideshowContainerElements[this.dataset.index]) {
          slideshowContainerElements.forEach(el => {
            el.classList.remove('active')
          })
          slideshowContainerElements[this.dataset.index].classList.add('active')
        }
        if (productImagesElements[this.dataset.index]) {
          productImagesElements.forEach(el => {
            el.classList.remove('active')
          })
          productImagesElements[this.dataset.index].classList.add('active')
        }
        if (variantProductFeaturesElements[this.dataset.index]) {
          variantProductFeaturesElements.forEach(el => {
            el.classList.remove('active')
          })
          variantProductFeaturesElements[this.dataset.index].classList.add('active')
        }
      })
    })
  }
}
changeVariant()

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop
}

function productTabsScroll() {
  const anchors = document.querySelectorAll('a[href*="#"]')
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (evt) {
      evt.preventDefault()
      
      const blockID = anchor.getAttribute('href').substr(1)
      const block = document.querySelector(`.${blockID}`)
      const headerHeight = document.querySelector('.section-header').offsetHeight
      const NAV_HEIGHT = 38;
      if (blockID == 'to_top') {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else if (block) {
        const blockTop = offset(block) - headerHeight - NAV_HEIGHT;
        window.scrollTo({
          top: blockTop,
          left: 0,
          behavior: "smooth"
        });
      }
    })
  }
}
productTabsScroll()

const swiper_product_gallery = new Swiper(".swiper_product_gallery", {
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

const buy_now_btn = document.querySelectorAll('.buy_now_btn');
const add_to_cart_btn = document.querySelector('.product-form__submit');
if (buy_now_btn) {
  buy_now_btn.forEach(element => {
    element.addEventListener('click', function(evt) {
      if (add_to_cart_btn) {
        add_to_cart_btn.click()
      }
    })
  })
}

// Получаем нужный элемент
let halved_numbers = document.querySelectorAll('.halved__num');

let Visible = function (target) {
  // Все позиции элемента
  let targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
    // Получаем позиции окна
    windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

  if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
    targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
    // Если элемент полностью видно, то запускаем следующий код
    target.classList.add('is-visible')
  } else {
    // Если элемент не видно, то запускаем этот код
    target.classList.remove('is-visible')
  };
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function() {
  halved_numbers.forEach(element => {
    Visible(element);
  })
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
halved_numbers.forEach(element => {
  Visible(element);
})