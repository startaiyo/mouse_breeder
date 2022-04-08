FROM python:3.6
WORKDIR /app
COPY ./app /app
COPY requirements.txt /app
RUN apt-get update && apt-get upgrade -y

RUN pip install --upgrade pip
RUN pip install --upgrade setuptools

# OpenCV
RUN apt-get install -y libgl1-mesa-glx libglib2.0-0 libsm6 libxrender1 libxext6
RUN pip install opencv-python
RUN pip install opencv-contrib-python

RUN pip install -r requirements.txt

CMD ["python","server.py"]