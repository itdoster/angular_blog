import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { User } from '../shared/interfaces/index'
import { Post, Comment, Author } from '../shared/models/index'

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory(backend: MockBackend, options: BaseRequestOptions) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users'));
    var authors = [
      new Author(1, "https://api.adorable.io/avatars/25/testts.png", "Dima Dosta"),
      new Author(2, "https://api.adorable.io/avatars/25/testtsss.png", "Andrew Forken")
    ]
    if (!users) {
      users = [{ id: 1, username: 'test', password: 'test' }];
      localStorage.setItem('users', JSON.stringify(users))
    }

    let comments: Comment[] = JSON.parse(localStorage.getItem('comments'));
    if (!comments) {
      comments = [
        { id: Math.floor(Math.random() * 101), author: authors[0], message: "test commnet", postId: 1, date: "2015-03-25" },
        { id: Math.floor(Math.random() * 101), author: authors[1], message: "test commnet 2", postId: 1, date: "2015-03-25" }
      ];
      localStorage.setItem('comments', JSON.stringify(comments))
    }

    let posts: Post[] = JSON.parse(localStorage.getItem('posts'));
    if (!posts) {
      posts = [
        { id: 1, name: 'testPost1', text: 'this post is about', date: "10/30/2017", author: authors[1], commentsCount: comments.filter(coment => coment.postId == 1).length, tag: 'dog' },
        { id: 2, name: 'testPost2', text: 'this post is about', date: "10/30/2017", author: authors[0], commentsCount: comments.filter(coment => coment.postId == 2).length, tag: 'cat' },
        { id: 3, name: 'testPost3', text: 'this post is about', date: "10/30/2017", author: authors[0], commentsCount: comments.filter(coment => coment.postId == 3).length, tag: 'life' },
        { id: 4, name: 'testPost4', text: 'this post is about', date: "10/30/2017", author: authors[1], commentsCount: comments.filter(coment => coment.postId == 4).length, tag: 'dog' },
        { id: 5, name: 'testPost5', text: 'this post is about', date: "10/30/2017", author: authors[1], commentsCount: comments.filter(coment => coment.postId == 5).length, tag: 'usa' },
        { id: 6, name: 'testPost6', text: 'this post is about', date: "10/30/2017", author: authors[0], commentsCount: comments.filter(coment => coment.postId == 6).length, tag: 'russia' }
      ];
      localStorage.setItem('posts', JSON.stringify(posts))
    }


    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {

        // authenticate
        if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
          // get parameters from post request
          let params = JSON.parse(connection.request.getBody());

          // find if any user matches login credentials
          let filteredUsers = users.filter(user => {
            return user.username === params.username && user.password === params.password;
          });

          if (filteredUsers.length) {
            // if login details are valid return 200 OK with user details and fake jwt token
            let user = filteredUsers[0];
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200,
              body: {
                id: user.id,
                username: "Dima Dosta",
                token: 'fake-jwt-token',
                image: "https://api.adorable.io/avatars/25/testts.png"
              }
            })));
          } else {
            // else return 400 bad request
            connection.mockError(new Error('Username or password is incorrect'));
          }
        }

        // get posts
        if (connection.request.url.endsWith('/api/posts') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: posts })));
        }

        // get posts
        if (connection.request.url.endsWith('/api/stats_by_authors') && connection.request.method === RequestMethod.Get) {
          let result = {
            headers: authors.map(p => p.name),
            data: [350, 500],
            type: "doughnut"
          };
          console.log(result);
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: result })));
        }

        if (connection.request.url.match(/\/api\/posts\/tag\/\w+$/) && connection.request.method === RequestMethod.Get) {
          console.log("asdas");
          let urlParts = connection.request.url.split('/');
          let tag = urlParts[urlParts.length - 1];
          var res = posts.filter(post => post.tag === tag);
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: res })));
        }

        // get comments by post id
        if (connection.request.url.match(/\/api\/comments\/\d+$/) && connection.request.method === RequestMethod.Get) {
          let urlParts = connection.request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedComments = comments.filter(comment => { return comment.postId === id; });
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedComments })));
        }

        // get post by id
        if (connection.request.url.match(/\/api\/posts\/\d+$/) && connection.request.method === RequestMethod.Get) {
          let urlParts = connection.request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedPosts = posts.filter(post => { return post.id === id; });
          let post = matchedPosts.length ? matchedPosts[0] : null;
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: post })));
        }

        // delete post by id
        if (connection.request.url.match(/\/api\/posts\/\d+$/) && connection.request.method === RequestMethod.Delete) {
          let urlParts = connection.request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedPosts = posts.filter(post => { return post.id === id; });
          let post = matchedPosts.length ? matchedPosts[0] : null;
          var index = posts.indexOf(matchedPosts[0]);
          posts.splice(posts.indexOf(matchedPosts[0]), 1);
          localStorage.removeItem('posts');
          localStorage.setItem('posts', JSON.stringify(posts))
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: post })));
        }

        // delete comment by id
        if (connection.request.url.match(/\/api\/comments\/\d+$/) && connection.request.method === RequestMethod.Delete) {
          let urlParts = connection.request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedComments = comments.filter(comment => { return comment.id === id; });
          let comment = matchedComments.length ? matchedComments[0] : null;
          var index = comments.indexOf(matchedComments[0]);
          comments.splice(comments.indexOf(matchedComments[0]), 1);
          localStorage.removeItem('comments');
          var post = posts.filter(post => post.id == comment.postId)[0];
          post.commentsCount--;
          localStorage.setItem('posts', JSON.stringify(posts))
          localStorage.setItem('comments', JSON.stringify(comments))
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: comment })));
        }

        // edit post by id
        if (connection.request.url.match('/api/posts') && connection.request.method === RequestMethod.Put) {
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            let post: Post = JSON.parse(connection.request.getBody());
            let editpost = posts.filter(post => { return post.id === post.id; });
            editpost[0].name = post.name;
            editpost[0].text = post.text;
            editpost[0].tag = post.tag;
            localStorage.removeItem('posts');
            localStorage.setItem('posts', JSON.stringify(posts))
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: editpost })));
          } else {
            console.log('not auth');
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
          }

        }

        if (connection.request.url.match('/api/posts') && connection.request.method === RequestMethod.Post) {
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            let post: Post = JSON.parse(connection.request.getBody());
            post.id = Math.floor(Math.random() * 1001);
            post.author = authors[0];
            post.commentsCount = 0;
            post.date = '10/30/2017';
            posts.unshift(post);
            localStorage.setItem('posts', JSON.stringify(posts))
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: post })));
          } else {
            console.log('not auth');
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
          }
        }

        if (connection.request.url.match('/api/comments') && connection.request.method === RequestMethod.Post) {
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            let comment: Comment = JSON.parse(connection.request.getBody());
            comment.id = Math.floor(Math.random() * 1001);
            comment.date = '10/24/207 16:00';
            comment.author = authors[0];
            var post = posts.filter(post => post.id == comment.postId)[0];
            post.commentsCount++;
            comments.push(comment);
            localStorage.setItem('posts', JSON.stringify(posts))
            localStorage.setItem('comments', JSON.stringify(comments))
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: comment })));
          } else {
            console.log('not auth');
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
          }
        }

        // get user by id
        if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = users.filter(user => { return user.id === id; });
            let user = matchedUsers.length ? matchedUsers[0] : null;

            // respond 200 OK with user
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
          } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
          }
        }

      }, 200);

    });

    return new Http(backend, options);
  },
  deps: [MockBackend, BaseRequestOptions]
};