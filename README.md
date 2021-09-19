# Wishlist
![Lint ci](https://github.com/gboutte/wishlist/actions/workflows/lint.yaml/badge.svg) ![Test ci](https://github.com/gboutte/wishlist/actions/workflows/test.yaml/badge.svg)

## Installation pour le développement
Installer les dépendances
```sh
npm install
```

Definir les variables d'environnement dans .env

| Nom          |                  Description                  |
|--------------|:---------------------------------------------:|
| DATABASE_URL |    L'url de connexion a la base de données    |
| TOKEN_SECRET | La clé utilisé pour la création des token JWT |

Dans front/.env

| Nom          |                  Description                  |
|--------------|:---------------------------------------------:|
| API_DOMAIN | L'url a utiliser pour les appels api (ex: http://localhost:3000) |
| TITLE_NAME | Le titre |


Lancer les migrations et le 1er build

```sh
npm run deploy
```

Lancement des serveurs de développement
```sh
npm run start:dev
```

## Commandes npm

| Commande          |                  Description                  |
|--------------|:---------------------------------------------:|
| npm run start:dev |   Lance l'api et le client en mode developpemnt   |
| npm run start:nodemon |   Lance l'api en mode developpemnt   |
| npm run start:client |   Lance le client en mode developpemnt   |
| npm run start |   Lance l'api et le client en mode production. Il faut que le build soit lancer avant.  |
| npm run test |   Lance les tests |
| npm run coverage:html |   Lance les tests et créer un rapport de code coverage au format html |
| npm run coverage |   Lance les tests et créer un rapport de code coverage au format texte |
| npm run deploy |   Exécute les actions nécessaires  avant lancer l'application (migrations + build). |
| npm run migrations |   Exécute les migrations. |
| npm run build |   Compile le client react. |

## Docker
Pour lancer le docker il faut créer un fichier .env.docker avec les variables suivante:
```
DB_USER=user
DB_PASSWORD=password
DB_DATABASE=wishlist
API_DOMAIN=http://localhost:3000
TOKEN_SECRET=secret
TITLE_NAME=rudy
```
Puis executer la commande suivante
```sh
docker-compose --env-file .env.docker up --build -d
```
```sh
docker-compose --env-file .env.docker up --build --no-deps --force-recreate -d

```

```sh
docker-compose --env-file .env.docker build --no-cache
```
