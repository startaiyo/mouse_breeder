FROM python:3.10.2-slim-buster
WORKDIR /app
COPY ./app /app
COPY requirements.txt /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python","server.py"]