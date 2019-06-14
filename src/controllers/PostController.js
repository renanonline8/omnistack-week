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
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;
        const filename = obtemExtJpeg(image);

        //Redimensiona a imagem
        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality: 70})
        .toFile(path.resolve(req.file.destination, 'resized', filename));

        apagaImagemOriginal(req);

        //Posta no banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename,
        });

        //Websocket
        req.io.emit('post', post);

        //Retorno
        res.json(post);
    }
}

/**
 * Obtem extensão jpge
 * @param {*} image 
 */
function obtemExtJpeg(image) {
    const [name] = image.split('.');
    const filename = `${name}.jpg`;
    return filename;
}

/**
 * Redimensiona a imagem
 * @param {*} req 
 * @param {*} filename 
 * @param {*} success
 * @todo Descobrir como fazer funcionar o redimencionamento com await 
 */
async function redimensionaImagem(req, filename, success) {
    
}

/**
 * Apaga imagem original
 * @param {*} req 
 */
function apagaImagemOriginal(req) {
    fs.unlinkSync(req.file.path);
}