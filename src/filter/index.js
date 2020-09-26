export default {
  imgpath: function (val, pix = "http://localhost:3030") {
    return pix + val
  },
  math: function (val) {
    if (val > 1000) {
      var sen = val / 1000
      var num = sen.toFixed(1)
      return num + 'K'
    } else {
      return val
    }
  },
  percentage: function (val) {
    return val.toFixed(2) * 100
  },
  price: function (val) {
    if (val > 1000) {
      var x = val.toFixed(2).toString().split(".")[1]
      var y = (Math.floor(val) / 1000).toString().split(".")
      var num = y[0] + ',' + y[1] + '.' + x
      return num
    } else {
      return val.toFixed(2)
    }
  }
}