import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '../class/baseAPI.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/chatbot';

  }

  sendMessage(message: string): Observable<{ response: string }> {
    return this.httpClient.post<{ response: string }>(this.baseUrl, { message });
  }
}
