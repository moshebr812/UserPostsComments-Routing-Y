// NOTE THE module.exports to the new routerSrv
// Services 
const { response } = require('express');
const expressSrv = require('express');
const routerSrv = expressSrv.Router();  // as we did myApp = expressSrv();
const fileSrv = require('fs');


usersList =[];
postsList =[];

// Yogev:   uncomment line 12 . comment lines 14, 15
//reloadMockData();

usersList = require('../db-mock/users.json');
postsList = require('../db-mock/posts.json');

// Users API
// routerSrv.get('/users' , (request, response) =>{
routerSrv.get('/' , (request, response) =>{
    console.log(`\n routerSrv=Users  path="/"   |usersCount= ${usersList.length}`);
    response.send( usersList );   // I loaded all arrays via reloadMockData();
});

// routerSrv.get('/reload' , (req, res) => {
//   console.log('/users/reload ....');
//   usersReloadMockData();
//   res.send( usersList );
// });

// routerSrv.get('/users/:id/posts' ,(request, response) => {
routerSrv.get('/:id/posts' ,(request, response) => {
    let userId = parseInt(request.params.id);
    let filteredPosts = postsList.filter (object => object.userId === userId);
    console.log(`\n routerSrv=Users   path="/:id/posts"  |userId: ${userId} |filteredPosts.length: ${filteredPosts.length}`);
    response.send(filteredPosts);
})


// Standard Insert. method: POST.  body:  in JSON Format
routerSrv.post('/', (request, response) => {
    // Debug
    console.log (`/users/posts.   request.method: ${request.method}`);
    if (request.body.id) {  // valid request input
        console.log('---- VALID body\n' + JSON.stringify ( request.body ) );
        usersList.push( request.body );
    } else {  // use mock data
        console.log (` invalid data on body. Inserting mockdata \n${mockNewUser}`);
        usersList.push( mockNewUser );
    }

    fileSrv.writeFileSync('./db-mock/users.json', JSON.stringify(usersList));
    console.log(`POST .... usersList.length after post:  ${usersList.length}`)
    // New Array
    response.send(usersList); // Send the new Array, including tne new Insert
});

// read=get,  delete=delete,  insert=post for/users/:id ==>> Can use a common route
routerSrv.route('/:id')
    // routerSrv.get('/users/:id' , (request, response) =>{     // the "user"  is defined in index.js
    // routerSrv.get('/:id' , (request, response) =>{           // this section is now common get/delete/put which will be using /:id
    .get( (request, response) => {
            let userId = request.params.id;     // user id from URL
            let userIndex = usersList.findIndex (object => object.id == userId);  // location of user in Array
            let userName = '';
            if (userIndex>=0) {
                userName = usersList[userIndex].name; // user name, assuming here we found the userId in the Array
            } else {
                userName = `user by id ${userId} NOT FOUND`;
            }    
        
            console.log(`\n routerSrv=Users  path="/:id"  |indexLocation: ${userIndex}   |userId: ${userId}  |userName: ${userName}`);
            response.send( usersList[userIndex] );
    })  // without ;
    // routerSrv.get('/:id', (request, response) =>{
    .delete( (request, response) =>{
            let userId = parseInt(request.params.id);
            console.log(`\n routerSrv=Users   delete path="/:id"  |userId: ${userId} |countBefore: ${usersList.length}`);
            let idxToDel = usersList.findIndex (object => object.id == userId);  // location of user in Array
            if (idxToDel >= 0) {
                usersList.splice (idxToDel, 1);
                console.log(`\n routerSrv=Users   DELETE  |countAfter Delete: ${usersList.length}`);
                fileSrv.writeFileSync('./db-mock/users.json', JSON.stringify (usersList) );
            }  else {
                console.log(`\n routerSrv=Users   userId to delete NOT FOUND. No Changes  |countAfter: ${usersList.length}`);
            }
            response.send(usersList);   // the list after the delete
    });


//====================================================
function  usersReloadMockData  ()  {
    console.log ('users.js --> usersReloadMockData()')
    // reload users array
    let tmpArray = require('../db-mock/users-org.json');
    fileSrv.writeFileSync ('../db-mock/users.json', JSON.stringify(tmpArray));
    usersList = tmpArray;
    // reload posts array
    tmpArray = require('../db-mock/posts-org.json');
    fileSrv.writeFileSync ('../db-mock/posts.json', JSON.stringify(tmpArray));
    postsList = tmpArray;
    console.log (`reloadMockData:  |users: ${usersList.length}  |posts: ${postsList.length}`);
}

const mockNewUser  =
{
    "id": 808080,
    "name": "Moshe Test Braude",
    "username": "DoItNow",
    "email": "aaa@mmm.com",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }

//====================================================
module.exports = routerSrv;
