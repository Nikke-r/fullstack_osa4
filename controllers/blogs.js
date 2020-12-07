require('dotenv').config();
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.post('/', async (req, res) => {
    const body = req.body;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id,
        },
    );
    
    if (blog.title === undefined || blog.url === undefined) {
        return res.status(400).json({ error: 'Title and url must be defined!' });
    }

    const savedBlog = await blog.save();
    user.blogs.concat(savedBlog._id);
    await user.save();
    
    res.json(savedBlog.toJSON());
});

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    if (blog.user.toString() === user._id.toString()) {
        await blog.remove();
        res.status(204).end();
    } else {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

blogsRouter.put('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (blog.user.toString() === decodedToken.id) {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedBlog.toJSON());
    } else {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

module.exports = blogsRouter;