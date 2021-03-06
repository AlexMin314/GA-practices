// Customer Object
var Customer = function (customerInfo) {
  this.id = customerInfo.id;
  this.name = customerInfo.name;
  this.carRented = null;
};

// Car Object
var Car = function (carInfo) {
  this.id = carInfo.id;
  this.produce = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPricePerDay = carInfo.rentalPrice;
  this.available = true;
  this.customer = null;
  this.rentalDuration = 0;
  this.quotePrice = function (rentalDuration) {
    return this.rentalPricePerDay * rentalDuration;
  };
  this.reserve = function (customer, rentalDuration) {
    if (this.available) {
      this.available = false;
      this.customer = customer;
      this.rentalDuration = rentalDuration;
      return true;
    } else {
      return false;
    }
  };
  this.return = function () {
    if (this.available) {
      return "Sorry, this car have already been returned.";
    } else {
      this.available = true;
      this.customer = null;
      this.rentalDuration = null;
    }
  };
};

// Vendor Object
var Vendor = function (name) {
  this.name = name;
  this.cars = [];
  this.customers = [];

  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function (car) {
      return car.id === carID ? true : false;
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function (customer) {
      return customer.id === customerID ? true : false;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function (car) {
      return car.id === carID ? true : false;
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function (customer) {
      return customer.id === customerID ? true : false;
    });
  };

  // **your code here**
  this.addCar = function(carObj) {
    if (this.getCar(carObj.id)) {
      console.log("ID already exists");
    } else {
      this.cars.push(carObj);
      console.log("Car added to warehouse");
    }
  }

  this.addCustormer = function(customerObj) {
    if (this.getCustomer(customerObj)) {
      console.log("ID already exists");
    } else {
      this.customers.push(customerObj);
      console.log("Customer added to warehouse");
    }
  }

  this.removeCar = function(carID) {
    if (this.findCarIndex(carID) > -1) {
      this.car.splice(this.findCarIndex(carID), 1);
      console.log("Car deleted");
    } else {
      console.log("Car not found");
    }
  }

  this.removeCustomer = function(customerID) {
    if (this.findCustomerIndex(customerID) > -1) {
      this.customers.splice(this.findCustomerIndex(customerID), 1);
      console.log("Customer deleted");
    } else {
      console.log("Customer not found");
    }

  }

  this.availableCars = function() {
    return this.cars.filter(function(e) {return e.available === true; })
  }

  this.rentCar = function(customerID, rentalDuration) {
    if (this.availableCars() === []) {
      console.log("All our cars have been rented");
    } else {
      var theCustomer = this.getCustomer(customerID);
      if(theCustomer) {
        var theCar = this.availableCars()[0];
        theCustomer.carRented = theCar;
        theCar.reserve(theCustomer, rentalDuration);
        console.log("The car has been reserved");
      } else {
        console.log("Please provide a valid customerID");
      }
    }
  }

  this.returnCar = function(customerID) {
    var theCustomer = this.getCustomer(customerID);
    if (theCustomer) {
      theCustomer.carRented.return();
      theCustomer.carRented = null;
      console.log( "Thank you for using our service");
    } else {
      console.log("Please provide a valid customerID");
    }
  }

  this.totalRevenue = function() {
    return console.log('Total revenue is ' + this.cars.reduce(function(a,c) {
      console.log(a,c);
      return a + (c.rentalDuration * c.rentalPricePerDay);
    }, 0));
  }

};


// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};
var customerInfo1 = {
  id: '002',
  name: 'Alex'
}

var customerA = new Customer(customerInfo);
var customerB = new Customer(customerInfo1);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};
var carInfo1 = {
  id: "002",
  producer: "GM",
  model: "Cruze",
  rentalPrice: 300,
};


var carA = new Car(carInfo);
var carB = new Car(carInfo1);

var vendor = new Vendor('Jens Limited');
vendor.addCustormer(customerA);
vendor.addCustormer(customerB);

vendor.addCar(carA);
vendor.addCar(carB);
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 5);
console.log(vendor.availableCars()); // 002 left

vendor.rentCar(customerB.id, 7);
console.log(vendor.availableCars()); // empty array
vendor.totalRevenue(); // 3100

vendor.returnCar(customerA.id);
console.log(vendor.availableCars()); // 001 returned
vendor.totalRevenue(); // 2100
