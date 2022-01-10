# GROUP'COM by GROUPOMANIA

Partie Backend du Projet 7 - OC developpeur web

## Pré-requis "frontend du projet":

Vous aurez également besoin du frontend disponible ici : (https://github.com/JAWA33/JulienArmand_P7_10112021.git)

## Installation du serveur "backend", ce depot GIT :

Commencer par cloner ce dépot git, puis lancer npm install pour télécharger le node_modules.

Vous aurez besoin des packages suivants :

"bcrypt": "^5.0.1",
"cookie-parser": "^1.4.5",
"cors": "^2.8.5",
"dotenv": "^10.0.0",
"express": "^4.17.1",
"fs": "0.0.1-security",
"http": "0.0.1-security",
"jsonwebtoken": "^8.5.1",
"multer": "^1.4.3",
"mysql": "^2.18.1",
"path": "^0.12.7",
"nodemon": "^2.0.15"

### Eléments à créer pour faire fonctionner le backend :

Vous devrez également créer les éléments suivants :

1. un dossier "images" dans le dossier racine contenant deux dossiers : "posts" et "profils" pour le stockage des images.

2. La création de la base de données sous MySQL contenant les 6 tables suivantes :

- gc_comments avec les colonnes : id_comment, comment_text, comment_create, comment_id_post, comment_id_user

- gc_jobs avec les colonnes : id_job, job_name, job_id_service, job_position

- gc_likes avec les colonnes : id_like, like_id_post, like_id_user

- gc_posts avec les colonnes : id_post, post_create, post_text, post_url_image, post_id_user, post_video

- gc_services avec les colonnes : id_service, service_name

- gc_users avec les colonnes : id_user, user_firstname, user_lastname, user_email, user_password, user_phone, user_age, user_bio, user_skill, user_hobbie, user_url_image, user_create, user_id_job, user_status, user_lastconnect

NOTA : Vous pouvez utilisier le fichier DBGroupomania.sql pour générer automatiquement la base de données. Disponible ici : backend/database/structureDB/DBgroupomania.sql (A noter que cette base de données comporte 7 tables et non 6, la table "gc_instantcom" n'est pas utilisée dans le projet actuel mais sera utile dans les futures versions du projet)

3. un fichier .env avec les informations suivantes :

- Les informations de connexion à la base de données MySQL :
  GC_ADMIN_HOST
  GC_ADMIN_USER
  GC_ADMIN_PASS
  GC_ADMIN_DB

- Le code secret pour génération du token :
  GC_TOKEN_SECRET

- L'adresse local de fonctionnement du backend :
  GC_AUTHORIZED_URL=http://localhost:3000

### Lancement du serveur :

Pour lancer le serveur sur le port 3000 : Entrer npm start
