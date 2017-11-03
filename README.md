## School Information Management System

Student Entering management system designed in MVC architecture.

Check for ``package.json`` file for the packages used.

**Running the application**

1. Clone the project and run ``npm install`` in the root folder.
2. Create a database and change the ``config/db.js`` file accordingly.
3. Execute the following SQL query to create the `users` table in the database.

 ```sql
CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255),
password VARCHAR(255)),
PRIMARY KEY (id);
```
4. Run ``npm start`` to run the application.

**Documentations**

* [NodeJs](https://nodejs.org/docs/latest-v7.x/api/)
* [ExpressJs](https://expressjs.com/en/guide/routing.html)
* [AngularJs](https://docs.angularjs.org/guide/concepts)
* [PassportJs](http://www.passportjs.org/docs/overview)
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [NodeJs MySQL driver](https://www.npmjs.com/package/mysql)
* [Animate.css](https://github.com/daneden/animate.css/blob/master/README.md)
* [Xel Toolkit](https://xel-toolkit.org/)
* [Bootstrap](https://getbootstrap.com)
* [HandlebarsJs](http://handlebarsjs.com/)