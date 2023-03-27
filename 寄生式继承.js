function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}
Person.prototype.run = function () {
  console.log(this.name + "running");
};