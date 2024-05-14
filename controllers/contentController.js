const Content = require('../models/Content');
const fs = require('fs');
const cache = require('memory-cache');

const createContent = async (req,res) => {
    const { title, link } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        const newContent = await Content.create({ title: title, link: link, image: file.buffer });
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

const getContents = async (req,res) => {
    try {
        const cacheKey = 'contents';
        const cachedContents = cache.get(cacheKey);

        if (cachedContents) {
            return res.status(200).json({ contents: cachedContents });
        }

        const contents = await Content.findAll({
            attributes: ['id', 'title', 'link']
        });
        cache.put(cacheKey, contents, 120 * 1000);
        return res.status(200).json({contents});
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

const getContent = async (req,res) => {
    const id = req.params.id;
    try {
        const content = await Content.findOne({ where: { id }, attributes: ['id', 'title', 'link']});
        if(!content) {
            return res.status(404).json({ message: "Content not found" });
        }
        return res.status(200).json({ content });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateContent = async (req,res) => {
    const id = req.params.id;
    const { title, link } = req.body;
    try {
        const content = await Content.findOne({ where: { id }});
        if(!content) {
            return res.status(404).json({ message: "Content not found" });
        }
        content.title = title;
        content.link = link;
        await content.save();
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

const deleteContent = async (req,res) => {
    const id = req.params.id;
    try {
        const content = await Content.findOne({ where: { id }});
        if(!content) {
            return res.status(404).json({ message: "Content not found" });
        }
        await content.destroy();
        return res.status(200).json({ message: "Deleted succesfully" });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { createContent, getContents, getContent, updateContent, deleteContent };
