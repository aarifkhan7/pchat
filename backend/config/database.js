import mongoose from 'mongoose';

const databaseConnect = () => {
     mongoose.connect("mongodb+srv://prajwalgawai909:Networld@cluster0.hta6f7w.mongodb.net/messenger?retryWrites=true&w=majority",{
          useNewUrlParser : true,
          useUnifiedTopology : true
     }).then(()=>{
          console.log('Mongodb Database Connected')
     }).catch(error=>{
          console.log(error)
     })
}
// module.exports = databaseConnect;
export default databaseConnect;