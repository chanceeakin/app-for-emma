
. ../.env

if [ -z "$GO_PS_USER" ]; then
    echo ERROR: "MYSQL_USER not set"
    exit 3
fi

if [ -z "$GO_PS_PASSWORD" ]; then
    echo ERROR: "MY_SQL password not set"
    exit 4
fi

mysql -u $GO_PS_USER -p$GO_PS_PASSWORD -e"Drop database if exists PositiveThoughts;"

mysql -u $GO_PS_USER -p$GO_PS_PASSWORD -e"source schema.sql;"
