function task1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("task1 completed");
      resolve();
    }, 5000);
  });
}

function task2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("task2 completed");
      resolve();
    }, 5000);
  });
}

function task3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("task3 completed");
      resolve();
    }, 5000);
  });
}

async function getData() {
  try {
    await task1();
    Promise.all([task2(), task3()]);
  } catch (error) {}
}

getData();
