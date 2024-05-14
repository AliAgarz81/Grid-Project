const Content = require('../models/Content');

const getImage = async (req,res) => {
    try {
        const id = req.params.id;
        const content = await Content.findByPk(id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.setHeader("Content-Type", "image/jpeg");
        return res.send(content.image);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports = getImage;