import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1]?.trim();
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err){
        console.log(err);
        return res.status(401).json({message: "Invalid Token"});
    }
}

export default jwtAuthMiddleware;