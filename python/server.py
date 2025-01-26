from flask import Flask, make_response, jsonify, request
from transformers import pipeline
import json

app = Flask(__name__)

pipe = pipeline("token-classification", model="CyberPeace-Institute/SecureBERT-NER")

def convert_to_serializable(obj):
    """Converte objetos não serializáveis para tipos compatíveis com JSON."""
    if isinstance(obj, float):
        return float(obj)
    elif isinstance(obj, int):
        return int(obj)
    elif isinstance(obj, list):
        return [convert_to_serializable(i) for i in obj]
    elif isinstance(obj, dict):
        return {key: convert_to_serializable(value) for key, value in obj.items()}
    elif hasattr(obj, '__str__'):
        return str(obj)
    return obj

@app.route('/', methods=['GET'])
def get_all():
    try:
        with open('result.json', 'r') as f:
            result = json.load(f)
        result_serializable = convert_to_serializable(result)
        return make_response(jsonify(result_serializable), 200)
    except FileNotFoundError:
        return make_response(jsonify({"error": "result.json not found."}), 404)

@app.route('/', methods=['POST'])
def process_message():
    if not request.json or 'text' not in request.json:
        return make_response(jsonify({"error": "Invalid input. 'text' is required."}), 400)

    text = request.json['text']
    result = pipe(text)
    result_serializable = convert_to_serializable(result)

    with open('result.json', 'w') as f:
        f.write(json.dumps(
          {
            "text": text,
            "result": result_serializable
          }
        ))

    return make_response(jsonify({"text": text, "result": result_serializable}), 201)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)