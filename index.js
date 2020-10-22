// Services
const { response } = require('express');
const expressSrv = require('express');
const myApp = expressSrv();
const fileSrv = require ('fs');

// Import routers.  Corresponds to modules.export = routerSrv
const usersRouter = require ('./routers/users');
const postsRouter = require ('./routers/posts');
const commentsRouter = require ('./routers/comments');
// Settings
const localPort = 8080;

console.clear();
console.log (`${"=".repeat(30)}\nUserPostsComments-Routing-Y\n${"=".repeat(30)}`);
//
// reloadMockData();

// middlewhere that coverts valid json structures to JS Objects
myApp.set("myInternalRevision", '1.0.0.103');
myApp.set("json spaces", 3);
myApp.use(expressSrv.json());

// Business REST API-S routers
// I must define the userRouter as a middleware, and it should handle only request with path prefix "/users"
myApp.use ("/users", usersRouter);
myApp.use ("/posts", postsRouter);
myApp.use ("/comments", commentsRouter);

// default path
myApp.get('/', (request, response) => {
    console.log('\n path="/"   loading html file.   myInternalRevision:   ' + myApp.get("myInternalRevision"));
    response.send('Hello Moshe - Test ....');
});

// Reload all mock data to the 3 files after we tested deletes etc
myApp.get('/reload-mockdata' , (req, res) => {
    console.log('\n path="/reload-mockdata"   read mcok data from jsonplaceholder SITE');
    reloadMockData();
    res.send('AFTER reloading 3 mock data files');
}); 

myApp.listen(localPort);


function  reloadMockData  ()  {
    // reload all 3 files from the orginal files.
    // 
    let tmpArray = require('./db-mock/users-org.json');
    fileSrv.writeFileSync ('./db-mock/users.json', JSON.stringify(tmpArray));
    console.log (`reloadMockData:  |users: ${tmpArray.length}`);
    //
    tmpArray = require('./db-mock/posts-org.json');
    fileSrv.writeFileSync ('./db-mock/posts.json', JSON.stringify(tmpArray));
    console.log (`reloadMockData:  |posts: ${tmpArray.length}`);
    // 
    tmpArray = require('./db-mock/comments-org.json');
    fileSrv.writeFileSync ('./db-mock/comments.json', JSON.stringify(tmpArray));
    console.log (`reloadMockData:  |comments: ${tmpArray.length}`);

    // ======
    console.log ('\n\n MUST RESTART NODE on FILE to Apply');
}
