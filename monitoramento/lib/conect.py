import network
import time

class WiFiManager:
    def __init__(self, ssid, password):
        self.ssid = ssid
        self.password = password
        self.wlan = network.WLAN(network.STA_IF)

    def connect(self, max_attempts=50):
        self.wlan.active(True)

        if self.wlan.isconnected():
            print("conectado ao Wi-Fi.")
            print(" IP:", self.get_ip())
            return True

        print(f"Conectando-se ao Wi-Fi: {self.ssid}")
        self.wlan.connect(self.ssid, self.password)

        for attempt in range(1, max_attempts + 1):
            if self.wlan.isconnected():
                print("Conectado com sucesso!")
                print(" IP:", self.get_ip())
                return True
            print(f"Tentando conexao... ({attempt}/{max_attempts})")
            time.sleep(1)

        print(" Falha ao conectar ao Wi-Fi.")
        return False

    def is_connected(self):
        return self.wlan.isconnected()

    def disconnect(self):
        if self.wlan.isconnected():
            self.wlan.disconnect()
            print("Wi-Fi desconectado.")

    def get_ip(self):
        if self.wlan.isconnected():
            return self.wlan.ifconfig()[0]
        return None
