import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-back-button',
  templateUrl: './modal-back-button.component.html',
  styleUrls: ['./modal-back-button.component.scss'],
})
export class ModalBackButtonComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onCLick() {
    this.modalController.dismiss();
  }
}
