import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page {

  urlImageStorage : Photo[] =  [];
  datatemp : Photo[] = [];
  myBoolean = false;

  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService
    ) {}

  async ngOnInit(){
    await this.fotoService.loadFoto();
  }

  TambahFoto(){
    this.fotoService.tambahFoto();
  }

  tambah(t){
    
    
  }



  upload(){
    // this.urlImageStorage=[];
    // alert(t);
    // const imgFilepath = `imgStorage/${this.fotoService.dataFoto[t].filePath}`;
    //   this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[t].dataImage).then(() =>{
    //     this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          
    //       this.urlImageStorage.unshift(url);
    //       console.log(this.fotoService.dataFoto[t].filePath);
    //     });
    //   });

    for(var index in this.fotoService.dataFoto){
      if(this.myBoolean == true){
        const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
        this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() =>{
          this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
            this.urlImageStorage.unshift(url);
            console.log(url);
          });
        });
      }
     
    }
  }
}

export interface Photo {
  filePath : string;
  webviewPath : string;
  dataImage : File;
}
