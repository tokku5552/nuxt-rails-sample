FROM ruby:2.6.6
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    default-mysql-client \
    nodejs

RUN mkdir /api
WORKDIR /api
COPY Gemfile /api/
COPY Gemfile.lock /api/
RUN bundle install

EXPOSE 3000