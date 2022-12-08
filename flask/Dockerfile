FROM ubuntu:latest

LABEL maintainer="DA HYUN OHE <peelsob4d@gmail.com>"

ENV LANG=C.UTF-8
ENV TZ=Asiz/Seoul
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends tzdata g++ git curl && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y python3-pip python3-dev && \
    cd /usr/local/bin && \
    ln -s /usr/bin/python3 python && \
    ln -s /usr/bin/pip3 pip && \
    pip3 install --upgrade pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    python3 -m pip install --upgrade pip

ENV FLASK_APP=main.py

COPY . /app
WORKDIR /app
COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install -r /tmp/requirements.txt

EXPOSE 8080

CMD ["python3", "main.py"]