import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpRequest, HttpEventType } from '@angular/common/http';
import { Uploader } from '../model/uploader';
import { Uploadqueue } from '../model/uploadqueue';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
public message : string;
public uploader: Uploader = new Uploader();
allowedExtensionsList = ['zip','jpg','png','jpeg','rar','JPG','doc','docx','xls','xlsx','csv','pdf','txt','DAT'];

  constructor(private http: HttpClient) {
      
   }

  get progress() : number {
    let progressSum = 0;
    for(let entry of this.uploader.queue){
      progressSum+= entry.progress;
    }

    if(progressSum == 0)
      return 0;
    
    return Math.round(progressSum / this.uploader.queue.length);
  }

  ngOnInit() {
  }

  onFilesChange(fileList: Array<File>)
  {
    for(let file of fileList) {
      console.log(file.size + '-' + (2000 * 1024) )
      if(file.size <= (2000 * 1024))
      {     
        this.uploader.queue.push(new Uploadqueue(file));
      }
      else
     {
      alert(`This file ${file.name} is more than 2mb`);
      }
     
    }
  };

  onFilesInvalids(fileList: Array<File>){
    for(let file of fileList){
     
    }
  }

  onSelectChange(event: EventTarget)
  {
    let eventObj : MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files : FileList = target.files;
    let file = files[0];

    if(file) {
      this.uploader.queue.push(new Uploadqueue(file));

      console.log(`Total Count:${this.uploader.queue.length}`);
    }
  }

  upload(id) {
    if(id== null)
    {
      return;
    }

    let selectedFile = this.uploader.queue.find(x=>x.id == id);

    if(selectedFile)
    {
      const formData = new FormData();
      formData.append(selectedFile.file.name,selectedFile.file);
      
      const uploadReq = new HttpRequest('POST', `api/upload`,formData,
                       {reportProgress:true});

      this.http.request(uploadReq).subscribe(event=> {
        if(event.type === HttpEventType.UploadProgress)
        {
          selectedFile.progress = Math.round(100 * event.loaded/event.total);
        }
        else if(event.type === HttpEventType.Response)
        {
          selectedFile.message = event.body.toString();
        }
      });
    }
  }

  cancel(id){
    if(id== null)
    {
      return;
    }

    let selectedFile = this.uploader.queue.find(x=>x.id == id);
    let index = this.uploader.queue.indexOf(selectedFile);
    this.uploader.queue.slice(index,1);

  }

   uploadAll()
   {
     let remainingFiles = this.uploader.queue.filter(x=> !x.isSuccess);
     for(let item of remainingFiles){
       this.upload(item.id);
     }
  }

  allowedExtensions() {
    return this.allowedExtensionsList;
  }
}
