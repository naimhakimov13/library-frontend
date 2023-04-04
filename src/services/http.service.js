import {HTTP} from "@/plugins/axios";

export function signIn(body) {
  return HTTP.post('/signin', body)
}

export function signUp(body) {
  return HTTP.post('/signup', body)
}

export function getUsers(params) {
  return HTTP.get('/users', {params})
}

export function getUserById(id) {
  return HTTP.get(`/users/${id}`)
}

export function updateUser(id, user) {
  return HTTP.put(`/users/${id}`, user)
}

export function deleteUser(id) {
  return HTTP.delete(`/users/${id}`)
}

//BOOK

export function getBooks() {
  return HTTP.get('/books')
}

export function getBookById(id) {
  return HTTP.get(`/books/${id}`)
}

export function updateBookById(id, book) {
  return HTTP.put(`/books/${id}`, book)
}

export function createBook(book) {
  return HTTP.post('/books', book)
}

export function deleteBook(id) {
  return HTTP.delete(`/books/${id}`)
}

//CATEGORY

export function getCategories() {
  return HTTP.get('/categories')
}

export function getCategoryById(id) {
  return HTTP.get(`/categories/${id}`)
}

export function updateCategoryById(id, name) {
  console.log(name)
  return HTTP.put(`/categories/${id}`, {name})
}

export function createCategory(category) {
  return HTTP.post('/categories', category)
}

export function deleteCategory(id) {
  return HTTP.delete(`/categories/${id}`)
}

//RETURN

export function getReturns() {
  return HTTP.get('/returns')
}

export function getReturnByUserId(id) {
  return HTTP.get(`/returns/${id}`)
}

export function createReturn(body) {
  return HTTP.post(`/returns`, body)
}

export function updateReturn(id, body) {
  return HTTP.put(`/returns/${id}`, body)
}

export function deleteReturn(id) {
  return HTTP.delete(`/returns/${id}`)
}

//BORROW

export function getBorrows() {
  return HTTP.get('/borrows')
}

export function getBorrowByUserId(id) {
  return HTTP.get(`/borrows/${id}`)
}

export function createBorrow(body) {
  return HTTP.post(`/borrows`, body)
}

export function updateBorrow(id, body) {
  return HTTP.put(`/borrows/${id}`, body)
}

export function deleteBorrow(id) {
  return HTTP.delete(`/borrows/${id}`)
}

//file

export function uploadFile(file) {
  return HTTP.post('/file/upload', {
    file
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}

export function removeFile(public_id) {
  return HTTP.post('/file/remove', {
    public_id
  })
}
