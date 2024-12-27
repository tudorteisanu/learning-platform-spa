import { Component, OnInit, input, signal } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  message = input('');
  type = input<'success' | 'error' | 'info'>('info');
  duration = input(3000);

  isVisible = signal(false);

  ngOnInit() {
    this.isVisible.set(true);

    timer(this.duration()).subscribe(() => {
      this.isVisible.set(false);
    })
  }
}
