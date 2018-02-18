FROM mysql:latest
MAINTAINER  Chance chance.eakin@gmail.com

# Copy the database schema to the /data directory
COPY schema.sql /docker-entrypoint-initdb.d

RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf

EXPOSE 3306
CMD ["mysqld"]
