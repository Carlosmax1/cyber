import pika
import json
from transformers import pipeline

# Configuração do modelo SecureBERT
pipe = pipeline("token-classification", model="CyberPeace-Institute/SecureBERT-NER")

# Configuração do RabbitMQ
RABBITMQ_HOST = 'rabbitmq'  # Altere para o endereço do RabbitMQ, se necessário
INPUT_QUEUE_NAME = 'input_queue'
RESULT_QUEUE_NAME = 'output_queue'

# Conexão com o RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
channel = connection.channel()

# Garantir que as filas existam
channel.queue_declare(queue=INPUT_QUEUE_NAME, durable=True)
channel.queue_declare(queue=RESULT_QUEUE_NAME, durable=True)

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
    elif hasattr(obj, '__str__'):  # Verifica se o objeto pode ser convertido para string
        return str(obj)
    return obj  # Retorna o objeto sem mudanças se não puder ser processado

def process_message(ch, method, properties, body):
    """Callback para processar mensagens recebidas da fila."""
    text = body.decode('utf-8')  # Decodificar o texto recebido
    print(f"Mensagem recebida: {text}")

    # Processar o texto com o modelo
    result = pipe(text)
    print(f"Resultado do processamento: {result}")
    
    # Criar um JSON com o texto original e o resultado
    result_serializable = convert_to_serializable(result)
    result_json = json.dumps({
        "text": text,
        "result": result_serializable
    })
    
    # Publicar o resultado em outra fila
    channel.basic_publish(
        exchange='',
        routing_key=RESULT_QUEUE_NAME,
        body=result_json,
        properties=pika.BasicProperties(delivery_mode=2)  # Tornar a mensagem persistente
    )
    print(f"Resultado publicado na fila '{RESULT_QUEUE_NAME}'")

    # Confirmação de que a mensagem foi processada
    ch.basic_ack(delivery_tag=method.delivery_tag)

print(f"Aguardando mensagens na fila '{INPUT_QUEUE_NAME}'...")

# Consumidor para a fila
channel.basic_consume(queue=INPUT_QUEUE_NAME, on_message_callback=process_message)

try:
    # Iniciar o consumo de mensagens
    channel.start_consuming()
except KeyboardInterrupt:
    print("Encerrando consumidor...")
    channel.stop_consuming()

# Fechar a conexão ao RabbitMQ
connection.close()
