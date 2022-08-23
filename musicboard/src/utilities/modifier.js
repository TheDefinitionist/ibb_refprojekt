// Utils

import { FaFeather } from "react-icons/fa"

/** Utils (c) 2022 Thielicious | github.com/thielicious
 * 
 * Personal utility class with diverse tools for brevity
 * @function setMax(max = Number): Void
 * @function shorten(txt = String): String
 * @function setActive({location = String, active = Object, inactive = Object}): Object
 * @function activeStyle({location = String, active = Object, inactive = Object}): Object
 */

class Utils {

   static max = null
   static location = null
   static active = null
   static inactive = null

   /** Set the maximum limit to shorten a string
    * @param max Number
    * @return void
    */
   static setMax(max = Number) {

      Utils.max = max
   }

   /** Shorten a String by setting a maximum limit
    * @param txt String
    * @return String
    */
   static shorten(txt = String) {
      
      const max = Utils.max
      
      return txt.length >= max && txt.slice(0, max) + '...'
   }

   /** Assign properties to elements and styles
    * @param Object location String
    * @param Object active Object
    * @param Object inactive Object
    * @return Void
    */
   static setActive({location, active, inactive}) {

		Utils.location = location
      Utils.active = active
      Utils.inactive = inactive
   }

   /** Style an active and inactive element
    * @param path String
    * @return Object
    */
   static activeStyle(path) {

      if (Utils.location && Utils.active && Utils.inactive) {
         return Utils.location === path ?
            Utils.active : Utils.inactive
      }
   }
}

export default Utils