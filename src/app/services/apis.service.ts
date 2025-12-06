import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  private apiUrl = environment.backendUrl;
  private token = localStorage.getItem('token') || '';
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http.get(`/api/files`);
  }

  uploadFile(file: File, relatedModel: string, relatedId: string, category?: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('relatedModel', relatedModel);
    formData.append('relatedId', relatedId);
    if (category) {
      formData.append('category', category);
    }

    const headers = new HttpHeaders({
       'Authorization': `Bearer ${this.token}` 
    });

    return this.http.post<any>(`/api/files/upload`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });
  }
  deleteFile(fileId: any) {
    return this.http.delete(`/api/files/${fileId}`);
  }

  enableFile(fileId: any, isActive: boolean) {
    return this.http.put(`/api/files/${fileId}/enable`, {isActive});
  }

  getDemandes(
    page = 1,
    limit = 10,
    search = '',
    status?: string,
    type?: string,
  ) {
    let params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit))
      .set('search', search || '');

    if (status) params = params.set('status', status);
    if (type) params = params.set('type', type);

    const url = `/api/applications/all`;
    console.log('GET', url, params.toString()); // debug : voir l'URL et params dans console
    return this.http.get(url, { params });
  }

  getDemandeById(demandeId: string) {
    return this.http.get(`/api/applications/${demandeId}`);
  }

  updateDemandeStatus(demandeId: string, status: string) {
    return this.http.put(`/api/applications/${demandeId}`, { status });
  }

  makeNotesDemande(demandeId: string, notes: string) {
    return this.http.post(`/api/applications/${demandeId}/notes`, { notes });
  }

  deleteDemande(demandeId: string) {
    return this.http.delete(`/api/applications/${demandeId}`);
  }

  fetchProfile() {
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${this.token}` 
    });
    return this.http.get(`/api/auth/me`, { headers });
  }
}
