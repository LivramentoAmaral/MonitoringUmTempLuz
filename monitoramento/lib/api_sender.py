import urequests
import ujson
from conect import WiFiManager  # Usa sua classe existente

class ApiSender:
    def __init__(self, url, ssid=None, password=None):
        self.url = url
        if ssid and password:
            self.wifi_manager = WiFiManager(ssid, password)
            self.wifi_manager.connect()  # Conecta na inicialização
        else:
            self.wifi_manager = None

    def verificar_conexao(self):
        if self.wifi_manager:
            if not self.wifi_manager.is_connected():
                print("Conexão Wi-Fi perdida. Tentando reconectar...")
                return self.wifi_manager.connect()
        return True

    def enviar_dados(self, temperatura, umidade, luminosidade):

        dados = {
            "temperatura": temperatura,
            "umidade": umidade,
            "luminosidade": luminosidade
        }

        headers = {
            "Content-Type": "application/json"
        }

        try:
            json_data = ujson.dumps(dados)
            print("Enviando para API:", self.url)
            print("Payload:", json_data)

            response = urequests.post(self.url, data=json_data, headers=headers)
            print("Status da resposta:", response.status_code)

            if response.status_code in [200, 201]:
                print(" Dados enviados com sucesso!")
                print(" Resposta da API:", response.text)
                response.close()
                return response.status_code
            else:
                print(f" Erro da API: {response.status_code} - {response.text}")
                response.close()
                return False

        except OSError as e:
            print(" Erro de conexão ao enviar para API:", e)
            if self.verificar_conexao():
                print("Tentando reconectar e reenviar...")
                return self.enviar_dados(temperatura, umidade, luminosidade)
            else:
                print(" Falha ao reconectar. Dados não enviados.")
            return False

        except Exception as e:
            print(" Erro inesperado ao enviar dados:", e)
            return False
