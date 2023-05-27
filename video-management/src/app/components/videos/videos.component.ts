import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../../models/videos.model'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  @Input() video!: Video;
  constructor() { }

  ngOnInit(): void {
  }

}
