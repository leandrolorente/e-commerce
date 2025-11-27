import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface UploadResponse {
  url: string;
  publicId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly API_URL = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResponse>(`${this.API_URL}/image`, formData);
  }

  deleteImage(publicId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/image/${publicId}`);
  }
}
