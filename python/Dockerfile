# Use uma imagem base do Python
FROM python:3.12-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY . /app

# Atualize pip e instale as dependências a partir do arquivo requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Defina as variáveis de ambiente para o RabbitMQ
ENV RABBITMQ_HOST=rabbitmq
ENV INPUT_QUEUE_NAME=input_queue
ENV RESULT_QUEUE_NAME=output_queue

# Comando para rodar o script
CMD ["python", "main.py"]
