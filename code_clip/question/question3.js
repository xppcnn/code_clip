/**
 * 使用Promise封装AJAX请求
 */

function requestData(url, method, ...args) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onreadystatechange = () => {
      if(xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    xhr.onerror = () => {
      reject(new Error(xhr.statusText));
    };
    xhr.send();
  });
}

const promise = requestData("https://developer.mozilla.org/", "GET");
promise.then(res => console.log(res))
