from flask import Flask, request

from led import LEDController

app = Flask(__name__)
led_controller = LEDController()

@app.route('/on', methods=['POST'])
def on():
    led_controller.on()
    return {'message': 'ok, light on'}

@app.route('/off', methods=['POST'])
def off():
    led_controller.off()
    return {'message': 'ok, turing off'}

@app.route('/pause', methods=['POST'])
def pause():
    led_controller.pause()
    return {'message': 'ok, paused'}

@app.route('/run', methods=['POST'])
def run():
    led_controller.run()
    return {'message': 'go, go, go'}

@app.route('/set_color', methods=['POST'])
def set_color():
    color = request.get_json().get('color')
    assert color[0] == '#' and len(color) == 7
    led_controller.set_color((int(color[1:3], 16), int(color[3:5], 16), int(color[5:], 16)))
    return {'message': 'ok, color set'}

@app.route('/set_preset', methods=['POST'])
def set_preset():
    preset_id = int(request.get_json().get('id'), 16)
    # reverse as #FF is slow which is counter-intuitive in the FE
    speed = 255 - int(request.get_json().get('speed', 255))
    # 0x25-0x38 are built-in presets, >= 0x42 are custom presets
    result = True
    if preset_id < 0x42:
        result = led_controller.set_preset(preset_id, speed)
    else:
        result = led_controller.set_custom_preset(preset_id, speed)
    if result:
        return {'message': 'ok, preset set'}
    else:
        return {'message': 'could not find preset'}
