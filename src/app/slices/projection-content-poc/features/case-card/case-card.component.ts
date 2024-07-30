import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CaseCardDumbComponent } from '../../ui/case-card-dumb/case-card-dumb.component';
import { CommonModule } from '@angular/common';
import { CaseAccordionDumbComponent } from '../../ui/case-accordion-dumb/case-accordion-dumb.component';
import { CaseAccordionItemDumbComponent } from '../../ui/case-accordion-item-dumb/case-accordion-item-dumb.component';
import { CaseTreeComponent } from '../../ui/case-tree/case-tree.component';

@Component({
  selector: 'app-case-card',
  standalone: true,
  imports: [CaseCardDumbComponent,CommonModule,CaseAccordionDumbComponent,CaseAccordionItemDumbComponent,CaseTreeComponent],
  templateUrl: './case-card.component.html',
  styleUrl: './case-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseCardComponent {
  cards = signal([
    { title: 'Título do Card 1', content: 'Conteúdo do Card 1' },
    { title: 'Título do Card 2', content: 'Conteúdo do Card 2' },
    { title: 'Título do Card 3', content: 'Conteúdo do Card 3' },
    { title: 'Título do Card 4', content: 'Conteúdo do Card 4' },
    { title: 'Título do Card 5', content: 'Conteúdo do Card 5' },
    { title: 'Título do Card 6', content: 'Conteúdo do Card 6' },
    { title: 'Título do Card 7', content: 'Conteúdo do Card 7' },
    { title: 'Título do Card 8', content: 'Conteúdo do Card 8' },
    { title: 'Título do Card 9', content: 'Conteúdo do Card 9' },
    { title: 'Título do Card 10', content: 'Conteúdo do Card 10' },
  ]);


  public treeData: MyTreeItem[] = [
    {
      display: "Norte",
      value: '1',
      children: [
        { display: 'Amazonas', value: '11', expanded: signal(false) },
        { display: 'Pará', value: '12', expanded: signal(false) },
      ],
      expanded: signal(false),
    },
    {
      display: "Nordeste",
      value: '2',
      children: [
        { display: 'Bahia', value: '21', expanded: signal(false) },
        { display: 'Pernambuco', value: '22', expanded: signal(false) },
      ],
      expanded: signal(false),
    },
    {
      display: "Centro-Oeste",
      value: '3',
      children: [
        { display: 'Goiás', value: '31', expanded: signal(false) },
        { display: 'Mato Grosso', value: '32', expanded: signal(false) },
      ],
      expanded: signal(false),
    },
    {
      display: "Sudeste",
      value: '4',
      children: [
        { display: 'São Paulo', value: '41', expanded: signal(false) },
        { display: 'Minas Gerais', value: '42', expanded: signal(false) },
      ],
      expanded: signal(false),
    },
    {
      display: "Sul",
      value: '5',
      children: [
        { display: 'Paraná', value: '51', expanded: signal(false) },
        { display: 'Rio Grande do Sul', value: '52', expanded: signal(false) },
      ],
      expanded: signal(false),
    }
  ];


  public toggleTreeItem(item: MyTreeItem): void {
    item.expanded.update(value=>!value);
  }
}


export interface MyTreeItem {
  children?: MyTreeItem[];
  expanded: WritableSignal<boolean>;
  display: string;
  value: string;
}
