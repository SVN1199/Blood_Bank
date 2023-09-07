import moment from 'moment'

export const getLoggedInUsers = (user) => {
    if(user.userType==='donar'){
        return user.name
    }else if(user.userType==='hospital'){
        return user.hospitalName
    }else if(user.userType==='organisation'){
        return user.organisationName
    }
}

export const getAntdInputValidation =()=>{
    return[
        {
            required : true,
            message : "Required"
        }
    ]
}

export const getDateFormat = (date) =>{
    return moment(date).format("DD MMM YYYY hh:mm A")
}