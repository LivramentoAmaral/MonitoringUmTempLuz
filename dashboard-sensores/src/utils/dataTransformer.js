const transformaDados = (dadosBrutos) =>
  dadosBrutos
    .map(item => ({
      ...item,
      data: new Date(item.data).toISOString(),
      temperatura: Number(item.temperatura.toFixed(2)),
      umidade: Number(item.umidade.toFixed(2)),
      luminosidade: Number(item.luminosidade.toFixed(2)),
    }))
    .sort((a, b) => new Date(a.data) - new Date(b.data)); // ← ordena pela data crescente
// ordena do mais antigo para o mais recente


export { transformaDados };


