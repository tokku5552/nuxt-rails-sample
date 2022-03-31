FROM ruby:2.6.6
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    default-mysql-client \
    nodejs \
    sudo

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    sudo ./aws/install

RUN curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o "session-manager-plugin.deb" && \
    sudo dpkg -i session-manager-plugin.deb

RUN mkdir /api
WORKDIR /api
COPY Gemfile /api/
COPY Gemfile.lock /api/
RUN bundle install

EXPOSE 3000