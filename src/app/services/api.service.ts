import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPost = 'http://127.0.0.1:5000/post';
  private apiGet = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  // Método para obtener encabezados HTTP con el token JWT
  private getHeaders(): HttpHeaders {
    // Obtiene el token JWT almacenado en localStorage
    const userToken = localStorage.getItem('userToken');

    // Crea un objeto HttpHeaders que incluye el token JWT en el encabezado de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}` // Agrega el token como encabezado de autorización con el prefijo 'Bearer'
    });

    return headers;
  }

  
  getData() {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    //return this.http.get(this.apiGet);
    return this.http.get(`${this.apiGet}/get`, { headers });
    
  }

  // Realiza una solicitud POST con el token JWT incluido
  postData(form: any) {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();

    // Realiza una solicitud POST a la API con los encabezados
    return this.http.post(this.apiPost, form, { headers });
  }

  
}