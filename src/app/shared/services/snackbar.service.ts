import { Injectable, ApplicationRef, ComponentRef, Injector } from '@angular/core';
import { createComponent } from '@angular/core';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private activeSnackbars: ComponentRef<SnackbarComponent>[] = [];

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000): void {
    const component = createComponent(SnackbarComponent, {
      environmentInjector: this.appRef.injector,
    });
    component.setInput('message', message);
    component.setInput('type', type);
    component.setInput('duration', duration);

    this.appRef.attachView(component.hostView);
    document.body.appendChild(component.location.nativeElement);

    // Adjust position to stack each snackbar
    const offset = this.activeSnackbars.length * 80; // e.g., 80px per snackbar
    component.location.nativeElement.style.bottom = `${20 + offset}px`;

    this.activeSnackbars.push(component);

    // Auto-remove after duration
    setTimeout(() => {
      this.dismiss(component);
    }, duration);
  }

  private dismiss(component: ComponentRef<SnackbarComponent>): void {
    this.appRef.detachView(component.hostView);
    component.destroy();

    // Remove from active stack
    this.activeSnackbars = this.activeSnackbars.filter((c) => c !== component);

    // Reposition remaining snackbars
    this.repositionSnackbars();
  }

  private repositionSnackbars(): void {
    this.activeSnackbars.forEach((snackbar, index) => {
      const offset = index * 80; // Adjust based on the snackbar height + margin
      snackbar.location.nativeElement.style.bottom = `${20 + offset}px`;
    });
  }
}
