FROM python:3.8-slim

COPY . /app
COPY requirements.txt /tmp/requirements.txt
ENV FLASK_APP=main.py
RUN sudo apt install default-jdk -y
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r /tmp/requirements.txt

WORKDIR /app

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]