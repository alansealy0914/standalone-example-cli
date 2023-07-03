import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityValidator } from 'src/app/shared/util-common';
import { FlightCardComponent } from '../../ui-common';
import { FlightBookingStore, MyStore } from '../../data';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    JsonPipe,

    FormsModule,
    FlightCardComponent,
    CityValidator,
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearchComponent {
  private facade = inject(FlightBookingStore);
  private store = inject(MyStore);
  
  from = this.facade.from;
  to = this.facade.to;
  basket = this.facade.basket;
  flights = this.facade.flights;
  selected = this.facade.selected;

  constructor() {
    console.log('counter', this.store.counter())
  }

  async search() {
    this.facade.load();
  }

  delay(): void {
    this.facade.delay();
  }

  updateCriteria(from: string, to: string): void {
    this.facade.updateCriteria(from, to);
  }

  updateBasket(id: number, selected: boolean): void {
    this.facade.updateBasket(id, selected);
  }
}
