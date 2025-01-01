const TryCatch = (passedFunc) => async (req, res, next) => {
    try {
      await passedFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  


  class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }


  const errorMiddleware = (err, req, resp, next) => { 
    
    return resp.send(err.message);

  };



  export {TryCatch, ErrorHandler, errorMiddleware};