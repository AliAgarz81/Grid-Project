const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req,res) => {
    try {
        const { name, password } = req.body;
        if(!password) {
            return res.status(400).json({message: 'Password is required'});
        }
        const user = await User.findOne({ where: { name } });
        if(user) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name:name, password:hashedPassword });
        res.status(201).json({message: "Created successfully"});
    } catch(error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map((e) => e.message);
            res.status(400).json({ message: errors[0] });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ where: { name: name } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const monthInSeconds = 30 *24 * 60 * 60;
        const token = jwt.sign({ user: user.name }, process.env.JWT_SECRET, { expiresIn: '90d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + monthInSeconds * 3000)
        }).send({ message: 'Login successfully' });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = (req,res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(0)
        }).send({ message: 'Logout successfully' });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

const getName = (req,res) => {
    try {
        res.send({ message: req.user });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req,res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name"]
        });
        const userData = users?.filter((u) => u.name != req.user);
        res.status(201).json({ users: userData });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

const checkUser = (req,res) => {
    try {
        const token = req.cookies['token'];
        if(!token) {
            return res.status(200).send(false);
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if(err) {
                    return res.status(200).send(false);
                }
                return res.status(200).send(true);
            });
        }
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if(!user) {
            res.status(400).json({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).json({ message: "Deleted successfully" });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createUser, loginUser, logoutUser, getName, checkUser, getUsers, deleteUser };