export const errorHandler = (error, req, res, next) => {  
    console.error(error.stack);


    if(res.headersSent){
      return next(error)
    }


  const message = error.message || "Internal Server Error"
  res.status(500).json({ 
    message: `Internal Server Error: ${message}`, 
   });
    
   
  

    
};
