import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3000/reservations'
  // private apiUrl = 'http://3a59-197-211-63-102.ngrok.io/reservations'
  private reservations: Reservation[] = [];

  constructor(private http:HttpClient) {
  }

  // CRUD
  addReservation(reservation: Reservation): Observable<Reservation[]> {
    reservation.id = Date.now().toString();

    // this.reservations.push(reservation);
    // console.log(this.reservations);
    // localStorage.setItem('reservations', JSON.stringify(this.reservations))

    return this.http.post<Reservation[]>(this.apiUrl, reservation, httpOptions)
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
    // return this.reservations;
  }

  getReservation(id: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + `?id=${id}`);
    // return this.reservations.find(res => res.id === id);
  }

  updateReservation(reservationId: string, updatedReservation: Reservation): Observable<Reservation> {
    const patchedIdReservation = { ...updatedReservation, id: reservationId }

    const url = `${this.apiUrl}/${reservationId}`
    return this.http.put<Reservation>(url, patchedIdReservation, httpOptions);
  }

  deleteReservation(id: string): Observable<void> {
    // let index = this.reservations.findIndex(res => res.id === id);
    // this.reservations.splice(index,1)
    // this.reservations = this.reservations.filter(res => res.id !== id);
    return this.http.delete<void>(this.apiUrl + `/${id}`)
  }
}
