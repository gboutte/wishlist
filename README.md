# Wishlist

## Installation
- Executer ces commandes
```sh
npm install
```

Definir les variables d'environnement

| Nom          |                  Description                  |
|--------------|:---------------------------------------------:|
| DATABASE_URL |    L'url de connexion a la base de données    |
| TOKEN_SECRET | La clé utilisé pour la création des token JWT |


Lancer les migrations

```sh
npm run deploy
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