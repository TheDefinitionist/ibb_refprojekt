// Modifier.js

class Utils {

   static max = null

   static setMax(max) {
      Utils.max = max
   }

   static shorten(txt) {
      const max = Utils.max
      let min = ['test', 82, Infinity]
      
      return txt.length >= max && txt.slice(0, max) + '...'
   }
}

export default Utils