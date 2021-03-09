import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    let classificacao = "";
    let obesidadeGrau = 0;
    if (imc < 18.5) {
        classificacao = "MAGREZA";
    } else if (imc > 18.5 && imc < 24.9) {
        classificacao = "NORMAL";
    } else if (imc > 25.0 && imc < 29.9) {
        classificacao = "SOBREPESO";
        obesidadeGrau = 1;
    } else if (imc > 30.0 && imc < 39.9) {
        classificacao = "OBESIDADE";
        obesidadeGrau = 2;
    } else if (imc > 40.0) {
        classificacao = "OBESIDADE GRAVE";
        obesidadeGrau = 3;
    } 
    this.showMessage(`IMC = ${imc.toFixed(2)} Classificação = ${classificacao} Grau de Obesidade = ${obesidadeGrau}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
