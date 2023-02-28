import {HTTP} from "@/plugins/axios";

export function signIn(body) {
  return HTTP.post('/signin', body)
}

export function getUsers() {
  return HTTP.get('/users')
}

export function getUserById(id) {
  return HTTP.get(`/users/${id}`)
}

export function updateUser(id, user) {
  return HTTP.put(`/users/${id}`, user)
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

//upload file

export function uploadFile(file) {
  return HTTP.post('/file/upload', {
    file
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}
