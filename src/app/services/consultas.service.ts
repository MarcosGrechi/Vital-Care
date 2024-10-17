import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor() { }

  salvarConsulta(consulta: any, pacienteSelecionado: any) {
    const idConsulta = this.gerarIdConsulta();
    consulta.idConsulta = idConsulta; // Adiciona o idConsulta ao objeto de consulta
    consulta.nomeCompletoPaciente = pacienteSelecionado.nomeCompleto; // Adiciona o nome do paciente
    consulta.idPaciente = pacienteSelecionado.id; // Adiciona o id do paciente
    let consultas: any[] = this.obterConsultas();
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
  }
  gerarIdConsulta(): string {
    const consultas = this.obterConsultas();
    const proximoId = consultas.length + 1;
    return `C${proximoId.toString().padStart(6, '0')}`;
  }
  
  obterConsultas(): any[] {
    return JSON.parse(localStorage.getItem('consultas') || '[]');
  }

  obterConsultasPorId(idPaciente: string): any[] {
    const consultas = this.obterConsultas();
    return consultas.filter(consulta => consulta.idPaciente === idPaciente);
  }

  obterConsultaPorId(idConsulta: string): any {
    const consultas = this.obterConsultas();
    return consultas.find(consulta => consulta.idConsulta === idConsulta);
  }
  
  obterQuantidadeConsultas(): number {
    return this.obterConsultas().length;
  }

  deletarConsulta(id: string) {
    let consultas: any[] = this.obterConsultas();
    const index = consultas.findIndex(consulta => consulta.idConsulta === id);
    if (index !== -1) {
      consultas.splice(index, 1); 
      localStorage.setItem('consultas', JSON.stringify(consultas));
    } else {
      console.error('Consulta não encontrada para deletar.');
    }
  }

  atualizarConsulta(consultaAtualizada: any) {
    let consultas: any[] = this.obterConsultas();
    const index = consultas.findIndex(consulta => consulta.idConsulta === consultaAtualizada.idConsulta);
    if (index !== -1) {
      consultas[index] = consultaAtualizada;
      localStorage.setItem('exames', JSON.stringify(consultas));
    } else {
      console.error('Exame não encontrado para atualizar.');
    }
  }
  
}

