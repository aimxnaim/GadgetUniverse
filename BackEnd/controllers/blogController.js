const Blog = require('../models/blog');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const APIFilters = require('../utils/apiFilters');
const { BLOG_CATEGORIES } = require('../utils/blogConstants');

// Get blog categories => /api/v1/blog_categories
module.exports.getBlogCategories = catchAsyncErrors(async (req, res) => {
    res.status(200).json({
        categories: BLOG_CATEGORIES
    });
});

// Get all blogs => /api/v1/blogs
module.exports.getBlogs = catchAsyncErrors(async (req, res) => {
    const resPerPage = 10;
    const apiFilters = new APIFilters(Blog, req.query)
        .search()
        .filter();

    let blogs = await apiFilters.query.populate('author', 'name email avatar');
    let filterBlogCount = blogs.length;

    apiFilters.pagination(resPerPage);
    blogs = await apiFilters.query.clone().populate('author', 'name email avatar');

    res.status(200).json({
        resPerPage,
        filterBlogCount,
        blogs
    });
});

// Get single blog details => /api/v1/blogs/:id
module.exports.getBlogDetails = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
        .populate('author', 'name email avatar')
        .populate('comments.user', 'name avatar');

    if (!blog) {
        return next(new ErrorHandler('Blog not found with this ID', 404));
    }

    res.status(200).json({
        blog
    });
});

// Create new blog => /api/v1/blogs (authenticated users can create)
module.exports.newBlog = catchAsyncErrors(async (req, res) => {
    req.body.author = req.user._id;

    const blog = await Blog.create(req.body);
    
    res.status(201).json({
        success: true,
        blog
    });
});

// Update blog => /api/v1/admin/blogs/:id (admin only)
module.exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler('Blog not found with this ID', 404));
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        blog
    });
});

// Delete blog => /api/v1/admin/blogs/:id (admin only)
module.exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler('Blog not found with this ID', 404));
    }

    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully'
    });
});

// Add comment to blog => /api/v1/blogs/:id/comments
module.exports.addBlogComment = catchAsyncErrors(async (req, res, next) => {
    const { comment } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler('Blog not found with this ID', 404));
    }

    const newComment = {
        user: req.user._id,
        name: req.user.name,
        comment
    };

    blog.comments.push(newComment);
    blog.numOfComments = blog.comments.length;

    await blog.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Comment added successfully'
    });
});

// Get blog comments => /api/v1/blogs/:id/comments
module.exports.getBlogComments = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
        .populate('comments.user', 'name avatar');

    if (!blog) {
        return next(new ErrorHandler('Blog not found with this ID', 404));
    }

    res.status(200).json({
        comments: blog.comments
    });
});

// Delete blog comment => /api/v1/admin/blogs/:id/comments (admin only)
module.exports.deleteBlogComment = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler('Blog not found with this ID', 404));
    }

    const comments = blog.comments.filter(
        (comment) => comment._id.toString() !== req.query.commentId
    );

    const numOfComments = comments.length;

    await Blog.findByIdAndUpdate(req.params.id, {
        comments,
        numOfComments
    });

    res.status(200).json({
        success: true,
        message: 'Comment deleted successfully'
    });
});

// Get admin blogs => /api/v1/admin/blogs
module.exports.getAdminBlogs = catchAsyncErrors(async (req, res) => {
    const blogs = await Blog.find().populate('author', 'name email');

    res.status(200).json({
        blogs
    });
});
