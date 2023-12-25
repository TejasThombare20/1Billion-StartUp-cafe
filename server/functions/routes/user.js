const router = require("express").Router();
const admin = require('firebase-admin')
let data = [];

router.get('/', (req, res) => {
    return res.send("inside the user router")

})

router.get('/jwtVerification', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ msg: "token not found" })
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        if (!decodedValue) {
            return res.status(500).json({ success: false, msg: "Unauthorized access" })
        }
        return res.status(200).json({ success: true, data: decodedValue });
    } catch (err) {
        return res.send({ success: false, msg: `Error in extracting token :${err}` })
    }


});


const listAllUsers = async (nextpagetoken) => {
    try {
        const listuserresult = await admin.auth().listUsers(1000, nextpagetoken);
        listuserresult.users.forEach((rec) => {
          data.push(rec.toJSON());
        });
        if (listuserresult.pageToken) {
          await listAllUsers(listuserresult.pageToken, data);
        }
        return data;
    } catch (error) {
        throw error;
      }
}

listAllUsers();

router.get("/all" ,async (req, res) => {
    listAllUsers();
    try {
        return res.status(200).send({success: true , data : data , dataCount: data.length});
        
    } catch (err) {
        return res.send({success:false, msg:`Error in listing users ${err}` })
        
    }
})



module.exports = router;  