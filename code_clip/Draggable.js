class Draggable {
  containerElement = null;
  rectList = [];
  drag = { element: null, index: 0, firstIndex: 0 };
  clone = { element: null, x: 0, y: 0 };
  isPointerDown = false;
  lastPointerMove = { x: 0, y: 0 };

  referenceElement = null;
  diff = { x: 0, y: 0 };
  constructor(options) {
    this.containerElement = options.element;
    this.init();
  }

  init() {
    this.getRectList();
    this.bindEventListener();
  }

  onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) {
      return;
  }
  if (e.target === this.containerElement) {
      return;
  }
    this.isPointerDown = true;
    this.containerElement.setPointerCapture(e.pointerId);
    this.lastPointerMove.x = e.clientX;
    this.lastPointerMove.y = e.clientY;
    this.drag.element = e.target;
    this.drag.element.classList.add("active");
    this.clone.element = this.drag.element.cloneNode(true);
    document.body.appendChild(this.clone.element);
    const index = [].indexOf.call(
      this.containerElement.children,
      this.drag.element
    );
    this.drag.index = index;
    this.drag.firstIndex = index;

    this.clone.x = this.rectList[index].left;
    this.clone.y = this.rectList[index].top;
    this.clone.element.style.transition = "none";
    this.clone.element.className = "clone-item";
    this.clone.element.style.transform = `translate3d(${this.clone.x}px,${this.clone.y}px,0)`;
    for (const item of this.containerElement.children) {
      item.style.transition = "transform 500ms";
    }
  }
  onPointerMove(e) {
    if (this.isPointerDown) {
      this.diff.x = e.clientX - this.lastPointerMove.x;
      this.diff.y = e.clientY - this.lastPointerMove.y;
      for (let i = 0; i < this.rectList.length; i++) {
        if (
          i !== this.drag.index &&
          e.clientX > this.rectList[i].left &&
          e.clientX < this.rectList[i].right &&
          e.clientY > this.rectList[i].top &&
          e.clientY < this.rectList[i].bottom
        ) {
          // 碰到了第 i 个元素
          if (this.drag.index < i) {
            for (let j = this.drag.index; j < i; j++) {
              if (j < this.drag.firstIndex) {
                this.containerElement.children[j].style.transform =
                  "translate3d(0px, 0px, 0)";
              } else {
                const x = this.rectList[j].left - this.rectList[j + 1].left;
                const y = this.rectList[j].top - this.rectList[j + 1].top;
                this.containerElement.children[j + 1].style.transform =
                  "translate3d(" + x + "px, " + y + "px, 0)";
              }
            }
            this.referenceElement = this.containerElement.children[i + 1];
          }
          if (this.drag.index > i) {
            for (let j = i; j < this.drag.index; j++) {
              if (this.drag.firstIndex <= j) {
                this.containerElement.children[j + 1].style.transform =
                  "translate3d(0px, 0px, 0)";
              } else {
                const x = this.rectList[j + 1].left - this.rectList[j].left;
                const y = this.rectList[j + 1].top - this.rectList[j].top;
                this.containerElement.children[j].style.transform =
                  "translate3d(" + x + "px, " + y + "px, 0)";
              }
            }
            this.referenceElement = this.containerElement.children[i];
          }
          const x =
            this.rectList[i].left - this.rectList[this.drag.firstIndex].left;
          const y =
            this.rectList[i].top - this.rectList[this.drag.firstIndex].top;
          this.drag.element.style.transform =
            "translate3d(" + x + "px, " + y + "px, 0)";
          this.drag.index = i;
        }
      }
      this.lastPointerMove.x = e.clientX;
      this.lastPointerMove.y = e.clientY;
      this.clone.x += this.diff.x;
      this.clone.y += this.diff.y;
      this.clone.element.style.transform = `translate3d(${this.clone.x}px,${this.clone.y}px,0)`;
    }
  }
  onPointerUp(e) {
    if (this.isPointerDown) {
      this.isPointerDown = false;

      if (this.referenceElement !== null) {
        this.containerElement.insertBefore(
          this.drag.element,
          this.referenceElement
        );
      }

      this.drag.element.classList.remove("active");
      this.clone.element.remove();

      for (const item of this.containerElement.children) {
        item.style.transition = "none";
        item.style.transform = "translate3d(0px, 0px, 0px)";
      }
    }
  }

  bindEventListener() {
    this.containerElement.addEventListener(
      "pointerdown",
      this.onPointerDown.bind(this)
    );

    this.containerElement.addEventListener(
      "pointermove",
      this.onPointerMove.bind(this)
    );
    this.containerElement.addEventListener(
      "pointerup",
      this.onPointerUp.bind(this)
    );
  }

  getRectList() {
    this.rectList.length = 0;
    for (const item of this.containerElement.children) {
      this.rectList.push(item.getBoundingClientRect());
    }
  }
}
