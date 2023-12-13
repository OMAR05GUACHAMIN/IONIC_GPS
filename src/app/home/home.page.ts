import { Component } from '@angular/core';
//3

import {Geolocation} from '@ionic-native/geolocation/ngx'
import { environment } from '../../environments/environment';

import {LocationService} from "../services/location.service";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: any=0;
  longitude: any=0;
  zoom: any=17;
  url: String = "";

  constructor(private geolocation: Geolocation, private loc: LocationService) {
  }

  options={
    timeout:10000,
    enableHighAccuracy: true,
    maximumAge:3600
  };

  getCurrentCoordinates(){
    this.geolocation.getCurrentPosition().then((resp)=>{
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getMap();
      this.loc.addLocation(this.latitude, this.longitude, this.url);
    }).catch((error) => {
      console.log("Error, no se puede obtener su ubicacion: ", error);
    });

  };
  
  getMap(){
    this.url = `https://www.google.com/maps/@${this.latitude},${this.longitude},${this.zoom}z?entry=ttu`;
    console.log(this.url);
    return this.url;
  }

  // async sendLocation(){
  //   try {
  //     const docRef = await addDoc(collection(db, "locations"), {
  //       latitude: this.latitude,
  //       longitude: this.longitude
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

}
