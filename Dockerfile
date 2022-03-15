FROM python:3.6
WORKDIR /app
COPY ./app /app
COPY requirements.txt /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python","server.py"]