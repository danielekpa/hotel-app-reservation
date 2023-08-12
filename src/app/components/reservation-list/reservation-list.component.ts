import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {
  
  }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((reservations) => this.reservations = reservations);
  }

  deleteReservation(id: string) { 
    this.reservationService.deleteReservation(id).subscribe();
  }
}
