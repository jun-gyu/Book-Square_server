const Logger = require('./logger');
const connect = require('./mongodb')
const expressLoader = require('./express')



module.exports= app =>{
    console.log("im in the loaders index hahah")
//  connect()
 console.log(1)
 Logger.info("DB loaded and connected")
 console.log(2)
 expressLoader(app)
 console.log(3)
 Logger.info("Express loaded")

}