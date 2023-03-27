function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.run = function () {
  console.log(this.name + "running");
};

function inheritPrototype(subClass, superClass) {
  let prototype = Object.create(superClass.prototype); // 原型注入，方法继承
  prototype.constructor = subClass;
  subClass.prototype = prototype;
}
function Student(name, age, sex) {
  Person.call(this, name, age); // 属性继承
  this.sex = sex;
}

function createStudent(name, age, sex) {
  inheritPrototype(Student, Person);
  return new Student(name, age, sex);
}

const stu = createStudent("张三", 18, "男");
stu.run();
console.log("🚀 ~ file: 寄生组合式继承.js:11 ~ stu:", stu);
