import { Component, ViewContainerRef, input, model, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  tabs = input.required<{ title: string; alias: string, component?: any, props?: Record<string, any> }[]>();
  activeTab = model()

  selectTab(alias: string) {
    this.activeTab.set(alias);
  }
}
