import Tweet from '../models/tweet.model.js';
import User from '../models/user.model.js';

const getTweets = async (req, res) => {
    try {
        // Fetch all tweets and populate user info
        const tweets = await Tweet.find()
            .sort({ createdAt: -1 }) // newest first
            .populate('madeBy', 'username email'); // get username and email of creator

        // Build HTML page
        let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>All Tweets</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #404246;
                    margin: 0;
                    padding: 20px;
                }
                h1 {
                    text-align: center;
                    color: #9a8888;
                }
                .tweet-container {
                    max-width: 600px;
                    margin: 20px auto;
                }
                .tweet {
                    background-color: #fff;
                    padding: 15px 20px;
                    margin-bottom: 15px;
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transition: transform 0.2s;
                }
                .tweet:hover {
                    transform: scale(1.02);
                }
                .tweet .username {
                    font-weight: bold;
                    color: #1da1f2;
                }
                .tweet .content {
                    margin: 10px 0;
                    font-size: 16px;
                }
                .tweet .time {
                    font-size: 12px;
                    color: #888;
                    text-align: right;
                }
            </style>
        </head>
        <body>
            <h1>All Tweets</h1>
            <div class="tweet-container">
        `;

        // Add tweets
        tweets.forEach(tweet => {
            html += `
            <div class="tweet">
                <div class="username">@${tweet.madeBy.username}</div>
                <div class="content">${tweet.content}</div>
                <div class="time">${new Date(tweet.createdAt).toLocaleString()}</div>
            </div>
            `;
        });

        html += `
            </div>
        </body>
        </html>
        `;

        res.send(html);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const createTweet = async (req, res) => {
    try{
        const {content} = req.body;

        if (!content || content.trim() === "") {
            return res.status(400).json({message: "Cannot Submit Empty Tweet"});
        };

        const user = await User.findOne({_id: req.user.id});

        const newTweet = await Tweet.create({
            content,
            madeBy: user
        });

        await User.findByIdAndUpdate(user._id, {$push: {tweets: newTweet}});

        return res.status(201).json({
            message: "Tweet created successfully",
            newTweet
        })

    } catch (error){
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export {createTweet, getTweets};