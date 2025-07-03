# Monitoramento

Este diretório contém o código-fonte responsável pelo monitoramento dos sensores e comunicação, organizado dentro da pasta `lib/`. O código é destinado a rodar na Raspberry Pi Pico W com firmware PyPico (MicroPython).

---

## 📂 Estrutura do Diretório `monitoramento/lib`

- **aht10.py**  
  Driver e funções para leitura do sensor de temperatura e umidade AHT10.

- **api_sender.py**  
  Módulo responsável por enviar os dados coletados para uma API REST via HTTP.

- **conect.py**  
  Gerenciador da conexão Wi-Fi, incluindo conexão, reconexão e controle do estado da rede.

- **main.py**  
  Script principal que orquestra a leitura dos sensores, conexão Wi-Fi e envio dos dados.

- **ssd1306.py**  
  Driver para o display OLED SSD1306, usado para exibir informações localmente na placa.

---

## ⚙️ Configuração

Antes de rodar, configure os parâmetros de rede e API dentro dos arquivos de configuração (normalmente em `conect.py` ou `main.py`), como:

- SSID e senha da rede Wi-Fi
- Endereço da API para envio dos dados
- Configurações do display OLED, se necessário

---

## 🚀 Como Rodar

1. Certifique-se que o firmware PyPico (MicroPython para Pico W) está instalado na placa.
2. Envie todos os arquivos da pasta `monitoramento/lib/` para a memória da Raspberry Pi Pico W usando Thonny, rshell ou ampy.
3. Execute o `main.py` para iniciar o monitoramento.

No Thonny, por exemplo:

- Abra `main.py`
- Clique em "Run" para iniciar o script

---

## 📡 Funcionalidades

- Inicializa a conexão Wi-Fi com suporte a reconexão automática.
- Lê periodicamente temperatura e umidade do sensor AHT10.
- Lê a luminosidade do sensor BH1750 (se integrado no código).
- Envia os dados coletados para uma API REST externa.
- Exibe informações no display OLED SSD1306 para feedback local.
- Logs básicos para acompanhamento e depuração.

---

## 🛠️ Dependências

- Firmware PyPico para Raspberry Pi Pico W
- Bibliotecas MicroPython para sensores e comunicação HTTP
- Drivers personalizados para AHT10 e SSD1306 conforme os arquivos `.py` presentes

---

## 💡 Dicas

- Mantenha a rede Wi-Fi estável para garantir o envio dos dados.
- Use o display OLED para verificar status e mensagens diretamente na placa.
- Utilize o console do Thonny para monitorar logs e mensagens do script.
- Atualize o firmware PyPico regularmente para melhorias e correções.

---

## Contato

Em caso de dúvidas, sugestões ou contribuições, abra uma issue no repositório ou contate o autor.

---

*Desenvolvido por Marcos do Livramento Amaral*  
GitHub: [LivramentoAmaral](https://github.com/LivramentoAmaral)
