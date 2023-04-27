// addTwo.mjs
export const addTwo = num => num + 2;

export const addTwoAsync = async num =>
  await new Promise((resolve, _reject) =>
    setTimeout(() => {
      resolve(num + 2);
    }, 1000));
