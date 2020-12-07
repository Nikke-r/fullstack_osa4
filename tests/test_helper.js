const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: "Title1",
        author: "Author1",
        url: "www.url1.fi",
        likes: 2,
    },
    {
        title: "Title2",
        author: "Author2",
        url: "www.url2.fi",
        likes: 3,
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
}