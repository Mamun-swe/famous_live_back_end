const User = require('../../../models/users')
const checkId = require('../../middleware/mongooseId')


const updateProfileImage = async (req, res, next) => {
    let { id } = req.params

    try {
        await checkId(id)
        let user = await User.findOne({ _id: id }).exec()
        if (!user) {
            return res.status(204).json({ message: 'User not found' })
        }

        let file = req.files.profile_image
        if (!file) {
            return res.status(204).json({ message: 'Choose an image first' })
        }

        const profile_image = Date.now() + '.' + file.name
        imageUploadPath = './uploads/images/' + Date.now() + '.' + file.name
        const moveFile = file.mv(imageUploadPath)

        if (!moveFile) {
            return res.status(501).json({ message: 'file upload error' })
        }

        const updateProfileImg = await User.findOneAndUpdate(
            { _id: id },
            { $set: { 'image': profile_image } },
            { new: true }
        ).exec()

        if (!updateProfileImg) {
            return res.status(401).json({ message: 'Failed to update' })
        }
        return res.status(200).json({ message: true })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    updateProfileImage
}