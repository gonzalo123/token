## Install dependencies
```
cd api
composer install api/
cd ..
```

```
cd client
bower install
cd ..
```

## Run backend server
```
php -S 0.0.0.0:8080 -t api/www
```

## Run frontend server

```
php -S 0.0.0.0:8888 -t client
```