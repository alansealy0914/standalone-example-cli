import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Flight, FlightBookingStore } from '../../data';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit {

  @ViewChild(NgForm)
  private form!: NgForm;

  private store = inject(FlightBookingStore);

  current = this.store.currentFlight;
  loading = this.store.flightLoading;
  error = this.store.flightError;

  @Input({ required: true })
  id = '';

  ngOnInit(): void {
    this.store.loadFlightById(this.id);
  }

  async save() {
    const flight = this.form.value as Flight;
    if (flight.id) {
      await this.store.updateFlight(flight);
    }
    else {
      await this.store.createFlight(flight);
    }
  }

  async createNew() {
    await this.store.setCurrentFlight({} as Flight);
  }

  async deleteFlight() {
    await this.store.deleteFlight(this.form.value)
  }

}
