import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-six',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './exercise-six.component.html',
  styleUrl: './exercise-six.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.ShadowDom
})
export class ExerciseSixComponent implements OnInit{

  regionals = signal([
    { id: '1', name: 'Regional 1' },
    { id: '2', name: 'Regional 2' },
    { id: '3', name: 'Regional 3' }
  ]);

  branches = signal([
    { id: '101', name: 'Filial 1', regionalId: '1' },
    { id: '102', name: 'Filial 2', regionalId: '1' },
    { id: '103', name: 'Filial 3', regionalId: '2' },
    { id: '104', name: 'Filial 4', regionalId: '2' },
    { id: '105', name: 'Filial 5', regionalId: '3' },
    { id: '106', name: 'Filial 6', regionalId: '1' },
    { id: '107', name: 'Filial 7', regionalId: '1' },
    { id: '108', name: 'Filial 8', regionalId: '2' },
    { id: '109', name: 'Filial 9', regionalId: '2' },
    { id: '110', name: 'Filial 10', regionalId: '3' },
    { id: '111', name: 'Filial 11', regionalId: '3' },
    { id: '112', name: 'Filial 12', regionalId: '1' },
    { id: '113', name: 'Filial 13', regionalId: '1' },
    { id: '114', name: 'Filial 14', regionalId: '2' },
    { id: '115', name: 'Filial 15', regionalId: '2' },
    { id: '116', name: 'Filial 16', regionalId: '3' },
    { id: '117', name: 'Filial 17', regionalId: '3' },
    { id: '118', name: 'Filial 18', regionalId: '1' },
    { id: '119', name: 'Filial 19', regionalId: '2' },
    { id: '120', name: 'Filial 20', regionalId: '3' },
  ]);

filteredBranches=signal<Branch[]>([]);



ngOnInit(): void {
  this.filteredBranches.set(this.branches())
}


}

export interface Regional {
  id: string;
  name: string;
}

export interface Branch {
  id: string;
  name: string;
  regionalId: string;
}
