import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class CommonsService<T> {

    protected readonly path: string;

    constructor(
        protected http: HttpClient,
        protected endPoint: string
    ) {
        this.path = `http://localhost:8080/api/${endPoint}`;
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.path);
    }

    getById(id: number): Observable<T> {
        return this.http.get<T>(`${this.path}/${id}`);
    }

    create(data: T): Observable<T> {
        return this.http.post<T>(this.path, data);
    }

    update(data: T): Observable<T> {
        return this.http.put<T>(`${this.path}`, data);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.path}/${id}`);
    }
}