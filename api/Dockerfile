FROM python:3.7-stretch

ARG port
ARG service

RUN pip install --upgrade pip -q
RUN pip install poetry -q
RUN poetry config virtualenvs.create false

RUN mkdir /logs

RUN mkdir /app
WORKDIR /app
COPY poetry.lock /app/poetry.lock
COPY pyproject.toml /app/pyproject.toml
RUN poetry install

RUN mkdir /sqlite_temp

CMD ["flask", "run"]
