import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges{

    todos: Todo[] = [];
    todoTitle = '';
    loading = false;
    errorText = '';
    

    constructor(private todoService: TodosService) {}

    ngOnInit(): void {
        this.fetchTodos();
    }

    ngOnChanges(){
        console.log('Todos', this.todos);
        
    }

    addTodo(){
        if (!this.todoTitle.trim()) {
            return;
        }
        const newTodo: Todo = {
            title: this.todoTitle,
            completed: false
        }

        this.todoService.addTodo(newTodo)
                .subscribe( response => {
                    this.todos.push(response);
                    this.todoTitle = '';
                }, error => {
                   this.errorText = error.message;
                })
    }

    fetchTodos(){
        this.loading = true;
        this.todoService.fetchTodos()
                .subscribe(response => {
                    this.todos = response;
                    this.loading = false;
                }, error => {
                    this.errorText = error.message;
                })
    }

    removeTodo(id: number | undefined){
        this.todoService.removeTodo(id)
                .subscribe((response) =>{
                    this.todos = this.todos.filter((item) => item.id !== id)
                }, error => {
                    this.errorText = error.message;
                })
    }

    completeTodo(id: number | undefined){
        this.todoService.completeTodo(id)
                        .subscribe((response) => {
                            this.todos.find((item) => item.id === response.id)!.completed = true;
                        }, error => {
                            this.errorText = error.message;
                        })
    }

}
