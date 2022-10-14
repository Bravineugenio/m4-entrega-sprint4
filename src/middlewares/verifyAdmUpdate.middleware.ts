import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAdmUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const token = req.headers.authorization?.split(' ')[1]

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any) => {

      if(!req.user.isAdm){
        return res.status(401).json({
            message: 'User is not admin'
        })
    }

    if(req.user.isAdm){
      return next()
  }


    
      // if (req.user.isAdm === true && req.user.id === id) {
      //   next();
      // }
      // if (req.user.isAdm === true && req.user.id !== id) {
      //   next();
      // }
      // if (req.user.isAdm === false && req.user.id  === id) {
      //   next();
      // }
      // if (req.user.isAdm === false && req.user.id !== id) {
      //   res.status(401).json({ message: "Unauthorized" });
      // }
    }
  );
};

export default verifyAdmUpdateMiddleware;
