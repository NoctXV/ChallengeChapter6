const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require('../libs/imagekit');
const path = require('path');

module.exports = {
    upload: async (req, res, next) => {
        try {
            const { title, description } = req.body;
            const file = req.file;

            if (!title || !description || !file) {
                return res.status(400).json({
                    status: false,
                    message: "all data are reqired",
                    data: null,
                });
            }

            const tostring = file.buffer.toString('base64');
            const upload = await imagekit.upload({
                fileName: `${Date.now()}${path.extname(file.originalname)}`,
                file: tostring
            });

            const mediaup = await prisma.image.create({
                data: {
                    title,
                    description,
                    imageUrl: upload.url
                },
            });

            return res.status(201).json({
                status: true,
                message: "success",
                data: mediaup
            });

        } catch (err) {
            next(err);
        }
    },

    list: async (req, res, next) => {
        try {
            const media = await prisma.image.findMany({
                select: {
                    id: true,
                    imageUrl: true
                }
            });

            return res.status(200).json({
                status: true,
                message: "success",
                data: media
            });
        } catch (err) {
            next(err);
        }
    },

    detail: async (req, res, next) => {
        try {
            const { id } = req.params;
            const image = await prisma.image.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            return res.status(200).json({
                status: true,
                message: "success",
                data: image
            });
        } catch (err) {
            next(err);
        }
    },

    deletemedia: async (req, res, next) => {
        try {
            const { id } = req.params;
            const mediadelete = await prisma.image.deletemedia({
                where: { id: parseInt(id) }
            });

            return res.status(200).json({
                status: true,
                message: "success",
                data: mediadelete
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const file = req.file;

            const image = await prisma.image.findUnique({
               where: {
                    id: parseInt(id)
              }
          });

            const tostring = file.buffer.toString('base64');
            const upload = await imagekit.upload({
                fileName: Date.now() + path.extname(file.originalname),
                file: tostring
            });

            if (!title || !description) {
                return res.status(400).json({
                    status: false,
                    message: "all data are required",
                    data: null
                });
            }

            let update= await prisma.image.update({
                where: { id: parseInt(id) },
                data: {
                    title,
                    description,
                    imageUrl: upload.url
            }
            })

            return res.status(200).json({
                status: true,
                message: "success",
                data: update
            });

        } catch (err) {
            next(err);
        }
    },

}