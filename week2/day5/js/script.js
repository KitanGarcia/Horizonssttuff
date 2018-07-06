$(".loginPage").hide();
$(".posts").hide();

//Get data into API on register
$('#register').on('click', function(event){
  event.preventDefault();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
  method: 'POST',
  success: function(data) {
    console.log(data);
    $(".registration").hide();
    $(".loginPage").show();
  },
  data: {
    fname: $('#firstname').val(),
    lname: $('#lastname').val(),
    email: $('#email').val(),
    password: $('#password').val(),
  },
  error: function(err){
    console.log(err)
  }
});
})


//Switch to Post page after clicking login at after 2nd login
$('#lLogin').on('click', function(event){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
  method: 'POST',
  success: function(data) {
    localStorage.setItem("token", data.response.token);
    $(".loginPage").hide();
    $(".posts").show();
  },
  data: {
    email: $('#lEmail').val(),
    password: $('#lPassword').val()
  },
  error: function(err){
    console.log(err)
  }
});
})


//Switch to Post page after logging in
$('#login').on('click', function(event){
  event.preventDefault();
  $(".registration").hide();
  $(".loginPage").show();
})

//Switch to Registration page from Login page
$('#lRegister').on('click', function(event){
  event.preventDefault();
  $(".loginPage").hide();
  $(".registration").show();
})


$.ajax("https://horizons-facebook.herokuapp.com/api/1.0/posts/:page?token=" + localStorage.getItem("token"),
{
  method: 'GET',
  success: function(data)
  {
    for (var i = 0; i < data.response.length; i++)
    {
      var posterName = data.response[i].poster.name;
      var postID = data.response[i]._id;
      var postContent = data.response[i].content;
      var postTime = data.response[i].createdAt;
      var numLikes = data.response[i].likes.length;
      var numReplies = data.response[i].comments.length;
      var allcomments = "";
      for (var k = 0; k < data.response[i].comments.length; k++)
      {
        var commentTime = data.response[i].comments[k].createdAt;
        var commentContent = data.response[i].comments[k].content;
        var commenterName = data.response[i].comments[k].poster.name;
        allcomments +=  `<div>
        <p>${commenterName}: ${commentTime}</p>
        </div>
        <div>
          <h5>${commentContent}</h5>
        </div>
      `;
      }
      $(".posts").append(
      `<div class = "post">
         <div class = "row comment">
           <h4 class = "postheadings">${posterName}</h4>
         </div>
       <div>
         <p>${postTime}</p>
       </div>
       <div>
         <h5>${postContent}</h5>
       </div>
     </div>
     <div class = "replies">
       <div class = "row">
         <h4 class = "postheadings">${numReplies}, ${numLikes}</h4>
         ${allcomments}
       </div>
       <button class="likebtn replybtn btn btn-default glyphicon glyphicon-thumbs-up" id = "likebtn"></button>
       <button class="replybtn btn btn-default" id = "replybtn">Reply</button>
     `);//should still be in replies???
    }

    $(".likebtn").on("click", function(event)
    {
      console.log("Yeah got here!");
      $(this).toggleClass("glyphicon-thumbs-up glyphicon-thumbs-down");
    });
  },
  error: function(err)
  {
    console.log(err);
  }
});


//Get data into API on register
$('#postbtn').on('click', function(event){
  event.preventDefault();
  var postText = $("#typePost").val();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts',
{
  method: 'POST',
  data:
  {
    token: localStorage.getItem("token"),
    content: postText
  },
  success: function(data) {
    console.log(data);
  },
  error: function(err){
    console.log(err);
  }
});
})

$(".logout").on("click", function(event)
{
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/logout", 
  {
    method: 'GET',
    data:
    {
      token: localStorage.getItem("token")
    },
    success: function(data)
    {
      $(".loginPage").hide();
      $(".posts").hide();
      $(".registration").show();
    },
    error: function(err)
    {
      console.log(err);
    }
  });
});

/*
//implement likes when thumbs up is click
$(".likebtn").on("click", function(event)
{
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/:" + $(this), //FIX THIS!!!
  {
    method: 'GET',
    data:
    {
      token: localStorage.getItem("token")
    },
    success: function(data)
    {
      $(this).toggleClass("glyphicon-thumbs-up glyphicon-thumbs-down");//or toggleClass(thumbsup).toggleClass(thumbsdown)
      console.log("got here yeah", data);
    },
    error: function(err)
    {
      console.log(err);
    }
  });
});*/
