import fs from "fs/promises";

  export const reqeustLogger = async(req, res, next) =>{
    const currentTime = new Date().toISOString();
    const logMessage = `${currentTime} - ${req.method} ${req.url}\n`;
    //log to console
    console.log(`Request logged: ${logMessage}`);
    
        
    //log to file & Aysnc
    try{
    await fs.appendFile("./request.log", logMessage);
    }
    catch(error){
    console.error("Error logging request:", error);
    }

    next();
  };

  // Middleware respond with a custom header
  export const respondHeader = (req, res, next) => {
    res.setHeader("X-Powered-By-Student", "Olumide Ogunleye");
    
    next();
  }

  // dissabling cache (app.set, app.use, app.get)

  export const etag = ("etag", false);

  export const disabledCache = (req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0")
    next();
    
  }

  export const resSend =(req, res)=>{
    res.send("Caching is disabled!");
  }




