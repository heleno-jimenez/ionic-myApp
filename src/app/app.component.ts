import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { OAuth } from 'forcejs/oauth';
import { DataService } from 'forcejs/data-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let oauth = OAuth.createInstance();
      oauth.login().then(oauthResult => {
        DataService.createInstance(oauthResult);
        console.log("Logged Into Salesforce Successfully");
      });

      //  To get data from Salesforce add
      let sfdc = DataService.getInstance();
      sfdc.query().then(data => { console.log("DATA" + data) }).catch(error => console.log(error));
    });
  }
}
