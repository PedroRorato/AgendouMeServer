const horariosDisponiveis = [
  {
    id: 1,
    horario: "9:00",
  },
  {
    id: 2,
    horario: "10:00",
  },
  {
    id: 3,
    horario: "11:00",
  },
  {
    id: 4,
    horario: "14:00",
  },
  {
    id: 5,
    horario: "15:00",
  },
  {
    id: 6,
    horario: "16:00",
  },
  {
    id: 7,
    horario: "17:00",
  },
  {
    id: 8,
    horario: "20:00",
  },
  {
    id: 9,
    horario: "21:00",
  },
];

const agendamentos = [
  {
    id: 1,
    data: "9 de Julho | 11:00",
    servico: "Corte de Cabelo",
    empresa: "Barbearia do Zé",
  },
  {
    id: 2,
    data: "10 de Julho | 20:00",
    servico: "Barba",
    empresa: "Barbearia Fígaro",
  },
  {
    id: 3,
    data: "19 de Julho | 12:00",
    servico: "Pezinho",
    empresa: "Barbearia Dom",
  },
  {
    id: 4,
    data: "8 de Agosto | 8:00",
    servico: "Massagem",
    empresa: "Massoterapia Holistica",
  },
  {
    id: 5,
    data: "29 de Agosto | 15:00",
    servico: "Consulta Médica",
    empresa: "Dr Frankenstein",
  },
  {
    id: 6,
    data: "7 de Setembro | 15:00",
    servico: "Corte de Cabelo",
    empresa: "Barbearia do Zé",
  },
  {
    id: 7,
    data: "20 de Julho | 10:00",
    servico: "Corte de Cabelo",
    empresa: "Barbearia do Zé",
  },
];

module.exports = {
  async horariosDisponiveis(request, response) {
    return response.json(horariosDisponiveis);
  },

  async agendamentos(request, response) {
    return response.json(agendamentos);
  },
};
