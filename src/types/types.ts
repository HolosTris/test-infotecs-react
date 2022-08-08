export interface IServerTodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type Status = "waiting" | "processing" | "completed";

export class Todo {
  id: number;
  userId: number;
  title: string;
  body: string;
  status: Status;

  constructor(title: string, body: string);
  constructor(serverTodo: IServerTodo);
  constructor(titleOrServerTodo: string | IServerTodo, body?: string) {
    // Для конвертации todo с JSONplaceholder
    if (typeof titleOrServerTodo === "object") {
      const serverTodo = titleOrServerTodo;

      this.id = serverTodo.id;
      this.userId = serverTodo.userId;
      this.title = serverTodo.title;
      this.body = serverTodo.title;
      this.status = serverTodo.completed ? "completed" : "waiting";
    } else {
      // Для создания новых todo
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

  static deleteById(id: number, todos: Todo[]) {
    const i = todos.findIndex((todo) => todo.id === id);

    return todos.splice(i, 1);
  }

  static convertServerTodos(serverTodos: IServerTodo[]) {
    return serverTodos.map((serverTodo) => new Todo(serverTodo));
  }
}
