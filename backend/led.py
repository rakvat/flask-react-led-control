import json
import socket

from constants import ON, OFF, PAUSE, RUN, SET_COLOR, SET_PRESET, SET_CUSTOM_PRESET, CUSTOM_PATTERNS


class LEDController:
    def __init__(self):
        config = json.loads(open('config.json', 'r').read())
        self.ip = config['host']['ip']
        self.port = config['host']['port']

    def _connect_and_send(self, command: list[int]) -> None:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((self.ip, self.port))
        s.sendall(bytes(command))
        s.close()

    def on(self) -> None:
        self._connect_and_send(ON)

    def off(self) -> None:
        self._connect_and_send(OFF)

    def pause(self) -> None:
        self._connect_and_send(PAUSE)

    def run(self) -> None:
        self._connect_and_send(RUN)

    def set_color(self, color: tuple[int, int, int]) -> None:
        self._connect_and_send(SET_COLOR.start + list(color) + SET_COLOR.end)

    def set_preset(self, preset_id: int, speed: int) -> bool:
        self._connect_and_send(SET_PRESET.start + [preset_id, speed] + SET_PRESET.end)
        return True

    def set_custom_preset(self, preset_id: int, speed: int) -> bool:
        custom_preset = CUSTOM_PATTERNS.get(preset_id)
        if not custom_preset:
            return False
        self._connect_and_send(SET_CUSTOM_PRESET.start + custom_preset + [speed] + SET_CUSTOM_PRESET.end)
        return True
