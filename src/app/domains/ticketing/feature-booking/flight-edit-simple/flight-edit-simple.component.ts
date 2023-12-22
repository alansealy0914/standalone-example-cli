import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Flight, FlightBookingStore, SimpleFlightBookingStore } from '../../data';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-flight-edit-simple',
  templateUrl: './flight-edit-simple.component.html',
})
export class FlightEditSimpleComponent implements OnInit {

  @ViewChild(NgForm)
  private form!: NgForm;

  private store = inject(SimpleFlightBookingStore);

  current = this.store.current;
  loading = this.store.loading;
  error = this.store.error;

  @Input({ required: true })
  id = '';

  ngOnInit(): void {
    this.store.loadById(this.id);
  }

  async save() {
    const flight = this.form.value as Flight;
    if (flight.id) {
      await this.store.update(flight);
    }
    else {
      await this.store.create(flight);
    }
  }

  async createNew() {
    await this.store.setCurrent({} as Flight);
  }

  async deleteFlight() {
    await this.store.delete(this.form.value)
  }

}
