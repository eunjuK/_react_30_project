export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGruopEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGruopEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGruopEl.querySelector("#input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener("mousedown", this.#onMousedown.bind(this));
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseUp(event) {
    if(this.#keyPress) return;
    this.#mouseDown = false;

    const keyEl = event.target.closest("button.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;
    if(isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if(isActive && val == "Space") {
      this.#inputEl.value += " ";
    }
    if(isActive && val == "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onMousedown(event) {
    if(this.#keyPress) return;
    this.#mouseDown = true;

    this.#mouseDown = true;
    event.target.closest("button.key")?.classList.add("active");
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "")
  }
  #onKeyDown(event) {
    if(this.#mouseDown) return;
    this.#keyPress = true;

    // console.log(event.key);
    // console.log(event.isComposing);
    if(event.isComposing) {
      this.#inputGruopEl.classList.add("error", /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key))
    } else {
      this.#inputGruopEl.classList.remove("error", /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key))
    }
    
    this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.add('active')
  }
  #onKeyUp(event) {
    if(this.#mouseDown) return;
    this.#keyPress = false;

    this.#keyboardEl.querySelector(`[data-code=${event.code}]`)
    ?.classList.remove('active')
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}