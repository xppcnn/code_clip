const containerEle = document.getElementById("container");
containerEle.addEventListener("scroll", handleScroll);

function handleScroll() {
  const imgs = document.querySelectorAll('img[data-src]')
  imgs.forEach((item,index) => {
    const rect = item.getBoundingClientRect()
    console.log("🚀 ~ file: scrollLazy.js:8 ~ imgs.forEach ~ rect:", rect,index)
  })
}
