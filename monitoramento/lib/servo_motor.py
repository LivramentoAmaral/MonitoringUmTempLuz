from machine import Pin, PWM

class ServoMotor:
    def __init__(self, pin, freq=50, min_us=500, max_us=2500):
        self.pwm = PWM(Pin(pin))
        self.pwm.freq(freq)
        self.min_us = min_us
        self.max_us = max_us
        self.freq = freq
        self.period = 1000000 // freq  # em microssegundos

    def angle_to_duty(self, angle):
        us = self.min_us + (angle / 180.0) * (self.max_us - self.min_us)
        duty = int(us * 65535 / self.period)
        return duty

    def move_to(self, angle):
        duty = self.angle_to_duty(angle)
        self.pwm.duty_u16(duty)

    def deinit(self):
        self.pwm.deinit()
