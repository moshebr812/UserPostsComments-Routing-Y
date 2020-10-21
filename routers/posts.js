// posts 
// get post by id
// get comments by post id


const expressSrv = require ('express')
const routerPosts = expressSrv.Router();
//
const postsList = require('../db-mock/posts.json');
const commentsList = require ('../db-mock/comments.json');
const routerSrv = require('./users');

// The actual rest API
routerPosts.get('/' , (request, response) =>{
    console.log('\n routerPosts  path="/"   posts.Count='+postsList.length);
    response.send (postsList);
});

routerPosts.get('/:id' , (request, response) =>{
    let postId = parseInt ( request.params.id );
    let idx = postsList.findIndex (element => element.id === postId);
    console.log(`\n routerPosts  path="/:id"  |postId: ${postId} |title...: ${postsList[idx].title}`);
    response.send (postsList[idx]);
});

routerPosts.get('/:id/comments' , (request, response) => {
    let postId = parseInt ( request.params.id );
    let filteredArray = commentsList.filter (element => element.postId === postId);
    console.log(`\n routerPosts  path="/:id/comments"  |postId: ${postId} |commentsCount: ${filteredArray.length}`);
    response.send (filteredArray);
});


module.exports = routerPosts;