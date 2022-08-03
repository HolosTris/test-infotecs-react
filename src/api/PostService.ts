export default class PostService {
  static async getAllTodos(limit = 10, page = 1) {
    return await fetch(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`
    );
  }

  // static async getPostById(id) {
  //   return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  // }
}
