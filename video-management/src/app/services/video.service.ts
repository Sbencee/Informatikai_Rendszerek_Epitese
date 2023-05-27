import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Video } from '../models/videos.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getvideos() {
    return lastValueFrom(this.http.get<Video[]>('/api/video'));
  }
  
  updatevideo(video: Partial<Video>) {
    return lastValueFrom(this.http.put<Video>('/api/video/', video));
  }
  
  createvideo(video: Partial<Video>) {
    return lastValueFrom(this.http.post<Video>('/api/video', video));
  }
  
  searchvideo(query: string) {
    return lastValueFrom(this.http.get<Video[]>('/api/video/search', {
      params: {
        search: query
      }
    })
    )}
}
