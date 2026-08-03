class A {
  add(a, b) {
    console.log("2 parameter");
  }
  add(a, b, c) {
    console.log("3 parameter");
  }
  add(a, b, c, d) {
    console.log("4 parameter");
  }
}

aa = new A();

aa.add(4, 5);

//this is method overloading
