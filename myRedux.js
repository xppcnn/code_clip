function compose(...funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(args))
  );
}

function createStore(reducer, middleware) {
  let currentState;
  function dispatch(action) {
    currentState = reducer(currentState, action);
  }

  function getState() {
    return currentState;
  }

  dispatch({ type: "INIT" });

  let enhancedDispatch = dispatch;
  if (middleware) {
    enhancedDispatch = compose(...middleware)(dispatch);
  }
  return {
    dispatch: enhancedDispatch,
    getState,
  };
}

const otherDummyMiddleware = (dispatch) => {
  return (action) => {
    console.log(`type in dummy is ${action.type}`);
    return dispatch(action);
  };
};

const typeLogMiddleware = (dispatch) => {
  return ({ type, ...args }) => {
    console.log(`type in middleware is ${type}`);
    return dispatch({ type, ...args });
  };
};

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const counterStore = createStore(counterReducer, [
  typeLogMiddleware,
  otherDummyMiddleware,
]);

console.log(counterStore.getState());

// const logger = store => next => action => {
//   console.log('dispatching', action)
//   return next(action)
// }

const logger = store => {
  return (next) => {
    return (action) => {
      console.log('logger-start')
       next(action)
    }
  }
}

logger('d')