var marked = require('marked');
var Comment = require('../lib/mongo').Comment;

Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map(function (comment) {
      comment.content = marked(comment.content); 
      return comment;
    });
  }
});

module.exports = {
  // 创建留言
  create: function (comment) {
    return Comment.create(comment).exec();
  },

  // 删除留言 根据用户id 和留言id
  delCommentById: function(commentId, author) {
    return Comment.remove({ author: author, _id: commentId}).exec();
  },

  // 删除所有留言 根据文章id
  delCommentsByPostId: function(postId) {
    return Comment.remove({postId: postId}).exec();
  },

  // 获取所有留言 根据文章id ，时间升序
  getComments: function (postId) {
    return Comment
      .find({ postId: postId})
      .populate({ path: 'author', model: 'User'})
      .sort({ _id:1})
      .addCreatedAt()
      .contentToHtml()
      .exec();
  },

  // 获取留言数 根据文章id
  getCommentsCount: function getCommentsCount(postId) {
    return Comment.count({ postId: postId }).exec();
  }
}