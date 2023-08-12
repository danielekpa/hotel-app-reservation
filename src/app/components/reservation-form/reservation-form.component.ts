import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  existingReservation = true;

  slugId = '';

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    })

    // const slugId = this.activatedRoute.snapshot.paramMap.get('id') 
    this.slugId = this.activatedRoute.snapshot.params?.['id']

    if (this.slugId) {
      // const reservation = this.reservationService.getReservation(this.slugId);

      this.reservationService.getReservation(this.slugId).subscribe(reservation => {
        if (reservation.length) {
          this.existingReservation = true
          this.reservationForm.patchValue(reservation?.[0])
          return;
        }
        this.existingReservation = false
      });
    }
  }

  onSubMit() {
    if (this.reservationForm.valid) {
      const reservation: Reservation = this.reservationForm.value

      //update the reservation
      if (this.slugId) this.reservationService.updateReservation(this.slugId, reservation).subscribe()
      // New reservation
      else this.reservationService.addReservation(reservation).subscribe();

      this.router.navigate(['/list'])
    }
  }

  goBackToPrevPage(): void {
    this.location.back();
  }
}
