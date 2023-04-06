import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'amb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('search') search!: ElementRef;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        filter((text: any) => {
          const textValue = text.target.value;
          return textValue.length > 3 || textValue.length === 0;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((evt: any) => {
        // console.log(evt.target.value);
        this.onSearch.emit(evt.target.value.toLowerCase());
      });
  }
}
