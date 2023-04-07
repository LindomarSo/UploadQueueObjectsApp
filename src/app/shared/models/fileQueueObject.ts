import { FileQueueStatus } from "./fileQueueStatus";

export class FileQueueObject {
    public file: any;
    public status!: FileQueueStatus;
    public progress: number = 0;
    public isClicked: boolean = false;
  
    constructor(file: any) {
      this.file = file;
    }
  
    // actions
    public upload = () => { /* set in service */ };
    public remove = () => { /* set in service */ };
  
    // status
    public isSuccess = () => this.status === FileQueueStatus.Success;
    public isError = () => this.status === FileQueueStatus.Error;
    public inProgress = () => this.status === FileQueueStatus.Progress;
    public isUploadable = () =>  this.status === FileQueueStatus.Error;  
  }