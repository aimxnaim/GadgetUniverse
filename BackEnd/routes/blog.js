const express = require('express');
const router = express.Router();
const {
    getBlogs,
    getBlogDetails,
    newBlog,
    updateBlog,
    deleteBlog,
    addBlogComment,
    getBlogComments,
    deleteBlogComment,
    getAdminBlogs
} = require('../controllers/blogController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Public routes
router
    .route('/blogs')
    .get(getBlogs);

router
    .route('/blogs/:id')
    .get(getBlogDetails);

router
    .route('/blogs/:id/comments')
    .get(getBlogComments);

// Authenticated user routes
router
    .route('/blogs')
    .post(isAuthenticatedUser, newBlog);

router
    .route('/blogs/:id/comments')
    .post(isAuthenticatedUser, addBlogComment);

// Admin routes
router
    .route('/admin/blogs')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminBlogs);

router
    .route('/admin/blogs/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateBlog)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBlog);

router
    .route('/admin/blogs/:id/comments')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBlogComment);

module.exports = router;
