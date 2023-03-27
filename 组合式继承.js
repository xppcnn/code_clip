function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}
Person.prototype.run = function () {
  console.log(this.name + "running");
};

function Student(name, age, sex, friends) {
  // 继承属性
  Person.call(this, name, age, friends);
  this.sex = sex;
}
// 继承方法
Student.prototype = new Person();

Student.prototype.study = function () {
  console.log(this.name + "studying");
};

const stu = new Student("张三", 18, "男",["李四",'王五']);
console.log("🚀 ~ file: 组合式继承.js:18 ~ stu:", stu);
stu.run();
stu.study();
// Person.prototype
console.log(
  "🚀 ~ file: 组合式继承.js:25 ~ Person.prototype:",
  stu,
  stu.__proto__
);
