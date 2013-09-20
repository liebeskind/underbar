/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
  	if (n === undefined) {
  		return array[0]
  	} else {
  		return array.slice(0, n);
  	}
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
 	if (n === undefined) {
 		return array[array.length-1];
 	} else {
 		return array.slice(Math.max(array.length-n, 0), array.length);
 	}
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
  	if (typeof collection === 'object') {
  		for (var prop in collection) {
  			var key = collection[prop];
  			iterator(key, prop, collection);
  		}
  	} else {
  		for (var i = 0; i < collection.length; i++) {
  			var key = collection[i];
  			iterator (key, i, collection);
  		}
  	}
  };
  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.

    var result = -1;
    _.each(array, function(value, index, list){
    	if (value === target && result === -1){
    		result = index*1;
    	}
    })
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
  	var result = []
  	_.each(collection, function(value, index, list){
  		if (iterator(index) === false){
  			result.push(value);
  		}
  	})
  	return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var result = []
    _.each(collection, function(value, index, list) {
    	if (iterator(index) === true){
    		result.push(value)
    	}
    })
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
  	var result = [];
  	_.each(array, function(value, index, list) {
  		if (_.indexOf(result, value) === -1) result.push(value);
  	})
  	return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(array, function(value, index, list) {
    	result.push(iterator(value));
    })
	return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
  	return _.map(array, function(value, index, list){
  		return value[propertyName];
  	})
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
  	var result = [];
  	return _.map(list, function(value, index, list){
  		if (typeof methodName === 'function') {
  			return methodName.apply(value, args);
  		} else {
  			return value[methodName].apply(value, args);
  		}
  	})
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6

  //******* need to review ****** 
  //
  _.reduce = function(collection, iterator, initialValue) {
  	if (initialValue === undefined) initialValue = 0;
  	_.each(collection, function(value, index, list) {
  		initialValue = iterator.call(context, initialValue, value);
  	})
  	return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`). //******* need to review ****** 
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
  	return _.reduce(collection, function(hasItem, item) {
  		if (hasItem) {
  			return true;
  		} else {
  			return target === item;
  		}
  	})
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
   var truthy = true;
   if (iterator === undefined) return true; 
   if (collection === undefined) return true;
   _.reduce(collection, function(elm, index){
   	if (!iterator.call(elm, index)) truthy = false;
   })
   return truthy;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
  	var truthy = false;
  	if (iterator == undefined) iterator = function(value){return value};
  	if (collection === undefined) truthy = false;
  	_.reduce(collection, function(elm, index) {
  		if (iterator.call(elm, index)) return truthy = true 
  	})
  	return truthy;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  	_.each(Array.prototype.slice.call(arguments), function(adding) {
  		_.each(adding, function(value, index) {
  			obj[index] = adding[index];
  		})
  	})
  	return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  	_.each(Array.prototype.slice.call(arguments), function(adding) {
  		_.each(adding, function(value, index) {
  			if (obj[index] === undefined) obj[index] = adding[index];
  		})
  	})
  	return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  
	// TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
      // The new function always returns the originally computed result.
 
  _.once = function(func) {
   var haveCalled;
   var result;
   return function(){
   		if (!haveCalled){
   			haveCalled = true;
   			result = func.apply(this, arguments)
   		} 
	}
	return result;
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  	var result = {};
  	var computed = function(value) {return value};
  	return function() {
  		var keys = computed.apply(this, arguments);
  		if (result.hasOwnProperty(keys)) {
  			return result[keys];
  		} else {
  			return func.apply(this, arguments);
  		}
  	}
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  	var args = Array.prototype.slice.call(arguments, 2)
   	return setTimeout(function() {
   		func.apply(this, args)
   	}, wait);
   };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
  	var holder;
  	var shuffledArray = [];
  	_.each(array, function(value, index, list){	
  		var randomly = Math.ceil(Math.random() * array.length - 1);
  		holder = list[randomly];
  		shuffledArray[randomly] = list[index];
  		shuffledArray[index] = holder; 
  	})
  	return shuffledArray;
   };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
   	_.pluck(_.map(collection, function(value, index, list) {
   		return {
   			value: value,
   			index: index,
   			criteria: iterator.call(context, value, index, list)
   		};
   	}).sort(collection.iterator), iterator);



   		/*.sort(function(a, b) {
   		if (a < b) return 1
   		if (b < a) return -1 
   	});
   	return collection */
  };



  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  	var args = Array.prototype.slice.apply(arguments);
	var result = [];
	
	for (var i = 0; i < args.length; i++) {
		result.push([])
	}	
  	_.each(args, function(value, index, list) {
  		_.each(value, function(value2, index2, list2) {
  			 result[index2].push(value2); 
  		})
  	})
  	return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  
  };

}).call(this);
