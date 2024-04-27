import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
// import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { CookieToken } from "../utils/CookieToken.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import cloudinary from "cloudinary"

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if photo is included in the request
        if (!req.file) {
            return res.status(400).send("Photo is required for signup");
        }

        // Retrieve the uploaded file
        const file = req.file;

        // Log the file object for debugging
        console.log("Uploaded file:", file);

        // Ensure the file is defined and has a valid MIME type
        if (!file || !file.mimetype) {
            console.log("Invalid file:", file);
            return res.status(400).send("File is missing or has an invalid format");
        }

        // Log the MIME type for debugging
        console.log("File MIME type:", file.mimetype);

        // Upload file to Cloudinary
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath || file.path, {
            folder: 'users',
            width: 150,
            crop: "scale"
        });

        // Log Cloudinary upload result for debugging
        console.log("Cloudinary upload result:", result);

        // Create user in the database
        const user = await User.create({
            photo: {
                id: result.public_id,
                secure_url: result.secure_url
            },
            email,
            password,
            username: username.toLowerCase(),
        });

        // Retrieve the created user (optional)
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        // Check if user creation was successful
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user. Created user not found.");
        }

        // Set cookies and send response
        CookieToken(user, res, generateAccessAndRefereshTokens);
        return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
    } catch (error) {
        console.error("Error during user registration:", error);

        // Enhance error handling by logging more details about the error
        return res.status(500).json({
            statusCode: 500,
            data: null,
            message: `Error during user registration: ${error.message}`,
            success: false
        });
    }
});


const loginUser = asyncHandler(async (req, res) =>{

    const { email, password } = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    CookieToken(user, res, generateAccessAndRefereshTokens);

    return res.status(200).json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
            )
    )

})


const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}