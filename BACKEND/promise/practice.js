function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = "server side dt";
      if (data) {
        resolve(data);
      } else {
        reject("data not found!!");
      }
    }, 5000);
  });
}

fetchData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
