import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyTodoUI';
  todos: Todo[] = [];


  constructor(
    private apiService: ApiService
  ) {
  }

  public ngOnInit() {
    this.apiService.getAllTodos().subscribe(
      (todos) => {
        this.todos = todos;
      }
    );
  }

  onAddTodo(todo) {
    this.apiService.addTodo(todo).subscribe(
      newTodo => {
        this.todos = this.todos.concat(newTodo);
      }
    );
  }

  onToggleTodoComplete(todo) {
    this.apiService.toggleTodoComplete(todo).subscribe(
      updatedTodo => todo = updatedTodo
    );
  }

  onRemoveTodo(todo) {
    this.apiService.deleteTodoById(todo.id).subscribe(
      _ => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      }
    );
  }
}
