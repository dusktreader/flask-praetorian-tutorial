FROM python:3.7-stretch

ARG port
ARG service

RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python
RUN ln -s /root/.poetry/bin/poetry /bin/poetry
RUN poetry config settings.virtualenvs.create false

RUN mkdir /logs

RUN mkdir /app
WORKDIR /app
COPY poetry.lock /app/poetry.lock
COPY pyproject.toml /app/pyproject.toml
RUN poetry install

RUN mkdir /sqlite_temp

CMD ["flask", "run"]
