from machine import I2C
import time

class AHT10:
    def __init__(self, i2c, address=0x38):
        self.i2c = i2c
        self.addr = address
        self._init_sensor()

    def _init_sensor(self):
        try:
            self.i2c.writeto(self.addr, b'\xBE')  # reset
            time.sleep(0.02)
            self.i2c.writeto(self.addr, b'\xE1\x08\x00')  # calibração
            time.sleep(0.01)
        except:
            print("Erro ao inicializar o AHT10")

    def read(self):
        try:
            self.i2c.writeto(self.addr, b'\xAC\x33\x00')
            time.sleep(0.08)
            data = self.i2c.readfrom(self.addr, 6)
            status = data[0]
            if (status & 0x80) == 0:
                hum = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) * 100 / 1048576
                temp = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) * 200 / 1048576 - 50
                return temp, hum
        except Exception as e:
            print("Erro ao ler AHT10:", e)
        return None, None
