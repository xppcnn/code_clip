const interceptors = {
  request: [
    {
      fulfilled: (config1) => {
        //设置请求头
        config1.headers = {
          "Content-Type": "application/json",
          ...config1.headers,
        };

        return config1;
      },
      rejected: (error) => {
        return Promise.reject(error);
      },
    },
    {
      fulfilled: (config) => {
        //设置请求头
        config.headers = {
          "Content-Type1": "application/json",
          ...config.headers,
        };

        return config;
      },
      rejected: (error) => {
        return Promise.reject(error);
      },
    },
  ],
  response: [
    {
      fulfilled: (response1) => {
        console.log("response1:", response1);
        return response1;
      },
      rejected: (error) => {
        return Promise.reject(error);
      },
    },
    {
      fulfilled: (response2) => {
        console.log("response2:", response2);
        return response2;
      },
      rejected: (error) => {
        return Promise.reject(error);
      },
    },
  ],
};
const config = {
  headers: {
    dddd: "ddd33",
  },
};
const requestInterceptorChain = [];
interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
  requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
});
const responseInterceptorChain = [];
interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
  responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
});

let promise;
let i = 0;
let len;

const chain = [()=>{console.log('33333')}, undefined];
chain.unshift.apply(chain, requestInterceptorChain);
chain.push.apply(chain, responseInterceptorChain);
len = chain.length;

promise = Promise.resolve(config);

while (i < len) {
  promise = promise.then(chain[i++], chain[i++]);
}

len = requestInterceptorChain.length;

let newConfig = config;

i = 0;

while (i < len) {
  const onFulfilled = requestInterceptorChain[i++];
  const onRejected = requestInterceptorChain[i++];
  try {
    newConfig = onFulfilled(newConfig);
  } catch (error) {
    onRejected.call(this, error);
    break;
  }
}

try {
  promise = Promise.resolve(newConfig);
  console.log("🚀 ~ file: axios.js:44 ~ newConfig:", newConfig);
} catch (error) {
  return Promise.reject(error);
}

i = 0;
len = responseInterceptorChain.length;

while (i < len) {
  promise = promise.then(
    responseInterceptorChain[i++],
    responseInterceptorChain[i++]
  );
}

promise;
console.log("🚀 ~ file: axios.js:59 ~ promise:", promise);
