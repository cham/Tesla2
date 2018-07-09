module.exports = (req) => {
  const b = req.body
  const q = req.query
  const r = req.params
  const u = req.user
  return {
    limit: parseInt(r.limit || b.limit || q.limit || u.comment_size, 0) || 50,
    skip: parseInt(r.skip || b.skip || q.skip, 0) || 0,
    sort: r.sort || b.sort || q.sort || '-created'
  }
}
