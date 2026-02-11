import User from '../models/user.model.js';

const registerUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        

        //Check if all fields are entered
        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are important!!"});
        }

        //Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                {email},
                {username}
            ]
        })

        if (existingUser){
            return res.status(400).json({message: "User with email already exists!"})
        }

        //Create User
        const createdUser = await User.create({
            username,
            email,
            password,
            loggedIn: false
        });

        res.status(201).json({
            message: "User registered",
            user: {
                id: createdUser._id,
                email: createdUser.email,
                username: createdUser.username
            }
        })

    } catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "All fields are important!!"});
        }

        const user = await User.findOne({email: email.toLowerCase()});

        if (!user) return res.status(400).json({message: "User not found"});

        const isMatch = await user.compareInputPassword(password);

        if (!isMatch) return res.status(400).json({message:"Incorrect Password!"});

        return res.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (e){
        console.log(e)
        res.status(500).json({message: "Internal Server Error"})
    }
}


export {registerUser, loginUser};