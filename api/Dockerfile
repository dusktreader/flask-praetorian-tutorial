FROM python:3.7-stretch

ARG port
ARG service

RUN pip install --upgrade pip -q
RUN pip install poetry -q
RUN poetry config virtualenvs.create false

RUN mkdir /logs

RUN mkdir /app
WORKDIR /app
#COPY poetry.lock /app/poetry.lock
COPY flask-praetorian-1.1.0a3.tar.gz /
COPY pyproject.toml /app/pyproject.toml
RUN poetry install

CMD ["flask", "run"]
