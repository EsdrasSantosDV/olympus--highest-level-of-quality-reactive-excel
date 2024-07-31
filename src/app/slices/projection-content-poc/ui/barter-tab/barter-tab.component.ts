import { ChangeDetectionStrategy, Component, computed, contentChildren, ElementRef, signal, TemplateRef, viewChild } from '@angular/core';
import { TabDirective } from '../../../../shared/directives/tab.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barter-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barter-tab.component.html',
  styleUrl: './barter-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarterTabComponent {
  tabs = contentChildren(TabDirective);
  activeTabId = signal<string | null>(null);


  selectedTabTpl = computed(() => {
    const tabs = this.tabs();
    if (!tabs.length) return null;

    const selected = this.activeTabId();

    if (!selected) return tabs[0].tpl;

    return tabs.find((tab) => tab.title() === selected)!.tpl;
  });
}
