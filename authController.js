import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js"
import Role from "./models/Role.js"
import bcrypt from "bcryptjs"
import { validationResult } from 'express-validator'
import jwt from "jsonwebtoken"
import { secret } from "./config.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({ message: "errors", errors })
            }
            const { userName, password } = req.body
            const candidat = await User.findOne({ userName })
            if (candidat) {
                return res.status(400).json({ message: 'user with this name exists' })
            }
            const hashpassword = bcrypt.hashSync(password, 3);
            const userRole = await Role.findOne({ value: "USER" })
            const user = new User({ userName, password: hashpassword, roles: [userRole.value] })
            await user.save()
            return res.json({ message: "User is registration" })

        } catch (e) {
            console.log(e)
            res.status(400).json('registration.error')
        }
    }

    async login(req, res) {
        try {
            const { userName, password } = req.body
            const user = await User.findOne({ userName })
            if (!user) {
                return res.status(400).json({ message: "User " + user + 'is not faund' })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: "Password is wrong" })
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token })
        } catch (e) {
            console.log(e)
            res.status(400).json('login.error')
        }

    }

    async getUsers(req, res) {
        try {
            const users = await User.find()

            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new authController()