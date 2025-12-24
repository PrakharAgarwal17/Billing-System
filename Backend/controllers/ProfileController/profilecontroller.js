import profileModel from "../../models/userProfile/userprofile.js";
export async function addprofile(req, res) {
    try {
        const { name, contact, region } = req.body;
        const userId = req.userId;
        const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null;
        if (typeof region !== "string" || !region.trim()) {
            return res.status(400).json({ message: "Invalid type of Region" });
        }
        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ message: "Invalid type of Name" });
        }
        if (isNaN(Number(contact))) {
            return res.status(400).json({ message: "Invalid type of Contact" });
        }
        if (profilePhoto && typeof profilePhoto !== "string") {
            return res.status(400).json({ message: "Invalid profile photo" });
        }
        await profileModel.create({
            user: userId,
            name,
            profilePhoto,
            contact,
            region
        });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
export async function updateprofile(req, res) {
    try {
        const { name, contact, region } = req.body;
        const userId = req.userId?.toString();
        const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null;
        if (typeof region !== "string" || !region.trim()) {
            return res.status(400).json({ message: "Invalid type of Region" });
        }
        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ message: "Invalid type of Name" });
        }
        if (isNaN(Number(contact))) {
            return res.status(400).json({ message: "Invalid type of Contact" });
        }
        if (profilePhoto && typeof profilePhoto !== "string") {
            return res.status(400).json({ message: "Invalid profile photo" });
        }
        const updatedProfile = await profileModel.findOneAndUpdate({ user: userId }, {
            name, contact, region, profilePhoto
        });
        if (!updatedProfile) {
            return res.status(400).json({ message: "Profile update unsuccessful" });
        }
        else {
            return res.status(200).json({ message: "Profile updated successfully" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
export async function getprofile(req, res) {
    try {
        const userId = req.userId?.toString();
        if (!userId) {
            return res.status(401).json({ message: "Unauthorised user" });
        }
        const profileDetails = await profileModel.findOne({ user: userId });
        if (!profileDetails) {
            return res.status(400).json({ message: "Profile details not found" });
        }
        return res.send(profileDetails);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
//# sourceMappingURL=profilecontroller.js.map