const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/photoapp',{
     useNewUrlParser:true
 })
.then(db=> console.log(`DB is connected 🍃`))
.catch(e=>console.log(e));
