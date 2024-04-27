import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';
import crypto from 'crypto';
import validator from 'validator';

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            maxlength: [40, 'Please enter under 40 characters'],
            required: [true, 'Please provide a name'],
        },

        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Please provide an email'],
            validate: [validator.isEmail, 'Please enter the email in the correct format'],
        },

        password: {
            type: String,
            required: [true, 'Please provide a Password'],
            minlength: [6, 'Password should be at least 6 characters'],
            select: false,
        },

        role: {
            type: String,
            default: 'user',
        },

        photo : {
            id : {
                type : String,
                required : true
            },
    
            secure_url : {
                type : String,
                required : true
            }
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video',
            },
        ],

        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    console.log('Generated token:', token); // Log the token to ensure it's not empty
    return token;
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.getForgotPasswordToken = function () {
    const forgotToken = cryptoRandomString({ length: 20, type: 'hex' });

    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex');
    this.forgotPasswordExpiry = new Date(Date.now() + 20 * 60 * 1000); // Set expiration to 20 minutes from now

    return forgotToken;
};

const User = mongoose.model('User', userSchema);

export { User };
