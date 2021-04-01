import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Array<any>>(API_URL + '/Todo').pipe(
      map(response => response.map(todo => new Todo(todo)))
    );
  }

  public addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<any>(API_URL + '/Todo', todo).pipe(
      map(response => new Todo(response))
    );
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http.get<any>(API_URL + '/Todo/' + todoId).pipe(
      map(response => new Todo(response))
    );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<any>(API_URL + '/Todo/' + todo.id, todo).pipe(
      map(response => new Todo(response))
    );
  }

  public deleteTodoById(todoId: number): Observable<null> {
    return this.http.delete<any>(API_URL + '/Todo/' + todoId);
  }

  toggleTodoComplete(todo: Todo) {
    todo.isComplete = !todo.isComplete;
    return this.updateTodo(todo);
  }
}
