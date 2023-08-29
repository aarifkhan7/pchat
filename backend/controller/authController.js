// const formidable = require('formidable');
// const validator = require('validator');
// const registerModel = require('../models/authModel');
// const fs = require('fs');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const console = require('console');
 

// module.exports.userRegister = (req, res) => {

//      const form = formidable();
//      form.parse(req, async (err, fields, files) => {

//      const {
//           userName, email, password,confirmPassword
//      } = fields;

//      const {image} = files;
//      const error = [];

//      if(!userName){
//           error.push('Please provide your user name');
//      }
//      if(!email){
//           error.push('Please provide your Email');
//      }
//      if(email && !validator.isEmail(email)){
//           error.push('Please provide your Valid Email');
//      }
//      if(!password){
//           error.push('Please provide your Password');
//      }
//      if(!confirmPassword){
//           error.push('Please provide your confirm Password');
//      }
//      if(password && confirmPassword && password !== confirmPassword){
//           error.push('Your Password and Confirm Password not same');
//      }
//      if(password && password.length < 6){
//           error.push('Please provide password mush be 6 charecter');
//      }
//      if(Object.keys(files).length === 0){
//           error.push('Please provide user image');
//      }
//      if(error.length > 0){
//           res.status(400).json({
//                error:{
//                     errorMessage : error
//                }
//           })
//      } else {
//           const getImageName = files.image.originalFilename;
//           const randNumber = Math.floor(Math.random() * 99999 );
//           const newImageName = randNumber + getImageName;
//           files.image.originalFilename = newImageName;

//           const newPath = __dirname + `../../../frontend/public/image/${files.image.originalFilename}`;

//      try {
//           const checkUser = await registerModel.findOne({
//                email:email
//           });
//           if(checkUser) {
//                res.status(404).json({
//                     error: {
//                          errorMessage : ['Your email already exited']
//                     }
//                })
//           }else{
//                fs.copyFile(files.image.filepath,newPath, async(error) => {
//                     if(!error) {
//                          const userCreate = await registerModel.create({
//                               userName,
//                               email,
//                               password : await bcrypt.hash(password,10),
//                               image: files.image.originalFilename
//                          });

//                          const token = jwt.sign({
//                               id : userCreate._id,
//                               email: userCreate.email,
//                               userName: userCreate.userName,
//                               image: userCreate.image,
//                               registerTime : userCreate.createdAt
//                          }, process.env.SECRET,{
//                               expiresIn: process.env.TOKEN_EXP
//                          }); 

// const options = { expires : new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000 )}

//      res.status(201).cookie('authToken',token, options).json({
//           successMessage : 'Your Register Successful',token
//      })

                          
//                     } else {
//                          console.log(error);
//                          res.status(500).json({
                             
//                               error: {
//                                    errorMessage : ['Interanl Server Error1']
//                               }
//                          })
//                     }
//                })
//           }

//      } catch (error) {
          
//           res.status(500).json({
//                error: {
                    
//                     errorMessage : ['Interanl Server Error2']
//                }
//           })

//            } 

               
//           } 
          
//      }) // end Formidable  
    
// }

// module.exports.userLogin = async (req,res) => {
//       const error = [];
//       const {email,password} = req.body;
//       if(!email){
//           error.push('Please provide your Email');
//      }
//      if(!password){
//           error.push('Please provide your Passowrd');
//      }
//      if(email && !validator.isEmail(email)){
//           error.push('Please provide your Valid Email');
//      }
//      if(error.length > 0){
//           res.status(400).json({
//                error:{
//                     errorMessage : error
//                }
//           })
//      }else {

//           try{
//                const checkUser = await registerModel.findOne({
//                     email:email
//                }).select('+password');

//                if(checkUser){
//                     const matchPassword = await bcrypt.compare(password, checkUser.password );

//                     if(matchPassword) {
//                          const token = jwt.sign({
//                               id : checkUser._id,
//                               email: checkUser.email,
//                               userName: checkUser.userName,
//                               image: checkUser.image,
//                               registerTime : checkUser.createdAt
//                          }, process.env.SECRET,{
//                               expiresIn: process.env.TOKEN_EXP
//                          }); 
//       const options = { expires : new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000 )}

//      res.status(200).cookie('authToken',token, options).json({
//           successMessage : 'Your Login Successful',token
//      })

//                     } else{
//                          res.status(400).json({
//                               error: {
//                                    errorMessage : ['Your Password not Valid']
//                               }
//                          })
//                     }
//                } else{
//                     res.status(400).json({
//                          error: {
//                               errorMessage : ['Your Email Not Found']
//                          }
//                     })
//                }
                

//           } catch{
//                res.status(404).json({
//                     error: {
//                          errorMessage : ['Internal Sever Error3']
//                     }
//                })

//           }
//      }

// }

// module.exports.userLogout = (req,res) => {
//      res.status(200).cookie('authToken', '').json({
//           success : true
//      })
// }













import formidable from "formidable";
import validator from "validator";
// import registerModel from"../models/authModal.js"
import registerModel from "../models/authModel.js";
import fs, { copyFile } from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





import * as url from 'url';                                                                         //for __dirname
const __filename = url.fileURLToPath(import.meta.url);




export const userRegister = async (req, res) => {
  console.log("register is working, form has been submitted");
  const form = formidable();
  

 

 

  form.keepExtensions = false;



  form.parse(req, async (err, fields, files) => {
  
const{
  userName, email, password, confirmPassword
}=fields

const {image}=files;
// const {}
console.log("👇👇👇👇👇👇👇👇👇");
console.log(image);
// image.Path=toString(image.);
// console.log("image is :");

// console.log(image);
const error=[]

console.log("username is"+userName+"email is"+email+"password is"+password);

console.log(fields);

if(!userName){
  error.push('please provide your userName');
}
if(!email[0]){
  error.push("Please provide your user name");
}
if(email[0] && !validator.isEmail(email[0])){
  // console.log("email is ");
  
  // console.log(email);
  error.push("please provide your valid email");
}
console.log("ppppppppppp😊😊😊😊😊1");
if(!password[0]){
  error.push('please provide password');
}
if(!confirmPassword[0]){
  error.push('please provide confirmPassword');
}
if(password[0] && confirmPassword[0] && password[0]!==confirmPassword[0]){
  error.push("Your password and cofirmPassword are not same");
}

if(password[0] && password[0].length<6){
  error.push("Please provide password, must be 6 character")
}
if(Object.keys(files).length===0){
  error.push("please provide image");
}

console.log("❌ ");

if(error.length>0){
  res.status(400).json({error:{
    errorMessage:error
  }})
}else{
  // console.log("error prajwal");
  // console.log("files is"+files[0]);


// const [getImageName] = image;     //changed


const randNumber=Math.floor(Math.random()*99999);





// console.log('💬'+image.Original);
let newImageName=randNumber+image[0].originalFilename;
newImageName=newImageName.replace(/\s/g, "");
image[0].originalFilename=newImageName;


const newPath = url.fileURLToPath(new URL(`../../frontend/public/image/${image[0].originalFilename}`, import.meta.url)); //suppose this image is present in the image folder now it is creating path for that image

// console.log(newPath);
try{
  console.log(newPath);
  const checkUser=await registerModel.findOne({
    email:email
  });
  if(checkUser){

    console.log("here I am line 91");
    res.status(404).json({
      error:{
        errorMessage:["your email already existed"]
      }
    })
  }
  else{
    console.log("ppppppppppp😊😊😊😊😊0998");
  fs.copyFile(image[0].filepath, newPath ,async(error)=>{
    if(!error){
      console.log("here I am line 94");


      const userCreate=await registerModel.create({
        userName:userName[0],
        email:email[0],
        password:await bcrypt.hash(password[0], 10),
        image:image[0].originalFilename
      });

      const token =jwt.sign({
        id:userCreate._id,
        email:userCreate.email,
        userName:userCreate.userName,
        image:userCreate.image,
        registerTime:userCreate.createdAt
      }, process.env.SECRET,{
        expiresIn:process.env.TOKEN_EXP
      } );
    
const options={expires:new Date(Date.now()+process.env.COOKIE_EXP*24*60*60*1000)}                                        //milisec
console.log("registration successful");
console.log(token);
res.status(201).cookie('authToken', token, options).json({
  successMessage:"Your Registration Successful",token
})



      // console.log("registration successfull..");
    }else{
      console.log("error of image is"+error);
      res.status(500).json({
        error:{
          errorMessage:["internal server error in authcontroller"]
        }
      })
    }
  })
}



}catch(error){
res.status(500).json({
  error:{
    errorMessage:["internal server error in authcontroller"]
  }
})
}


// console.log(getImageName.originalFilename);
// console.log(newImageName);

}});    //  end of formidable
};

export const userLogin= async(req, res)=>{
const error=[];
const {email, password}=await req.body;

// console.log(await req.body);
// console.log(password);

console.log("here I am in login"+email+" "+password);

if(!email){
  error.push("please provide your Email");
}
if(!password){
  error.push("please provide valid password");
}
if(email && !validator.isEmail(email)){
  error.push("please provide proper email");
}
if(error.length>0){
  res.status(400).json({
    error:{
      errorMessage:error
    }
  })
}else{
  try{
    const checkUser=await registerModel.findOne({
      email:email
    }).select('+password');
if(checkUser){
  console.log("before matchpass hii"+checkUser);
  const matchPassword=await bcrypt.compare(password, checkUser.password);
if(matchPassword){
  console.log("password is smae hii");
  const token =jwt.sign({
    id:checkUser._id,
    email:checkUser.email,
    userName:checkUser.userName,
    image:checkUser.image,
    registerTime:checkUser.createdAt
  }, process.env.SECRET,{
    expiresIn:process.env.TOKEN_EXP
  } );

  // const options={expires:new Date(Date.now()+process.env.COOKIE_EXP*24*60*60*1000)}                                        //milisec
  
  const options={expires:new Date(Date.now()+7*24*60*60*1000)}                                        //milisec
  res.status(200).cookie('authToken', token, options).json({
    successMessage:"Your Login Successful",token
  })
  console.log("suceesfully login");


}else{
  res.status(400).json({
    error:{
      errorMessage:['Your Password not valid']
    }
  })
}

}else{
  res.status(400).json({
    error:{
      errorMessage:['Your Email not found']
    }
  })
}


    // console.log(checkUser);
  }catch(err){
    console.log(err);
    res.status(404).json({
      error:{
        errorMessage:['Internal server error authcontroller']
      }
    })
  }
}

}

export const userLogout = (req,res) => {
  res.clearCookie("authToken");
     res.status(200).json({
          success : true
     })
}


export const deleteMyAccount=async(req, res)=>{
  try {
    const deletedDocument = await registerModel.findByIdAndDelete(req.body.body);
    // Handle successful deletion
  } catch (error) {
    console.log(error);
    // Handle error
  }
}







export const profileImgChange=(req, res)=>{
  
  const form = formidable();

  form.keepExtensions = false;

  form.parse(req, async (err, fields, files) => {
// console.log("parese data is");
   
const {iurl}=files;
// console.log("iurl is "+iurl);

const randNumber=Math.floor(Math.random()*99999);
let newImageName=randNumber+iurl[0].originalFilename;
newImageName=newImageName.replace(/\s/g, "");
iurl[0].originalFilename=newImageName;




const newPath = url.fileURLToPath(new URL(`../../frontend/public/image/${iurl[0].originalFilename}`, import.meta.url)); //suppose this image is present in the image folder now it is creating path for that image

fs.copyFile(iurl[0].filepath, newPath ,async(error)=>{
  if(!error){
   //this token is not actually token just contains same info as token
   let token=await registerModel.findByIdAndUpdate(fields.uid, {image:iurl[0].originalFilename});




 token =jwt.sign({
    id:token._id,
    email:token.email,
    userName:token.userName,
    image:token.image,
    registerTime:token.createdAt
  }, process.env.SECRET,{
    expiresIn:process.env.TOKEN_EXP
  } );

const options={expires:new Date(Date.now()+process.env.COOKIE_EXP*24*60*60*1000)}                                        //milisec
res.status(201).cookie('authToken', token, options).json({
successMessage:"Your Registration Successful",token
})

  //  console.log(token);
 


  }else{
    res.status(500).json({
      error:{
        errorMessage:["internal server error in authcontroller."]
      }
    })
  }
})


  }
  )
}









//steps:

// console.log(fields);
// console.log(files);

// import formidable
// called and store in form and parse the form
// destructure the data of fields and files 
// create validation
// if(no error){
//   get the image name and craate folder for images-> first get path of image folder for image=> url.fileURLToPath(new URL("youpath", import.meta.url))
//   now store in our path=> fs.copyFile(desiredpath, 'filepath_fromfile', async(err)); 
//   if no error while saving file create new user , create token and cookie for it.
// }

// res.status(400).json({    //In json error and errorMessage properties are already present.
//   error:{
//     errorMessage:error
//   }
// })



//newImageName.replace(/\s/g, "")   this removes all whitespaces from complete string.



//this file for login and regitration.
// import * as url from 'url';                                                                         //for __dirname
// const filename = url.fileURLToPath("desiredpath",import.meta.url); this is like __dirname