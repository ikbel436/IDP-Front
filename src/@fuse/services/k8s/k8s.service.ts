import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class K8sService {
  private apiUrl = 'http://localhost:3000/k8';
  constructor(private http: HttpClient) { }
  generateTPd(podData: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/generate-pod`, podData);
  }
  generatePod(podData: any) {
    return this.http.post(`${this.apiUrl}/generate-pod`, podData, { responseType: 'text' });
  }
}
