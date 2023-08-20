import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissService } from './servicesPermiss.services';
import { MatDialog } from '@angular/material/dialog';
import { DialogPermissComponent } from './models/dialog-permiss/dialog-permiss.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showFiller = true;


  constructor(private router: Router, private _httpClient: HttpClient, public permiss: PermissService, public dialog: MatDialog) {
    this.router.navigate(["store"]);

    const urlGetDataStore = 'https://localhost:7271/api/Permisos';
    this._httpClient.get(urlGetDataStore).subscribe((data: any) => {
      if (Array.isArray(data)) {
        if (data.length > 0) {
          let jsonKeys = Object.keys(data[0]);
          for (let item of jsonKeys) {
            if (item != "up_rowid") {
              data[0][item] = data[0][item] === 1 ? true : false;
            }
          }
          this.permiss.permiss = data[0];
        } else {
          const jsonPermiss = {
            "up_rowid": 0,
            "up_adcnar": 1,
            "up_mdfcar": 1,
            "up_brrar": 1,
            "up_lstar": 1
          }
          const urlGetDataStore = 'https://localhost:7271/api/Permisos';
          this._httpClient.post(urlGetDataStore, jsonPermiss).subscribe((data: any) => {
            if (data) {
              let jsonKeys = Object.keys(data);
              for (let item of jsonKeys) {
                if (item != "up_rowid") {
                  data[item] = data[item] === 1 ? true : false;
                }
              }
              this.permiss.permiss = data;
            }
          });
        }
      }
    });

  }


  /**
     * @description función que abre el modal que permita modificar los permisos del sistema
     * @param 
     * @author Jhonatan David Mosquera
     * @date 17/08/2023
     * @returns {void}
  */
  openDialogPermiss(): void {
    try {
      const dialogRef = this.dialog.open(DialogPermissComponent);
    } catch (error) {
      console.log("error en la función ", error);
    }
  }



  /**
     * @description función que dirije a un link
     * @param 
     * @author Jhonatan David Mosquera
     * @date 17/08/2023
     * @returns 
  */
  sendLink(): void {
    try {
      var anchor = document.createElement("a");
      anchor.href = "https://github.com/JDMosquera10";
      anchor.click();
      anchor.remove();
    } catch (error) {
      console.log("error en la función ", error);
    }
  }

  title = 'bodegas';
}
