import profileModel from "../../models/userProfile/userprofile.js";
export async function addprofile(req, res) {
    try {
        const { name, contact, region } = req.body;
        const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null;
        await profileModel.create({
            name,
            profilePhoto,
            contact,
            region
        });
        console.log(profilePhoto);
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=profilecontroller.js.map