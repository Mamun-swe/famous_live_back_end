const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Bangladeshi phone number
                return /^(?:\+?88)?01[15-9]\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    followers:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },
    status: {
        type: String,
        default: "offline",
        enum: ["online", "offline"]
    },
    isLive: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    access_token: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)

module.exports = User;