const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts)
    },

    async store(req, res) {
        //obtem variáveis
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        //Redimensiona a imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(path.resolve(req.file.destination, 'resized', image));

        //Apagar imagem original
        fs.unlinkSync(req.file.path);

        //Posta no banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });

        //Retorno
        res.json(post);
    }
}