// 1. Require
const Notify = require('../models/NotifyModel');

// 2. Main
const notifyController = {
    createNotify: async (req, res) => {
        try {
            const { postID, recipients, url, text, content, image } = req.body;

            const notify = new Notify({
                postID,
                recipients,
                url,
                text,
                content,
                image,
                user: req.userID,
            });

            await notify.save();

            return res.json({
                success: true,
                message: 'Notify created successfully.',
                notify,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    deleteNotify: async (req, res) => {
        try {
            const notify = await Notify.findOneAndDelete({
                postID: req.params.id,
                url: req.query.url,
            });

            return res.json({
                success: true,
                message: 'Notify deleted successfully.',
                notify,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    getNotify: async (req, res) => {
        try {
            const notifies = await Notify.find({
                recipients: req.userID,
            })
                .sort('-createdAt')
                .populate('user', 'avatar username');

            return res.json({
                success: true,
                message: 'Get Notifies successfully.',
                notifies,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
};

// 3. Export
module.exports = notifyController;
