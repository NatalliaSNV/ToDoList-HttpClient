import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, throwError } from "rxjs";

export interface Todo{
    title: string,
    completed: boolean,
    id?: number
}

@Injectable({
    providedIn: 'root'
})
export class TodosService{

    constructor(private http: HttpClient){}

    addTodo(todo: Todo): Observable<Todo>{
        const headers = new HttpHeaders({
            'MyCustomHeader': '123'
        });
        return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos/', todo, {headers: headers})
    }

    fetchTodos(): Observable<Todo[]>{
        let params = new HttpParams();
        params = params.append('_limit', '4');
        params = params.append('myParam', 'rer');
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos/', {params})
                .pipe(delay(1500),
                      catchError(error => {
                            console.log('catchError', error);
                            return throwError(error);
                      }))
    }

    removeTodo(id: number | undefined): Observable<void>{
        return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
    }

    completeTodo(id: number | undefined): Observable<Todo>{
        return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {completed: true})
    }
}