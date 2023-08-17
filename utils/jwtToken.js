// creating token and saving cookie  
const sendToken = (user , message , statuscode , res)=>{
    // console.log("hii 1");
    const token = user.getJWTToken();
    // options for cookie
    const options = {
        // expires : new Date(
        //     Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        // ),
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        secure: true,    // mandatory method to not have secure keyword in postman or thunderclient  i.e. have secure=false in postman //  (we will add secure in frontend)-mandatory-also in backend heruko or any other server while hosting/deployment (even if we only host backend then also add secure true )
        sameSite: "none",  // I don't know why sameSite is use and where does it use , but when i use I was 
        //  secure: true, 
    };

    res.status(statuscode).cookie("token", token , options).json({
        success:true,
        user , 
        message,
        token
    })

}

module.exports = sendToken;  






