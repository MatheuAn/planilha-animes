document.addEventListener('DOMContentLoaded', function() {
  const dateep = document.querySelector('.dateep').innerText;
  const nextepdateSpan = document.querySelector('.nextepdate span');
  const nextepdateDiv = document.querySelector('.nextepdate');
  const comentareppgDiv = document.querySelector('.comentareppg');
  const listepspgepDiv = document.querySelector('.listepspgep');

  // Função para adicionar dias a uma data
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Função para formatar a data no formato DD/MM/YYYY
  function formatDate(date) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Função para calcular a diferença em dias e horas
  function calculateTimeDifference(futureDate) {
    const now = new Date();
    const timeDiff = futureDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} dias e ${hours}h`;
  }

  // Função para verificar se a data atual é maior ou igual a uma data específica
  function isDatePastOrEqual(date) {
    const now = new Date();
    return now >= date;
  }

  // Converte a dataep para um objeto Date
  const initialDate = new Date(dateep.split('/').reverse().join('-'));

  // Calcula a nova data adicionando 7 dias
  const newDate = addDays(initialDate, 7);
  const formattedNewDate = formatDate(newDate);

  // Atualiza o conteúdo do nextepdateSpan
  nextepdateSpan.innerHTML = `${formattedNewDate} (<h8 class="cronometroepn">${calculateTimeDifference(newDate)}</h8>)`;

  // Verifica se a data atual é maior ou igual à data do nextepdateSpan
  if (isDatePastOrEqual(newDate)) {
    nextepdateDiv.classList.add('offdunger');
    comentareppgDiv.classList.add('offdunger');
    listepspgepDiv.classList.add('offdunger');
  }

  // Atualiza o cronômetro a cada hora
  setInterval(function() {
    document.querySelector('.cronometroepn').innerText = calculateTimeDifference(newDate);
    if (isDatePastOrEqual(newDate)) {
      nextepdateDiv.classList.add('offdunger');
      comentareppgDiv.classList.add('offdunger');
      listepspgepDiv.classList.add('offdunger');
    }
  }, 3600000); // 3600000 ms = 1 hora
});
