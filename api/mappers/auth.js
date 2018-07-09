exports.tokenPayload = user => ({
  id: user._id,
  thread_size: user.thread_size,
  comment_size: user.comment_size
})
