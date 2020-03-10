/*
 Author: Shashank Pandey
 github: https://github.com/shashankpandey2012
 */

var loaded = false
var list = []
var listAll = []

var load = function (callback) {
  if (loaded) {
    callback(null, list)
  } else {
    callback(null, [])
  }
}

module.exports = {
  load: load,
  list: function () {
    return list
  },
  listAll: function () {
    return listAll
  }
}
