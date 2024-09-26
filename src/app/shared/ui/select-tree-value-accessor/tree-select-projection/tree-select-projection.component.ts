import { ChangeDetectionStrategy, Component, ContentChild, input, TemplateRef, WritableSignal } from '@angular/core';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tree-select-projection',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgTemplateOutlet,
  ],
  templateUrl: './tree-select-projection.component.html',
  styleUrl: './tree-select-projection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectProjectionComponent<T extends ItemTree> {
  treeData = input.required<T[]>();

  @ContentChild(TemplateRef)
  nodeTemplate: TemplateRef<any> | null = null;
}


export interface ItemTree {
  children?: ItemTree[];
  expanded: WritableSignal<boolean>;
}
