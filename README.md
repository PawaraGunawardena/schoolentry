## School Information Management System

Student Entering management system designed in MVC architecture.

Check for ``package.json`` file for the packages used.

**Running the application**

1. Clone the project and run ``npm install`` in the root folder.
2. Create a database (in my case I have created the database *schooldbms* )  and change the ``config/db.js`` file accordingly.
**NOTE: I have added the database file in *database-sql* folder in the repository. So just create a database called *schooldbms* and insert the sql file which is in the repository.**
3. Run ``npm start`` to run the application.
4. Navigate to ``localhost:3000`` and click on **Administrator Login**.
5. Enter one of the users' credentials. These credentials must be there in the database. Thus we will use *username* as username, and *password* as password.
6. Submit and it will direct to the user profile page. (We have to create this. Now it is just some text.)
7. Click on *Add a user* and enter the credentials.
8. Once you submit the *Add a user* form, you will be prompted to log in again (For testing purposes. We can always change it). Try logging with the credentials of the new user you have entered.

**Javascript Promises**

Since the inception of ES6 (ECMAScript 6) Promises have taken a very prominent place in Javascript. The execution of Node is made in such a way that when it executes a line of code which takes time, it follows on to the next code line and after the operation has performed (For an example, a timeout operation) it returns to the line it had skipped previously.

MySQL data retrieval is one such time consuming line of code. However, we cannot let node skip the execution of that line as the output of the results are displayed at the next line. Therefore, we have to use a promise based functionality where it promises the execution of the next line only after the time consuming opration has been finished.

*For more info, visit,*

1. [Google Developers Website - Promises](https://developers.google.com/web/fundamentals/primers/promises)



**Connection Pooling**

 Establishing connections everytime a query is executed is an expensive operation.

* Application Server enables administrators to establish a pool of backend connections
that applications can share on an application server

* It essentially creates a pool of database connections so that the user can get use of. This
speeds up the operation while giving a higher aspect of security. Response time is minimized. It is
said that the performance raises up to 20 times than that of normal db connection procedures.

* This was initially a technique used in JDBC.

* Since NodeJs is the major player in the web-industry these days, it was introduced inside the mysql driver
in Node Packages.

**Some important coments**

``
//Testing of of models.
//usermodel.insert('pavan', 'pavan', 'school_clerk','abc@email.com','T', connectionPool);
// usermodel.insert(2, 'dilan','dilan','moe_officer','email','T',connectionPool);
// //Test Promise Executions
// usermodel.getUserType('dotty',connectionPool).then(function (rows) {
//     console.log(rows[0].user_type);
// }).catch(function (err) {
//     console.log(err);
// });
``

*For more info, visit,*

1. [IBM official website - Connection Pooling](https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/cdat_conpool.html)
2. [Geek Explains blogpost on Connection Pooling](http://geekexplains.blogspot.com/2008/06/what-is-connection-pooling-why-do-we.html)



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