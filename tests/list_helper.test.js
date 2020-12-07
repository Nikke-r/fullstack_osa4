const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = [];

        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(0);
    });

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [{
            title: "Test",
            author: "Test",
            url: "www.url.fi",
            likes: 6
        }];

        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(6);
    });

    test('of a bigger list is calculated right', () => {
        const blogs = [];

        for (let i = 0; i < 10; i++) {
            const blog = {
                title: `Title ${i}`,
                author: `Author ${i}`,
                url: `www.url${i}.fi`,
                likes: 1
            };

            blogs.push(blog);
        }

        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(10);
    });
});

describe('favorite blog', () => {
    test('of empty list is an empty object', () => {
        const blogs = [];

        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual({});
    });

    test('of list of one blog is the only blog', () => {
        const blogs = [{
            title: "Test",
            author: "Test",
            url: "www.url.fi",
            likes: 6
        }];

        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual(blogs[0]);
    });

    test('of multiple blogs is', () => {
        const blogs = [
            {
                title: "Test",
                author: "Test",
                url: "www.url.fi",
                likes: 1
            },
            {
                title: "Test1",
                author: "Test1",
                url: "www.url1.fi",
                likes: 4
            },
            {
                title: "Test2",
                author: "Test2",
                url: "www.url2.fi",
                likes: 345
            },
            {
                title: "Test3",
                author: "Test3",
                url: "www.url3.fi",
                likes: 34
            },
            {
                title: "Test4",
                author: "Test4",
                url: "www.url4.fi",
                likes: 346
            },
        ];

        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual({
            title: "Test4",
            author: "Test4",
            url: "www.url4.fi",
            likes: 346
        });
    });
});

describe('Most blogs', () => {
    test('of empty array returns an empty object', () => {
        const blogs = [];

        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual({});
    });

    test('of list with one blog to equal the only blog', () => {
        const blogs = [
            {
                title: "Test",
                author: "Test",
                url: "www.url.fi",
                likes: 1
            }
        ];

        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual({
            author: "Test",
            blogs: 1
        });
    });

    test('of multiple blogs to be', () => {
        const blogs = [ 
            { 
                _id: "5a422a851b54a676234d17f7", 
                title: "React patterns", 
                author: "Michael Chan", 
                url: "https://reactpatterns.com/", 
                likes: 7, 
                __v: 0 
            },
            { 
                _id: "5a422aa71b54a676234d17f8", 
                title: "Go To Statement Considered Harmful", 
                author: "Edsger W. Dijkstra", 
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
                likes: 5,
                __v: 0 
            },
            { 
                _id: "5a422b3a1b54a676234d17f9", 
                title: "Canonical string reduction", 
                author: "Edsger W. Dijkstra", 
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
                likes: 12, 
                __v: 0 
            },
            { 
                _id: "5a422b891b54a676234d17fa", 
                title: "First class tests", 
                author: "Robert C. Martin", 
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
                likes: 10, 
                __v: 0 
            },
            { 
                _id: "5a422ba71b54a676234d17fb", 
                title: "TDD harms architecture", 
                author: "Robert C. Martin", 
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
                likes: 0, 
                __v: 0 
            },
            {
                _id: "5a422bc61b54a676234d17fc", 
                title: "Type wars", 
                author: "Robert C. Martin", 
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
                likes: 2, 
                __v: 0 
            }
        ];

        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3,
        });
    });
});

describe('Most likes', () => {
    test('of an empty array is an empty object', () => {
        const blogs = [];

        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual({});
    });

    test('of a list with one blog is the blog itself', () => {
        const blogs = [ 
            { 
                _id: "5a422a851b54a676234d17f7", 
                title: "React patterns", 
                author: "Michael Chan", 
                url: "https://reactpatterns.com/", 
                likes: 7, 
                __v: 0 
            },
        ];

        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual(
            {
                author: "Michael Chan",
                likes: 7,
            },
        );
    });

    test('of multiple blogs is', () => {
        const blogs = [ 
            { 
                _id: "5a422a851b54a676234d17f7", 
                title: "React patterns", 
                author: "Michael Chan", 
                url: "https://reactpatterns.com/", 
                likes: 7, 
                __v: 0 
            },
            { 
                _id: "5a422aa71b54a676234d17f8", 
                title: "Go To Statement Considered Harmful", 
                author: "Edsger W. Dijkstra", 
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
                likes: 5,
                __v: 0 
            },
            { 
                _id: "5a422b3a1b54a676234d17f9", 
                title: "Canonical string reduction", 
                author: "Edsger W. Dijkstra", 
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
                likes: 12, 
                __v: 0 
            },
            { 
                _id: "5a422b891b54a676234d17fa", 
                title: "First class tests", 
                author: "Robert C. Martin", 
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
                likes: 10, 
                __v: 0 
            },
            { 
                _id: "5a422ba71b54a676234d17fb", 
                title: "TDD harms architecture", 
                author: "Robert C. Martin", 
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
                likes: 0, 
                __v: 0 
            },
            {
                _id: "5a422bc61b54a676234d17fc", 
                title: "Type wars", 
                author: "Robert C. Martin", 
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
                likes: 2, 
                __v: 0 
            }
        ];

        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual(
            {
                author: "Edsger W. Dijkstra",
                likes: 17,
            },
        );
    });
});