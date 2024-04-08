const getOffset = (limit = 10, page = 1) => (page - 1) * limit

const getPagination = (limit = 10, page = 1, total = 50) => {
  const totalPage = Math.ceil(total / limit)
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
  const currentPage = page < 1 ? 1 : page > total ? totalPage : page
  const prevPage = currentPage - 1 < 1 ? 1 : currentPage - 1
  const nextPage = currentPage + 1 > totalPage ? totalPage : currentPage + 1
  return {
    totalPage,
    pages,
    currentPage,
    prevPage,
    nextPage
  }
}

module.exports = {
  getOffset, getPagination
}
