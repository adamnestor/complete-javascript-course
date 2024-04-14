'use strict';

/*
const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

const flight = 'LH234';
const jonas = {
    name: 'Jonas Schmedtmann',
    passport: 14739479284,
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;
    
    if (passenger.passport === 14739479284) {
        alert('Check in');
    } else {
        alert('Wrong passport');
    }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// // Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);


const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(str);
  console.log(`Transformed string: ${fn(str)}`);
  
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('✋');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Challenege

const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Adam');


const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};

lufthansa.book(239, 'Adam Nestor');
lufthansa.book(635, 'John Smith');
console.log(lufthansa.bookings);

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const book = lufthansa.book;

//Does not work
// book(23, 'Sarah Williams');

//Call Method
book.call(eurowings, 23, 'Srah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

//Apply Method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// Bind Method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Adam Nestor');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    
    this.planes++;
    console.log(this.planes);
};

document
.querySelector('.buy')
.addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));
console.log(addVAT(23));

//Challenge

const addTaxRate = function (rate) {
    return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));


////////CHALLENGE 1////////////////////////////////
////////////////////////////////////////////////////
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  
  //Task 1
  //Get Answer
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);
    
    //Register Answer
    typeof answer === 'number' &&
    answer < this.answers.length &&
    this.answers[answer]++;
    
    this.displayResults();
    this.displayResults('string');
  },
  
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
.querySelector('.poll')
.addEventListener('click', poll.registerNewAnswer.bind(poll));
//////////////////////////////
const runOnce = function () {
  console.log('This will never run again');
};

runOnce;

//Immediate invoked function expression IIFE
(function () {
  console.log('This will never run again');
})();

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}

console.log(notPrivate);

////// Closures

const secureBooking = function () {
  let passengerCount = 0;
  
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);


let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

//Example
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 5);
*/

//////// CHALLENGE 2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

//By the time this callback here is executed, this IIFE is now long gone. It has already been excuted. And with it, this variable (header) is basically gone as well. But this function that we wrote is attached to the body element. And so it's waiting for some events to happen there. And when the events happen then this function is of course, executed. And, even thought this environment in which this function was created is already gone, it is still able to access the variables that were created in that variable by the time the function was born, so to say. We can say the header is in the backpack of this function.
