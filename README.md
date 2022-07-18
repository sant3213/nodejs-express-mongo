"# nodejs-express" 
### **Node.js**
**1.** npm init.

**2.** npm install express.

**3.** For debugging :

  ```js script 
 npm i chalk@4.1.2
  ```

 &nbsp; &nbsp; Allow us to set some colors on our messages so that we can group them together.

**4.** 
```js script
const debug = require('debug')('app'); ==> execute this line in cmd if failed in visual studio
```
```js script
npm install debug
```
 ```js script
 set DEBUG=app
 ```
**5.** Install morgan middleware. This is a HTTP request logger middleware for node.js. It can be changed to combined if you want to get more information.
 ```js script
npm i morgan
 ```
  ```js script
 app.use(morgan('tiny'));
  ```

**5.** NPM Scripts
&nbsp;&nbsp;&nbsp; Modify the package.json "scripts" and add
 ```js script

    "start":"set DEBUG=app & node app.js",
    "debug":"set DEBUG=* & node app.js",
 ```
 &nbsp;&nbsp;&nbsp; To run other script different from start you have to do it with run:
 ```js script
npm run debug
 ```
 &nbsp;&nbsp;&nbsp; or 
  ```js script
npm run test
 ```
 &nbsp;&nbsp;&nbsp; For running start: 
```js script
npm start
 ```

 **6.** Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

```js script
npm install nodemon
 ```
 The use to configure it is adding:
 ```js script
"nodemonConfig": {
    "restartable":"rs",
    "delay": 2500
}
 ```
 &nbsp;&nbsp;&nbsp; **rs**: When typing rs in the console it will restart.
 &nbsp;&nbsp;&nbsp; **delay**: In some situations, you may want to wait until a number of files have changed.

 Finally change the script to be executed with nodemon:
  ```js script

    "start":"set DEBUG=app & nodemon app.js",
    "debug":"set DEBUG=* & nodemon app.js",
 ```

  **6.** Environmental Variables 
  &nbsp;&nbsp;&nbsp; Add the following script to the nodemonConfig in the package.json: 
```js script
  "env": {
      "PORT": 4000
    }
```

**7.** **Templating Engines**
It´s going to allow us to render an HTML page, but at the same time, embedding data into that page to make it **dynamic**

```js script
  npm i ejs
```
add the following code to app.js:
```js script
  app.set('views', './src/views');/* allow us to set variables inside the context of our app*/
    app.set('view engine', 'ejs');
```
Change 
```js script
app.get('/',(req, res)=>{
    res.send('Hello from my app')
});

By

app.get('/',(req, res)=>{
    res.render('index', {title: 'Surymantics'})
})

```
And delete the file index.html from the public folder.

to get the data in the HTML use the notation 
```js script
<%=title%>
```

To get an array of data
```js script
 1. <% data.map((i) => {}) %>
 
 2. <% data.map((i) => {
       <li></li>
	   }) 
    %>
 
 3. <% data.map((i) => {
      %> <li></li><%
	   }) 
    %>
 ```

 **8.** **Routing**

 To handles all the routing neccesary for everything that falls under sessions you have to build a sessionRouter with:
```js script
 const sessionRouter = express().Router();
  ```
To use it
```js script
sessionsRouter.route('/').get((req, res)=> {
  res.send()
  // or res.render() to render the page
})
  ```
To pass in parameter values in the URL use /:<*parameterName*>
```js script
sessionsRouter.route('/:id').get((req, res)=> {
  console.log(id)
})
 ```