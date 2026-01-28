let book = {
  title: ["abc","pqr","xyz"],
  author: ["alpha","beta","gamma"],
  price: [1500,1200,500],
};

let person = {
  name: "Asha",
  age: 25,
  city : "Mumbai"
};

let mobile = {
  brand: "Vivo",
  model: "x200 Pro",
  color: "Starlight White"
};

let car = {
  brand: "Rolls Royce",
  model: "Phantom",
  year: 2023
};

console.log(book.title[1])
console.log(person.name , person["city"])
mobile.color="Phantom White"
mobile.price = 89000
console.log(mobile)

if ("year" in car) {
  console.log("year exists");
} else {
  console.log("year doesnt exist");
}

let student = {
  name: "Ashu",
  class: "First Year",
  marks: 80,
  submarks: {maths:99,science:98,english:4},
  result: [function getMarks() {if (this.marks >= 35) {return "Pass";} else {return "Fail"}}, 
    function subm() {
      let total=0;
      for (let key in this.submarks) {
        total += this.submarks[key]
      }
      return total;
    }]
  };

console.log(JSON.stringify(mobile))



console.log(student.result[0].call(student));
console.log(student.result[1].call(student));

