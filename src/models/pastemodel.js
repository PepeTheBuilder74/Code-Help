const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const pasteSchema = mongoose.Schema({
    link : {
        type: String,
    },
    title : {
        type: String,
        required: [true, "Please add the title"],
    },
    code : {
        type: String,
        required: [true, "Please add the code"],
    },
    language : {
        type: String,
        required: [true, "Please add the language"],
    },
    isPublic : {
        type: Boolean,
        required: [true, "Plaase add the visibility"],
    },
    password : {
        type: String, 
        required: [false],
    }
    },
    {
        timestamps: true,
    }
)

pasteSchema.pre("save", function (next) {
    const paste = this
    if(!paste.password) return next()
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(paste.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            paste.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
})

module.exports = mongoose.model("paste", pasteSchema)