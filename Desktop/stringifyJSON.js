// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:


var stringifyJSON = function(obj) {
  var stringJSON = '';
  var arrayJSON = [];
  var objectJSON = {};

// BASE CASE for Primitives
  if (obj === null || typeof obj === "number" || typeof obj === "boolean") {
  	return '' + obj;
  } else if (typeof obj !== "object") {
  	if (typeof obj === "string") {
  		return '\"' + obj + '\"';
  	} 
  }
// If ARRAY OBJECT
	else if (Array.isArray(obj)) {
		if (obj.length === 0) {
			return "[]";
		} else {
		    obj.forEach(function(index) {
          arrayJSON.push(stringifyJSON(index));
		    });
		  return '[' + arrayJSON + ']';
		}
	}
// If True Object
  else if (obj instanceof Object) {
  	var keys = Object.keys(obj);
  	var objString = '';
  	var denyArray = [];
  	if (keys.length === 0) {
  		return "{}";
  	} else {
  		keys.forEach(function(key) {
  			var objKey = '"' + key + '"';
  			var objValue = stringifyJSON(obj[key]);
  			// Will push the Obj[key] into the DenyArray if it is unstringifiable.
  			if (obj[key] instanceof Function || typeof obj[key] === undefined) {
  				denyArray.push(obj[key]);
  			} else {
          objString += objKey + ":" + objValue + ",";
        }
  		});
  	// If there has been any unstringfiable strings, the denyArray.length will be 1+ and an empty object will be returned. Otherwise, the stringified Output will produce.
        if (denyArray.length > 0) {
  	      return '{}';
        } else {
  	      return '{' + objString.slice(0, -1) + '}';
        }
    }
  }
}