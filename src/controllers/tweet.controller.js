import Tweet from '../models/tweet.model.js';

const createPost = async (req, res) => {
    try{
        const {content} = req.body;

        if (!content) {
            return res.status(400).json({message: "Cannot Submit Empty Tweet"});
        };
    } catch (error){
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}