import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Video } from '../../models/videos.model';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {

  videos: Video[] = [];
  showNewvideo:boolean=false;
  query: string = '';
  successMessage='';
  errorMessage = '';


  constructor(private formBuilder: FormBuilder, private videoService: VideoService) { }

  videoForm = this.formBuilder.group({
    id: [0],
    isan: ['', Validators.required],
    author: ['', Validators.required],
    title: ['', Validators.required],
    stock: [0, Validators.min(0)],
    imgURL: ['https://islandpress.org/sites/default/files/default_video_cover_2015.jpg', Validators.pattern(/^(http|https):\/\//)],
    types: [[]]
  });
  
  showTag() {
    this.showNewvideo = true;
  }

  async ngOnInit() {
    try {
      this.videos = await this.videoService.getvideos();
      console.log(this.videos);
    } catch(err) {
      console.error(err);
    }
  }

  get isan() {
    return this.videoForm.controls['isan'];
  }
  get author() {
    return this.videoForm.controls['author'];
  }
  get title() {
    return this.videoForm.controls['title'];
  }
  get stock() {
    return this.videoForm.controls['stock'];
  }
  get imgURL() {
    return this.videoForm.controls['imgURL'];
  }  
  get types() {
    return this.videoForm.controls['types'];
  }

  async insertNewvideo() {
    this.errorMessage = '';
    this.successMessage = '';
    const video = this.videoForm.value;

    try {

      if (video.id) {
        await this.videoService.updatevideo(video);
        this.successMessage = 'video updated successfully.';
      } else {
        const insertedvideo = await this.videoService.createvideo(video);
        this.successMessage = 'video is inserted with id ' + insertedvideo.id;
      
    }
    this.showNewvideo = false; 
  }catch(err) {
      console.error(err);
    }
  }

  async search () {
    try{
      this.videos = await this.videoService.searchvideo(this.query);
    } catch (err) {
      console.error(err);
    }
  }


}
