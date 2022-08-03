export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export class Todo {
  id: number;
  userId: number;
  title: string;
  body: string;
  status: "waiting" | "processing" | "completed";

  constructor(title: string, body: string);
  constructor(serverTodo: ITodo);
  constructor(titleOrServerTodo: string | ITodo, body?: string) {
    if (typeof titleOrServerTodo === "object") {
      const serverTodo = titleOrServerTodo;

      this.id = serverTodo.id;
      this.userId = serverTodo.userId;
      this.title = serverTodo.title;
      this.body = serverTodo.title;
      this.status = serverTodo.completed ? "completed" : "waiting";
    } else {
      const title = titleOrServerTodo;

      this.id = Date.now();
      this.userId = 0;
      this.title = title;
      this.body = body || "";
      this.status = "waiting";
    }
  }

  static getById(id: number, todos: Todo[]) {
    return todos.find((todo) => todo.id === id);
  }

  static convertServerTodos(serverTodos: ITodo[]) {
    return serverTodos.map((serverTodo) => new Todo(serverTodo));
  }
}
