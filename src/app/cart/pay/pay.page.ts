import { Component, Input, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/home/restaurante/restaurante.interface';
import { Orden } from 'src/app/interfaces/orden.interface';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  @Input() restaurante: Restaurante;
  @Input() orden: Orden;

  constructor() {}

  ngOnInit() {}
}
