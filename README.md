## School Information Management System

Student Entering management system designed in MVC architecture.

Check for ``package.json`` file for the packages used.

**Running the application**

1. Clone the project and run ``npm install`` in the root folder.
2. Create a database (in my case I have created the database *schooldbms* )  and change the ``config/db.js`` file accordingly.3. Execute the following SQL query to create the `users` table in the database.
3. Run ``npm start`` to run the application.
4. Navigate to ``localhost:3000`` and click on **Administrator Login**.
5. Enter one of the users' credentials. These credentials must be there in the database. Thus we will use *username* as username, and *password* as password.
6. Submit and it will direct to the user profile page. (We have to create this. Now it is just some text.)
7. Click on *Add a user* and enter the credentials.
8. Once you submit the *Add a user* form, you will be prompted to log in again (For testing purposes. We can always change it). Try logging with the credentials of the new user you have entered.

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