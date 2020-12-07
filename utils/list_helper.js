const logger = require('../utils/logger');

const dummy = blogs => {
    return 1;
}

const totalLikes = blogs => {
    const reducer = (acc, currValue) => {
        return acc + currValue.likes;
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
}

const favoriteBlog = blogs => {
    const mostLikes = Math.max.apply(Math, blogs.map(blog => blog.likes));

    const favoriteBlog = blogs.find(blog => blog.likes === mostLikes);

    return blogs.length === 0 ? {} : favoriteBlog;
}

const mostBlogs = blogs => {
    const sortedBlogs = [];

    blogs.forEach(blog => {
        if (!sortedBlogs.find(object => object.author === blog.author)) {
            sortedBlogs.push(
                {
                    author: blog.author,
                    articles: [
                        {
                            article: blog
                        }
                    ]
                }
            )
        } else {
            sortedBlogs.forEach(sortedBlog => {
                if (sortedBlog.author === blog.author) {
                    sortedBlog.articles.push(
                        {
                            article: blog
                        }
                    )
                }
            })
        }
    });

    const longestArray = Math.max.apply(Math, sortedBlogs.map(author => author.articles.length));
    const authorWithMostBlogs = sortedBlogs.find(blog => blog.articles.length === longestArray);

    return blogs.length === 0 ? {} : {
        author: authorWithMostBlogs.author,
        blogs: authorWithMostBlogs.articles.length,
    };
}

const mostLikes = blogs => {
    const sortedBlogs = [];
    const likesArray = [];

    blogs.forEach(blog => {
        if (!sortedBlogs.find(object => object.author === blog.author)) {
            sortedBlogs.push(
                {
                    author: blog.author,
                    articles: [blog],
                },
            )
        } else {
            sortedBlogs.forEach(sortedBlog => {
                if (sortedBlog.author === blog.author) {
                    sortedBlog.articles.push(blog)
                }
            });
        }
    });

    const reducer = (previousValue, currentValue) => {
        return previousValue + currentValue.likes;
    }

    sortedBlogs.forEach(blog => {
        const likes = blog.articles.reduce(reducer, 0);
        likesArray.push({
            author: blog.author,
            likes: likes,
        });
    });

    const mostLikesInArray = Math.max.apply(Math, likesArray.map(author => author.likes));
    const mostLikedAuthor = likesArray.find(author => author.likes === mostLikesInArray);

    return blogs.length === 0 ? {} : mostLikedAuthor;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}