// Utils:Modifier

class Utils {

   static max = null

   static setMax(max) {

      Utils.max = max
   }

   static shorten(txt) {
      
      const max = Utils.max
      
      return txt.length >= max && txt.slice(0, max) + '...'
   }
}

export default Utils