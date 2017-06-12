$(document).ready(function(){
  $('.deletePost').on('click', deletePost);
});

function deletePost(){
  var confirmation = confirm('Are you sure?')

  if(confirmation){
    $.ajax({
      type: 'DELETE',
      url: '/posts/delete/' + $(this).data('id')
    }).done(function(response){
      window.location.replace('/posts')
    })
    window.location.replace('/posts')

  } else {
    return false;
  }
}