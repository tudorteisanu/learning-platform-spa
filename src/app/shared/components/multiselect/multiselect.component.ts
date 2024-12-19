import { Component, input, signal, OnInit, inject, forwardRef } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { HttpClient } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
  standalone: true,
  imports: [ClickOutsideDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true,
    },
  ]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {
  options = signal<any[]>([]);
  http = inject(HttpClient);
  valueKey = input<string>('id');
  textKey = input<string>('text');
  fetchUrl = input<string>('text');
  selectedItems = signal<any[]>([]);
  areOptionsVisivle = signal(false);

  onChange = (value: any) => {};

  onTouched = (value: any) => {};

  writeValue(obj: any): void {
    this.onChange(obj);
    this.selectedItems.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.http.get<any>(this.fetchUrl())
      .subscribe(value => {
        this.options.set(value);
      });
  }


  toggleSelection(option: any): void {
    if (this.isSelected(option)) {
      this.remove(option);
    } else {
      this.add(option);
    }

    this.onChange(this.selectedItems());
  }

  filterBySelected(item: any) {
    return this.selectedItems().includes(item);
  }

  isSelected(option: any) {
    return this.selectedItems().some(item => item[this.valueKey()] === option[this.valueKey()]);
  }

  add(option: any) {
    this.selectedItems.update((value) => [...value, option]);
  }

  remove(option: any) {
    this.selectedItems.update(items =>
      items.filter(value => value[this.valueKey()] !== option[this.valueKey()]));
  }

  toggle() {
    this.areOptionsVisivle.update(value => !value);
  }

  hide() {
    this.areOptionsVisivle.set(false);
  }
}
