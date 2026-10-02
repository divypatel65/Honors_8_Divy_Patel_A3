const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

    empid: String,

    date: String,

    reason: String,

    grant: {
        type: String,
        default: "No"
    }

});

module.exports = mongoose.model("Leave", leaveSchema);

