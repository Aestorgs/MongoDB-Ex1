# MongoDB-Ex1


Contexte: but du projet : Le but de cette exercice est de exercer sur du MongoDB en NoSQL  

Fonctionnalités attendues : suivre exercice 

Durée : 1 jours ,

Taches réalisées : Aestorgs ,

Technos utilisées : MongoDB , Docker , Javascript 

Outils et ressources : MongoDB


```bash
$docker import the json 

docker exec -i mongo  mongoimport --db tp --collection manufacturer  --jsonArray < ./manufacturer.json

docker exec -i mongo  mongoimport --db tp --collection products  --jsonArray < ./products.json

```

```bash
$docker execute the container

docker exec -it mongo mongosh

```

```bash
$go to use tp

use tp
```

```bash
$to see your collections

show collections
```

```bash
$execute the command 

db.manufacturer.find()

db.products.find()
```



