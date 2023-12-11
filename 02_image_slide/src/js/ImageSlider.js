export default class ImageSlider {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  #autoPlay = true;

  #intervalId;

  slideWrapEl;

  slideBoxEl;

  nextBtnEl;

  previousBtnEl;

  controlWrapEl;

  constructor() {
    this.assignElement();
    this.initSlideNumber();
    this.initSlideWidth();
    this.initSliderBoxWidth();
    this.initAutoPlay();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
  }

  assignElement() {
    this.slideWrapEl = document.getElementById('slide-wrap');
    this.slideBoxEl = this.slideWrapEl.querySelector('.slide-box');
    this.nextBtnEl = this.slideWrapEl.querySelector('.next');
    this.previousBtnEl = this.slideWrapEl.querySelector('.prev');
    this.indicatorWrapEl = this.slideWrapEl.querySelector('.indicator-wrap');
    this.controlWrapEl = this.slideWrapEl.querySelector('.control-wrap');
  }

  initAutoPlay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  initSlideNumber() {
    this.#slideNumber = this.slideBoxEl.querySelectorAll('.slide').length;
  }

  initSlideWidth() {
    this.#slideWidth = this.slideBoxEl.clientWidth;
  }

  initSliderBoxWidth() {
    this.slideBoxEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener('click', this.autoPlay.bind(this));
  }

  autoPlay(e) {
    const targetParent = e.target.parentNode.parentNode;

    if (targetParent.getAttribute('data-status') === 'pause') {
      this.#autoPlay = true;
      targetParent.setAttribute('data-status', 'play');
      this.initAutoPlay();
    } else {
      this.#autoPlay = false;
      targetParent.setAttribute('data-status', 'pause');
      clearInterval(this.#intervalId);
    }
  }

  onClickIndicator(e) {
    const indexPosition = parseInt(e.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.slideBoxEl.style.left = `-${
        this.#slideWidth * this.#currentPosition
      }px`;
      this.setIndicator();
    }
  }

  moveToRight() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    this.slideBoxEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.slideBoxEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToLeft.bind(this), 3000);
    }
    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i++) {
      const button = document.createElement('button');
      button.dataset.index = i;
      button.setAttribute('type', 'button');
      button.setAttribute('class', 'indicator');
      docFragment.appendChild(button);
    }
    this.indicatorWrapEl.appendChild(docFragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`.indicator:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }

  autoplayInterval() {}
}
