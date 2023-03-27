const ob = new IntersectionObserver(
  (observerEntry) => {
    console.log("🚀 ~ file: intersectionObServe.js:3 ~ observerEntry:", observerEntry)
    observerEntry.forEach((item) => {
      if (item.isIntersecting) {
        item.target.src = item.target.getAttribute("data-src");
        ob.unobserve(item.target);
      }
    });
  },
  {root: document.getElementById('container') }
);

const domList = document.querySelectorAll(".lazyImg");
for (const dom of domList) {
  ob.observe(dom);
}
