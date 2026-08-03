class A {
  dairyMilk() {
    console.log("Dairy milk A");
  }
}

class B extends A {
  dairyMilk() {
    console.log("Dairy milk B");
  }
}

class C extends B {
  dairyMilk() {
    console.log("Dairy milk C");
  }
}

//MULTIPLE IS IMPOSSIBLE (in js and java)
//you can do hierarichal by class c extends B

aa = new A();
bb = new B();
cc = new C();

aa.dairyMilk();
bb.dairyMilk();
cc.dairyMilk();
