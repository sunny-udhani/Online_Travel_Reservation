## Mongo Atlas

### mongodb on cloud. Database as a service. uses amazon ec2 for actual database deployment.helpful for collaboration.

*   Signup on mongodb.com
*   add users to cluster
*   whitelist IP's
*   connect to mongodb compass using clipboard
*   application connect

---> Imp info:
*   cluster main node IP: cluster0-shard-00-00-j61pv.mongodb.net:27017, 
*   mongodb user: kayak, mongodb pass: kayak, 
*   connection string: mongodb://kayak:kayak@cluster0-shard-00-00-j61pv.mongodb.net:27017,cluster0-shard-00-01-j61pv.mongodb.net:27017,cluster0-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin


## MySQL database on Google cloud platform

### mysql database deployed on google cloud. creates an instance and database.

*   Add IP's to authorization list
*   generate client certificates for team.
*   connection in workbench using ssl to view data
*   application connect

---> Imp info:
*   IP of sql server: 35.188.193.23, Instance connection name: kayak-186308:us-central1:kayak-teamproject, 
*   db user: root, db pass: kayak