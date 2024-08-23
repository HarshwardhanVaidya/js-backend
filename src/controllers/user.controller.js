import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
  // step1: get user data from frontend
  // step2: validation -not empty
  // step3: check if user already exists: username/email/both(based on yourrequirnment)
  // step4: check for images, check for avatar
  // step5: upload them to cloudinary
  // step6: create object - crate entry in db
  // step7: remove password and refresh token field from response
  // step8: check user creation
  // step9: return response

// s1
  const {fullName, email, username, password} = req.body
  // console.log("email:", email);

  // s2

  // if (fullName === ""){
  //   throw new ApiError(400,  "fullname is required")
  // }
    if (
      [fullName, email, username, password].some((field) => 
      field?.trim() === "")
    ) 
    {
      throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email } ]
      
    })

    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists")
    }
    console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;

    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
      
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
      throw new ApiError(400, "Avatar file is required");
    }


    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
       "-password -refreshToken"
    )

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export {
  registerUser,
}

