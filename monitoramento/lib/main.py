from machine import I2C, Pin, SoftI2C, reset
import time
from aht10 import AHT10
from api_sender import ApiSender
from ssd1306 import SSD1306_I2C

def read_bh1750(i2c, address=0x23):
    try:
        i2c.writeto(address, b'\x10')
        time.sleep(0.2)
        data = i2c.readfrom(address, 2)
        raw = (data[0] << 8) | data[1]
        return raw / 1.2
    except Exception as e:
        print(" Erro ao ler BH1750:", e)
        return None

# BH1750 separado
i2c_luz = I2C(0, scl=Pin(1), sda=Pin(0), freq=400000)

# I2C compartilhado para AHT10 
i2c_temp = I2C(1, scl=Pin(3), sda=Pin(2), freq=400000)
aht10 = AHT10(i2c_temp)

# Inicialização do OLED
i2c_oled =SoftI2C(scl=Pin(15), sda=Pin(14))
oled = SSD1306_I2C(128, 64, i2c_oled)

api_sender = ApiSender(
    url="http://10.8.45.142:5000/api/sensores",
    ssid="Embarca",
    password="EmbarcaTech01"
)

while True:
    try:
        temp, hum = aht10.read()
        lux = read_bh1750(i2c_luz)

        if temp is not None and hum is not None and lux is not None:
            print(f"Temp: {temp:.2f} C")
            print(f"Umidade: {hum:.2f} %")
            print(f"Luminosidade: {lux:.2f} lux")

            oled.fill(0)
            oled.text(f"Temp: {temp:.2f}C", 0, 0)
            oled.text(f"Umid: {hum:.2f}%", 0, 12)
            oled.text(f"Luz: {lux:.2f}Lx", 0, 24)
            oled.show()

            status = api_sender.enviar_dados(temp, hum, lux)
            
            print("Status do envio: ",status)
            
        else:
            print(" Leitura inválida dos sensores.")
            api_sender.verificar_conexao()
    except Exception as e:
        print("Erro inesperado:", e)
        print(" Reiniciando sistema...")
        reset()
    time.sleep(10)
