import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileQueueObject } from 'src/app/shared/models/fileQueueObject';
import { FileQueueStatus } from 'src/app/shared/models/fileQueueStatus';

@Injectable({
  providedIn: 'root'
})
export class UploadServerService {

  public url: string = 'https://localhost:7105/api/AzureStorageAccount/';

  private _queue: BehaviorSubject<FileQueueObject[]>;
  private _files: FileQueueObject[] = [];

  constructor(private http: HttpClient) {
    this._queue = <BehaviorSubject<FileQueueObject[]>>new BehaviorSubject(this._files);
  }

  // the queue
  public get queue() {
    return this._queue.asObservable();
  }

  // public functions
  public addToQueue(data: any) {
    // add file to the queue
    for (let i = 0; i < data.length; i++) {
      this._addToQueue(data[i])
    }
  }

  public clearQueue() {
    // clear the queue
    this._files = [];
    this._queue.next(this._files);
  }

  public uploadAll() {
    this._files.forEach(file => {
      if (file.isUploadable()) {
        this._upload(file);
      }
    })
  }

  // private functions
  private _addToQueue(file: any) {
    const queueObj = new FileQueueObject(file);
    
    // set the individual object events
    queueObj.upload = () => this._upload(queueObj);
    queueObj.remove = () => this._removeFromQueue(queueObj);

    // push to the queue
    this._files.push(queueObj);
    this._queue.next(this._files);
  }

  private _removeFromQueue(queueObj: FileQueueObject) {
    this._files = this._files.filter(x => x != queueObj);
    this._queue.next(this._files);
  }

  private _upload(queueObj: FileQueueObject) : void {
    queueObj.isClicked = true;
    // create form data for file
    const form = new FormData();
    form.append('file', queueObj.file, queueObj.file.name);
    form.append('containerName', 'images');

    // upload file and report progress
    this.http.post(this.url + 'addblob', form).subscribe({
      next: (event: any) => {
        this._uploadComplete(queueObj);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this._uploadFailed(queueObj);
        } else {
          this._uploadFailed(queueObj);
        }
      }
    }).add(() => queueObj.isClicked = false);
  }

  private _uploadComplete(queueObj: FileQueueObject) {
    queueObj.progress = 100;
    queueObj.status = FileQueueStatus.Success;
    this._queue.next(this._files);
  }

  private _uploadFailed(queueObj: FileQueueObject) {
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Error;
    this._queue.next(this._files);
  }
}
