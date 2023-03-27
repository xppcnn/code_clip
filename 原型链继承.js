function Person() {}
Person.prototype.run = function () {
  console.log("running");
};

function Student(age) {
  Person.call(this);
  this.age = age;
}

const stu1 = new Student(10);

const stu2 = new Student(20);

stu1.run() // 报错
console.log("🚀 ~ file: 原型链继承.js:14 ~ stu1:", stu1, stu2);
