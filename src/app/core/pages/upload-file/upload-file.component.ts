import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FileQueueObject } from 'src/app/shared/models/fileQueueObject';
import { UploadServerService } from '../../services/uploader/upload-server.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!:  any;
  queue!: Observable<FileQueueObject[]>;

  constructor(public uploader: UploadServerService) { }

  ngOnInit() {
    this.uploader.clearQueue();
    this.queue = this.uploader.queue;
  }

  addToQueue() {
    const fileBrowser = this.fileInput?.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }

  clearQueue(){
    this.uploader.clearQueue();
    this.fileInput.nativeElement.value = null;
  }
}

