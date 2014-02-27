_.mixin({

 // Return a copy of an object containing all but the blacklisted properties.
  unpick: function (obj) {
    obj || (obj = {});    
    return _.pick(obj, _.difference(_.keys(obj), _.flatten(Array.prototype.slice.call(arguments, 1))));
  }

});
