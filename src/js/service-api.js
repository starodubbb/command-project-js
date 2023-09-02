import axios from 'axios';

const BASE_URL = 'https://books-backend.p.goit.global/books';

export async function fetchCategoryList() {
  const res = await axios.get(`${BASE_URL}/category-list`);
  return res.data;
}

export async function fetchTopBooks() {
  const res = await axios.get(`${BASE_URL}/top-books`);
  return res.data;
}

export async function fetchParticularCategory(category) {
  const res = await axios.get(`${BASE_URL}/category?category=${category}`);
  return res.data;
}

export async function fetchBookById(id) {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
}
