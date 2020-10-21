// NOTE THE module.exports to the new routerSrv
// Services 
const expressSrv = require('express');
const routerSrv = expressSrv.Router();  // as we did myApp = expressSrv();
const fileSrv = require('fs');


usersList =[];
postsList =[];
// reloadMockData();
usersList = require('../db-mock/users.json');
postsList = require('../db-mock/posts.json');

// Users API
// routerSrv.get('/users' , (request, response) =>{
routerSrv.get('/' , (request, response) =>{
    console.log(`\n routerSrv=Users  path="/"   |usersCount= ${usersList.length}`);
    response.send( usersList );   // I loaded all arrays via reloadMockData();
});


// routerSrv.get('/users/:id' , (request, response) =>{
routerSrv.get('/:id' , (request, response) =>{
    let userId = request.params.id;     // user id from URL
    let userIndex = usersList.findIndex (object => object.id == userId);  // location of user in Array
    let userName = usersList[userIndex].name; // user name, assuming here we found the userId in the Array

    console.log(`\n routerSrv=Users  path="/:id"  |indexLocation: ${userIndex}   |userId: ${userId}  |userName: ${userName}`);
    response.send( usersList[userIndex] );
});

// routerSrv.get('/users/:id/posts' ,(request, response) => {
routerSrv.get('/:id/posts' ,(request, response) => {
    let userId = parseInt(request.params.id);
    let filteredPosts = postsList.filter (object => object.userId === userId);
    console.log(`\n routerSrv=Users   path="/:id/posts"  |userId: ${userId} |filteredPosts.length: ${filteredPosts.length}`);
    response.send(filteredPosts);
})

// routerSrv.get('/:id', (request, response) =>{
routerSrv.delete('/:id', (request, response) =>{
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
function  reloadMockData  ()  {
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

//====================================================
module.exports = routerSrv;
