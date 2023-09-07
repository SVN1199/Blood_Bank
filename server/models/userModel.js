const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userType : {
        type : String,
        required : true,
        enum : ['donar','hospital','organisation','admin']
    },

    // is required if userType is  donar or admin
    name :{
        type : String,
        required : function(){
            if(this.userType=='donar' || this.userType=='admin'){
                return true
            }
            return false
        }
    },
    // is required if userType is  hospital
    hospitalName : {
        type : String,
        required : function(){
            if(this.userType=='hospital'){
                return true
            }
            return false
        }
    },

    // is required if userType is  organisation
    organisationName : {
        type : String,
        required : function(){
            if(this.userType=='organisation'){
                return true
            }
            return false
        }
    },
    // is required if userType is  organisation or hospital
    website : {
        type : String,
        required : function(){
            if(this.userType=='organisation' || this.userType=='hospital'){
                return true
            }
            return false
        }
    },
    address : {
        type : String,
        required : function(){
            if(this.userType=='organisation' || this.userType =='hospital'){
                return true
            }
        }
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('users', userSchema)