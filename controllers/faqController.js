const Faq = require('../models/Faq');

const createFaq = async (req,res) => {
    const { titleEN, textEN, titleTR, textTR } = req.body;
    try {
        const newFaq = await Faq.create({ titleEN: titleEN, textEN: textEN, titleTR: titleTR, textTR: textTR });
        res.status(201).json({message: "Created successfully"});
    } catch(error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map((e) => e.message);
            return res.status(400).json({ message: errors[0] });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

const getAllFaqs = async (req,res) => {
    try {
        const faqs = await Faq.findAll();
        return res.status(200).json({ faqs: faqs });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

const getFaqs = async (req,res) => {
    const lng = req.params.lng;
    let faqs;
    try {
        if(lng === 'tr'){
            faqs = await Faq.findAll({
                attributes: ['id', 'titleTR', 'textTR']
            });
        } else {
            faqs = await Faq.findAll({
                attributes: ['id', 'titleEN', 'textEN']
            });
        }
        const faqsData = faqs?.map(faq => ({
            id: faq.id,
            title: faq.titleTR || faq.titleEN,
            text: faq.textTR || faq.textEN
        }));
        return res.status(200).json({ faqs: faqsData });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFaq = async (req,res) => {
    const id = req.params.id;
    try {
        const faq = await Faq.findByPk(id);
        if(!faq) {
            return res.status(404).json({ message: "Faq not found" });       
        }
        return res.status(200).json({ faq });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateFaq = async (req,res) => {
    const id = req.params.id;
    const { titleEN, textEN, titleTR, textTR } = req.body;
    try {
        const faq = await Faq.findByPk(id);
        if(!faq) {
            return res.status(404).json({ message: "Faq not found" });       
        }
        faq.titleEN = titleEN;
        faq.textEN = textEN;
        faq.titleTR = titleTR;
        faq.textTR = textTR;
        await faq.save();
        return res.status(200).json({ message: "Updated succesfully" });
    } catch(error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map((e) => e.message);
            return res.status(400).json({ message: errors[0] });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

const deleteFaq = async (req,res) => {
    const id = req.params.id;
    try {
        const faq = await Faq.findByPk(id);
        if(!faq) {
            return res.status(404).json({ message: "Faq not found" });       
        }
        await faq.destroy();
        return res.status(200).json({ message: "Deleted succesfully" });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { createFaq, getFaqs, getFaq, updateFaq, deleteFaq, getAllFaqs };