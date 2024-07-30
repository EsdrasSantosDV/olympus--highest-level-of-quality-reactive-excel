import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-case-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-tree.component.html',
  styleUrl: './case-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseTreeComponent <T extends TreeItem>  {
  @Input()
  public treeData: T[] = [];

  @ContentChild(TemplateRef)
  public nodeTemplate: TemplateRef<any> | null = null;
}


export interface TreeItem {
  children?: TreeItem[];
  expanded: WritableSignal<boolean>
}
