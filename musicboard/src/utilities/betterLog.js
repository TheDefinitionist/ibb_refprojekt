/*
   [betterLog] v1.0
   ------------------
   - console.log extension with style setup, toggle mode and filename display

   (c) Thielicious
   https://github.com/thielicious
*/

// Package to work with the filename
import path from 'path-browserify'

class betterLog {
   
   /** Initial configuration
    * 
    * @param object
    * @return void
    */
   constructor (config) {
     
      this.debug = config.debug || false
      this.filenameStyle = config.style || 'padding:3px;color: lightblue; background-color: navy'
      this.scriptFile = config.import
   }

   /** Style filename in CSS syntax
    * 
    * @param string
    * @return void
    */
   setFilenameStyle (style) {

      this.filenameStyle = style
   }

   /** Logs the content together with the setup
    * 
    * @param any
    * @return console
    */
   log (msg) {

      if (this.debug && this.filenameStyle && this.scriptFile) {
         const filename = path.basename(this.scriptFile).replace(/\?.+/, '')

         return console.info('%c'+filename, this.filenameStyle , msg)
      }
   }
}

export default betterLog
//export default new betterLog({ debug: true })