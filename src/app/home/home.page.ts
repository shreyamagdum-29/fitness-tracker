import { Component } from '@angular/core';
import { HealthFitness } from '@capacitor/health-fitness';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon
  ],
})
export class HomePage {

  connectionStatus = 'Not connected';

  async connectWatch() {
    try {
      this.connectionStatus = 'Requesting Health Connect permission...';

      await HealthFitness.requestHealthPermissions({
        customPermissions: JSON.stringify([
          {
            Variable: 'STEPS',
            AccessType: 'READ'
          }
        ]),
        allVariables: JSON.stringify({
          IsActive: false,
          AccessType: 'READ'
        }),
        fitnessVariables: JSON.stringify({
          IsActive: false,
          AccessType: 'READ'
        }),
        healthVariables: JSON.stringify({
          IsActive: false,
          AccessType: 'READ'
        }),
        profileVariables: JSON.stringify({
          IsActive: false,
          AccessType: 'READ'
        }),
        workoutVariables: JSON.stringify({
          IsActive: false,
          AccessType: 'READ'
        })
      });

      this.connectionStatus = 'Health Connect permission granted';

    } catch (error) {
      console.error(error);
      this.connectionStatus = 'Health Connect permission failed';
    }
  }

}