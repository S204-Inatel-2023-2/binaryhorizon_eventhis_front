import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}
    post(serviceName: string, data: any = null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = { headers: headers, withCredintials: false };
      const url = environment.apiUrl + serviceName;

      if(data){
        return this.http.post(url, JSON.stringify(data), options);
      }
      return this.http.post(url, options);
    }

    get(serviceName: string, data: any = null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = { headers: headers, withCredintials: false };

      var url = environment.apiUrl + serviceName;

      if (data) {
        url = url + "/" + data;
      }

      return this.http.get(url, options);
    }

    put(serviceName: string, data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = { headers: headers, withCredintials: false };
      const url = environment.apiUrl + serviceName;

      return this.http.put(url, JSON.stringify(data), options);
    }

    delete(serviceName: string, data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = { headers: headers, withCredintials: false };
      var url = environment.apiUrl + serviceName;;
      if (data) {
        url = url + "/" + data;
      }

      return this.http.delete(url, options);
    }


    // image API methods
    postImage(data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = { headers: headers, withCredintials: false };
      const url = environment.imageApiUrl + 'upload';
      return this.http.post(url, JSON.stringify(data), options);
    }

    deleteImage(data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = { headers: headers, withCredintials: false };
      var url = environment.imageApiUrl + 'delete';;
      if (data) {
        url = url + "/" + data;
      }

      return this.http.delete(url, options);
    }

} 
