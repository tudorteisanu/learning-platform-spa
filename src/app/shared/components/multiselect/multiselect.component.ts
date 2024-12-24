import { Component, input, signal, OnInit, inject, forwardRef, computed } from '@angular/core';
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
export class MultiselectComponent implements ControlValueAccessor {
  options = input<any[]>([]);
  http = inject(HttpClient);
  valueKey = input<string>('id');
  textKey = input<string>('text');
  fetchUrl = input<string>('text');
  selectedItemsIds = signal<(string | number)[]>([]);
  areOptionsVisivle = signal(false);

  readonly selectedItems = computed(() =>
    this.options().filter((item) =>
      this.selectedItemsIds().includes(item[this.valueKey()])));

  onChange = (value: any) => {};

  onTouched = (value: any) => {};

  writeValue(obj: any): void {
    this.onChange(obj);
    this.selectedItemsIds.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleSelection(option: any): void {
    if (this.isSelected(option)) {
      this.remove(option);
    } else {
      this.add(option);
    }

    this.onChange(this.selectedItemsIds());
  }

  filterBySelected(item: any) {
    return this.selectedItemsIds().includes(item);
  }

  isSelected(option: any) {
    return this.selectedItemsIds().includes(option[this.valueKey()]);
  }

  add(option: any) {
    this.selectedItemsIds.update((value) => [...value, option[this.valueKey()]]);
  }

  remove(option: any) {
    this.selectedItemsIds.update(items =>
      items.filter(value => value !== option[this.valueKey()]));
  }

  toggle() {
    this.areOptionsVisivle.update(value => !value);
  }

  hide() {
    this.areOptionsVisivle.set(false);
  }
}
