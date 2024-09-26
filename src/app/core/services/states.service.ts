import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  http = inject(HttpClient);

  getStateNation(): Observable<StateNation[]> {
    // Retornando um Observable com os dados de todas as regiões do Brasil
    return of([
      // Região Norte
      { id: 17, nome: 'Acre', ddd: '68', sigla: 'AC', capital: 'Rio Branco', region: { id: 4, nome: 'Norte' } },
      { id: 18, nome: 'Amapá', ddd: '96', sigla: 'AP', capital: 'Macapá', region: { id: 4, nome: 'Norte' } },
      { id: 19, nome: 'Amazonas', ddd: '92', sigla: 'AM', capital: 'Manaus', region: { id: 4, nome: 'Norte' } },
      { id: 20, nome: 'Pará', ddd: '91', sigla: 'PA', capital: 'Belém', region: { id: 4, nome: 'Norte' } },
      { id: 21, nome: 'Rondônia', ddd: '69', sigla: 'RO', capital: 'Porto Velho', region: { id: 4, nome: 'Norte' } },
      { id: 22, nome: 'Roraima', ddd: '95', sigla: 'RR', capital: 'Boa Vista', region: { id: 4, nome: 'Norte' } },
      { id: 23, nome: 'Tocantins', ddd: '63', sigla: 'TO', capital: 'Palmas', region: { id: 4, nome: 'Norte' } },

      // Região Nordeste
      { id: 8, nome: 'Alagoas', ddd: '82', sigla: 'AL', capital: 'Maceió', region: { id: 3, nome: 'Nordeste' } },
      { id: 9, nome: 'Bahia', ddd: '71', sigla: 'BA', capital: 'Salvador', region: { id: 3, nome: 'Nordeste' } },
      { id: 10, nome: 'Ceará', ddd: '85', sigla: 'CE', capital: 'Fortaleza', region: { id: 3, nome: 'Nordeste' } },
      { id: 11, nome: 'Maranhão', ddd: '98', sigla: 'MA', capital: 'São Luís', region: { id: 3, nome: 'Nordeste' } },
      { id: 12, nome: 'Paraíba', ddd: '83', sigla: 'PB', capital: 'João Pessoa', region: { id: 3, nome: 'Nordeste' } },
      { id: 13, nome: 'Pernambuco', ddd: '81', sigla: 'PE', capital: 'Recife', region: { id: 3, nome: 'Nordeste' } },
      { id: 14, nome: 'Piauí', ddd: '86', sigla: 'PI', capital: 'Teresina', region: { id: 3, nome: 'Nordeste' } },
      {
        id: 15,
        nome: 'Rio Grande do Norte',
        ddd: '84',
        sigla: 'RN',
        capital: 'Natal',
        region: { id: 3, nome: 'Nordeste' },
      },
      { id: 16, nome: 'Sergipe', ddd: '79', sigla: 'SE', capital: 'Aracaju', region: { id: 3, nome: 'Nordeste' } },

      // Região Centro-Oeste
      {
        id: 24,
        nome: 'Distrito Federal',
        ddd: '61',
        sigla: 'DF',
        capital: 'Brasília',
        region: { id: 5, nome: 'Centro-Oeste' },
      },
      { id: 25, nome: 'Goiás', ddd: '62', sigla: 'GO', capital: 'Goiânia', region: { id: 5, nome: 'Centro-Oeste' } },
      {
        id: 26,
        nome: 'Mato Grosso',
        ddd: '65',
        sigla: 'MT',
        capital: 'Cuiabá',
        region: { id: 5, nome: 'Centro-Oeste' },
      },
      {
        id: 27,
        nome: 'Mato Grosso do Sul',
        ddd: '67',
        sigla: 'MS',
        capital: 'Campo Grande',
        region: { id: 5, nome: 'Centro-Oeste' },
      },

      // Região Sudeste
      { id: 4, nome: 'Espírito Santo', ddd: '27', sigla: 'ES', capital: 'Vitória', region: { id: 2, nome: 'Sudeste' } },
      {
        id: 5,
        nome: 'Minas Gerais',
        ddd: '31',
        sigla: 'MG',
        capital: 'Belo Horizonte',
        region: { id: 2, nome: 'Sudeste' },
      },
      {
        id: 6,
        nome: 'Rio de Janeiro',
        ddd: '21',
        sigla: 'RJ',
        capital: 'Rio de Janeiro',
        region: { id: 2, nome: 'Sudeste' },
      },
      { id: 7, nome: 'São Paulo', ddd: '11', sigla: 'SP', capital: 'São Paulo', region: { id: 2, nome: 'Sudeste' } },

      // Região Sul
      { id: 1, nome: 'Paraná', ddd: '41', sigla: 'PR', capital: 'Curitiba', region: { id: 1, nome: 'Sul' } },
      {
        id: 2,
        nome: 'Rio Grande do Sul',
        ddd: '51',
        sigla: 'RS',
        capital: 'Porto Alegre',
        region: { id: 1, nome: 'Sul' },
      },
      {
        id: 3,
        nome: 'Santa Catarina',
        ddd: '48',
        sigla: 'SC',
        capital: 'Florianópolis',
        region: { id: 1, nome: 'Sul' },
      },
    ]);
  }
}

export interface StateNation {
  id: number;
  nome: string;
  ddd: string;
  sigla: string;
  capital: string;
  region: Region;
}

export interface Region {
  id: number;
  nome: string;
}
