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
  steps = 0;

  async connectWatch() {
    try {

      // 1. Request Health Connect permission
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

      // 2. Permission granted
      this.connectionStatus = 'Permission granted. Reading steps...';

      // 3. Today's date
      const today = new Date();

      const startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(today);

      const formatDate = (date: Date) => {
        return date.toISOString().split('.')[0] + 'Z';
      };

      // 4. Read Steps from Health Connect
      const response = await HealthFitness.getData({
        parameters: JSON.stringify({
          Variable: 'STEPS',
          StartDate: formatDate(startDate),
          EndDate: formatDate(endDate),
          TimeUnit: 'DAY',
          OperationType: 'SUM',
          TimeUnitLength: 1,
          AdvancedQueryReturnType: 'ALL_DATA',
          AdvancedQueryResultType: 'RAW_DATA'
        })
      });

      console.log('Health Connect response:', response);

      // 5. Convert response
      const results = JSON.parse(response.results ?? '[]');

      console.log('Steps results:', results);

      // 6. Get steps value
      if (results.length > 0) {
        this.steps = Number(results[0].value ?? 0);
      } else {
        this.steps = 0;
      }

      this.connectionStatus = 'Connected successfully';


    } catch (error) {

      console.error('Health Connect error:', error);

      this.connectionStatus =
        'ERROR: ' + JSON.stringify(error);

    }
  }

}