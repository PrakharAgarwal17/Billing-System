import jwt from "jsonwebtoken";
import userModel from "../../models/userModel/userModel.js";
export default async function isloggedin(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            console.log(decoded);
            const userid = decoded.id;
            console.log(userid);
            const user = await userModel.findById(userid);
            if (!user) {
                res.send("user not found");
            }
            next();
        }
        else {
            res.status(400).json({ message: "token not found" });
        }
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=Auth.js.map