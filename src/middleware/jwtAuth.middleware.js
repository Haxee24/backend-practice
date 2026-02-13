import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = async (req, res, next) => {
    try{
        console.log(req.headers.authorization)
        const token = req.headers.authorization?.split(" ")[1]?.trim();
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        console.log(typeof(token));
        console.log(process.env.JWT_SECRET=="onedirection")
        console.log("Authorization header:", req.headers.authorization);
        console.log("Token type:", typeof token);
        console.log("Token length:", token?.length);
        console.log("Token first 20 chars:", token?.slice(0, 20));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err){
        console.log(err);
        return res.status(401).json({message: "Invalid Token"});
    }
}

export default jwtAuthMiddleware;