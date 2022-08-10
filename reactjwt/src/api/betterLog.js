/*
   [betterLog] 
   - console.log extension with style setup and filename display
   (c) Thielicious
   thielicious.github.io
   -----------------
*/

// package to work with the filename
import path from 'path-browserify'

class betterLog {
   
   // Initial configuration
   constructor (config) {
     
      this.debug = config.debug || false
      this.filenameStyle = config.style || 'padding:3px;color: lightblue; background-color: navy'
      this.scriptFile = config.import
   }

   // Style filename in CSS syntax
   setFilenameStyle (style) {

      this.filenameStyle = style
   }

   // logs the content together with the enhanced options
   log (msg) {

      if (this.debug && this.filenameStyle) {

         const filename = path.basename(this.scriptFile).replace(/\?.+/, '')
         return console.info('%c'+filename, this.filenameStyle , msg)
      }
   }
}

export default betterLog
//export default new betterLog({ debug: true })