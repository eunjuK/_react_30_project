(()=>{"use strict";new class{#e;#t;#s;#n;#i;#o;#a=!1;#r=!1;constructor(){this.#l(),this.#c()}#l(){this.#s=document.getElementById("container"),this.#e=this.#s.querySelector("#switch"),this.#t=this.#s.querySelector("#font"),this.#n=this.#s.querySelector("#keyboard"),this.#i=this.#s.querySelector("#input-group"),this.#o=this.#i.querySelector("#input")}#c(){this.#e.addEventListener("change",this.#u),this.#t.addEventListener("change",this.#h),document.addEventListener("keydown",this.#d.bind(this)),document.addEventListener("keyup",this.#E.bind(this)),this.#o.addEventListener("input",this.#p),this.#n.addEventListener("mousedown",this.#y.bind(this)),document.addEventListener("mouseup",this.#m.bind(this))}#m(e){if(this.#a)return;this.#r=!1;const t=e.target.closest("button.key"),s=!!t?.classList.contains("active"),n=t?.dataset.val;s&&n&&"Space"!==n&&"Backspace"!==n&&(this.#o.value+=n),s&&"Space"==n&&(this.#o.value+=" "),s&&"Backspace"==n&&(this.#o.value=this.#o.value.slice(0,-1)),this.#n.querySelector(".active")?.classList.remove("active")}#y(e){this.#a||(this.#r=!0,this.#r=!0,e.target.closest("button.key")?.classList.add("active"))}#p(e){e.target.value=e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,"")}#d(e){this.#r||(this.#a=!0,e.isComposing?this.#i.classList.add("error",/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)):this.#i.classList.remove("error",/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)),this.#n.querySelector(`[data-code=${e.code}]`)?.classList.add("active"))}#E(e){this.#r||(this.#a=!1,this.#n.querySelector(`[data-code=${e.code}]`)?.classList.remove("active"))}#u(e){document.documentElement.setAttribute("theme",e.target.checked?"dark-mode":"")}#h(e){document.body.style.fontFamily=e.target.value}}})();
//# sourceMappingURL=bundle.js.map