// comments
// get comments by id

const expressSrv = require ('express')
const routerComments = expressSrv.Router();
//
const commentsList = require ('../db-mock/comments.json') || [];

// The actual rest API
routerComments.get('/' , (request, response) =>{
    console.log('\n routerComments  path="/"   comments.Count='+commentsList.length);
    response.send (commentsList);
});

routerComments.get('/:id' , (request, response) =>{
    let commentId = parseInt ( request.params.id );
    let idx = commentsList.findIndex (element => element.id === commentId);
    console.log(`\n routerComments  path="/:id"  |commentId: ${commentId} |email...: ${commentsList[idx].email}`);
    response.send (commentsList[idx]);
});

module.exports = routerComments;