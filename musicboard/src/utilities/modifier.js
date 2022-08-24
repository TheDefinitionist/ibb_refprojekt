// Utils

/** 
 * @author Utils (c) 2022 Thielicious | github.com/thielicious
 * 
 * @description Personal utility class with diverse tools for brevity
 * @function setMax(max = Number): Void
 * @function shorten(txt = String): String
 * @function setActive({location = String, active = Object, inactive = Object}): Object
 * @function activeStyle({location = String, active = Object, inactive = Object}): Object
 */

class Utils {

   /** @type {number} default: 50 */
   static max = 50
   /** @type {string} */
   static location
   /** @type {object} */
   static active
   /** @type {object} */
   static inactive

   /** 
    * Set the maximum limit to shorten a string
    * 
    * @param {number} max
    * @returns {void}
    */
   static setMax(max) {

      Utils.max = max
   }

   /**
    * Shorten a String by setting a maximum limit
    *
    * @param {string} txt
    * @returns {string}
    */
   static shorten(txt) {
      const max = Utils.max
      
      return txt.length >= max && txt.slice(0, max) + '...'
   }

   /**
    * Assign properties to elements and styles
    * 
    * @param {string} {location
    * @param {object} active
    * @param {object} inactive}
    * @returns {void}
    */
   static setActive({location, active, inactive}) {

		Utils.location = location
      Utils.active = active
      Utils.inactive = inactive
   }

   /**
    * Style an active and inactive element
    * 
    * @param {string} path
    * @returns {object}
    */
   static activeStyle(path) {
      if (Utils.active && Utils.inactive) {
         
         return Utils.location === path ? Utils.active : Utils.inactive
      }
   }
}

export default Utils