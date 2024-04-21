'use strict';
/*
const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person);

//Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
//This function is not on the jonas instance but on Person but each instance has access to the prototype

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));
//Species belongs to the prototype and not the instance itself

console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);

const arr = [3, 3, 4, 5, 8, 4, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
////////////////////////////////////////////////
////CHALLENGE 1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.speed}`);
};

Car.prototype.brake = function (speed) {
    this.speed -= 5;
    console.log(`${this.speed}`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.accelerate();
car1.accelerate();
car1.brake();
////////////////////////////////
//class expression
//const PersonCl2 = class{}
//class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
}

// Methods will be added to .prototype property
calcAge() {
    console.log(2037 - this.birthYear);
  }
  
  get age() {
      return 2037 - this.birthYear;
    }
    
    set fullName(name) {
        console.log(name);
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }
    
    get fullName() {
        return this._fullName;
    }
    
    //Static method
    static hey() {
        console.log('Hey there 👋');
        console.log(this);
    }
}

const jessica = new PersonCl('Jessica Davis', 1996);

console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.__proto__ === PersonCl.prototype);

// This will work the same as calcAge creation
PersonCl.prototype.greet = function () {
    console.log(`Hey ${this.fullName}`);
};

jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are excuted in strict mode
const walter = new PersonCl('Walter White', 1965);
PersonCl.hey();

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
      return this.movements.slice(-1).pop();
    },
    
    set latest(mov) {
        this.movements.push(mov);
    },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },
    
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();


///////////////////////////
////// CHALLENGE 2//////////////////

class CarCl {
    constructor(make, speed) {
    this.make = make;
    this.speed = speed;
}

accelerate() {
    this.speed += 10;
    console.log(`${this.speed}`);
}

brake() {
    this.speed -= 5;
    console.log(`${this.speed}`);
}

get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
      this.speed = speed * 1.6;
    }
}

const ford = new CarCl('ford', 120);
console.log(ford.speedUS);
ford.accelerate();
////////////////////////////////////

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

////////////////////////////////////////////
/////////CHALLENGE 3//////////////////////

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
  console.log(`${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.speed}`);
};

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(
        `${this.make} is going ${this.speed} with a charge of ${this.charge}`
    );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();

// Inheritance Between "Classes: eS6 Classes"

class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    
    calcAge() {
        console.log(2037 - this.birthYear);
    }
    
    greet() {
        console.log(`Hey, ${this.fullName}`);
    }
    
    get age() {
        return 2037 - this.birthYear;
    }
    
    set fullName(name) {
        console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
}

get fullName() {
    return this._fullName;
}

static hey() {
    console.log(`Hey there 👋`);
}
}

class Studentl extends PersonCl {
    constructor(fullName, birthYear, course) {
        // ALways needs to happen first! To access this keyword
        super(fullName, birthYear);
        this.course = course;
    }
    
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }
    
    calcAge() {
        console.log(
            `I'm ${2037 - this.birthYear} but I feel much older as a student!`
        );
    }
}

const martha = new Studentl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

const PersonProto = {
    calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');

jay.introduce();
jay.calcAge();

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods

class Account {
    //Public fields (instances)
    locale = navigator.language;
    
    //Private fields (instances)
    #movements = [];
    #pin;
    
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        //protected property
        this.#pin = pin;
        //this._movements = [];
        //this.locale = navigator.language;
        
        console.log(`Thanks for opening an account, ${owner}`);
    }

  // 3) Public methods
  //Public interface
  getMovements() {
      return this.#movements;
    }
    
    deposit(val) {
    this.#movements.push(val);
    return this;
}

withdraw(val) {
    this.deposit(-val);
    return this;
}

requestLoan(val) {
    if (this._approveLoan(val)) {
        this.deposit(val);
        console.log(`Loan approved`);
        return this;
    }
}

// 4) Private methods
//   #approveLoan(val) {
    _approveLoan(val) {
        return true;
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111, []);

//acc1.#movements.push(250);
//acc1.#movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
//acc1.#approveLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
//console.log(acc1.#pin);

//Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
*/
//////////////////////////////////////////
////CHALLENGE 4/////////////////////////////

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.speed}`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.speed}`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going ${this.speed} with a charge of ${this.#charge}`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
