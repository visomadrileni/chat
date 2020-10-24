const crypto = require('crypto');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

exports.encryptPassword = password => crypto.createHmac("sha256","secretviso").update(password).digest("hex");
exports.createJwtToken = model => jwt.sign(model,'specialvisiontoken',{expiresIn:86400});

