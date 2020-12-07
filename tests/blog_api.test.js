require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const testHelper = require('./test_helper');
const bcrypt = require('bcryptjs');

const api = supertest(app);

let token;

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(testHelper.initialBlogs);

    await User.deleteMany({});

    const user = {
        username: 'tester',
        name: 'test tester',
        password: 'test1234'
    }

    const testUser = await api.post('/api/users').send(user);
    const response = await api.post('/api/login').send({username: user.username, password: user.password });
    const parsed = JSON.parse(response.text)
    token = parsed.token;
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('that id field is defined', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined();
    });
});

test('blog can be added', async () => {
    const blog = {
        title: 'Testi3',
        author: 'Testi3',
        url: 'www.testi3.fi',
        likes: 1000,
    };

    await api
        .post('/api/blogs')
        .set({'Authorization': 'Bearer ' + token})
        .send(blog);
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(testHelper.initialBlogs.length + 1);
});

test('Blog with no likes set likes are set to 0', async () => {
    const blog = {
        title: 'Testi3',
        author: 'Testi3',
        url: 'www.testi3.fi',
    };

    await api.post('/api/blogs').set({'Authorization': 'Bearer ' + token}).send(blog);
    const response = await api.get('/api/blogs');

    const newBlog = response.body[response.body.length - 1];
    expect(newBlog.likes).toBe(0);
});

test('No title or url, response 400', async () => {
    const blog = {
        author: "Testaaja",
        likes: 0,
    };

    await api
        .post('/api/blogs')
        .set({'Authorization': 'Bearer ' + token})
        .send(blog)
        .expect(400);
});

test('Can delete a blog', async () => {
    const testBlog = {
        title: 'Test123213',
        author: 'Test',
        url: 'Test',
        likes: 5,
    }

    const response = await api.post('/api/blogs').set({'Authorization': 'Bearer ' + token}).send(testBlog);
    const blogToDelete = JSON.parse(response.text);

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({'Authorization': 'Bearer ' + token})
        .expect(204);

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length);

    const titles = blogsAtEnd.map(blog => blog.title);

    expect(titles).not.toContain(blogToDelete.title);
});

test('Blog can be updated', async () => {
    const testBlog = {
        title: 'Test123213',
        author: 'Test',
        url: 'Test',
        likes: 5,
    }

    const response = await api.post('/api/blogs').set({'Authorization': 'Bearer ' + token}).send(testBlog);
    const blogToUpdate = JSON.parse(response.text);

    const likes = {
        likes: 1,
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set({'Authorization': 'Bearer ' + token})
        .send(likes);

    const blogsAtEnd = await testHelper.blogsInDb();

    const updatedBlog = blogsAtEnd[blogsAtEnd.length - 1];

    expect(updatedBlog.likes).toBe(1);
});

describe('User testing', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('12345', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save();
    });

    test('New user can be added', async () => {
        const usersAtStart = await testHelper.usersInDb();

        const newUser = {
            username: 'test',
            name: 'tester',
            password: 'test123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    });
});

afterAll(() => {
    mongoose.connection.close();
});