import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page {

  urlImageStorage : Photo[] =  [];
  
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

  

  upload(a){
    this.urlImageStorage=[];
    // const imgFilepath = `imgStorage/${this.fotoService.dataFoto[a].filePath}`;
    //   this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[a].dataImage).then(() =>{
    //     this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          
    //       //var hslfoto = {filePath:url.toString()}
    //       this.urlImageStorage.unshift(url);
    //       console.log(this.fotoService.dataFoto[a].filePath);
    //     });
    //   });

    for(var index in this.fotoService.dataFoto){
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

export interface Photo {
  filePath : string;
}
