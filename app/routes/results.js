import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var url = 'http://congress.api.sunlightfoundation.com/legislators/locate?apikey=ead3432ff97d4c36b01cc6ce3c787482&zip=' + params.zip;
    return Ember.$.getJSON(url).then(function(responseJSON) {
      for (var i = 0; i < responseJSON.results.length; i++) {
        var youtubeUrl = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername="+responseJSON.results[i].youtube_id+"&key=AIzaSyBfS3lQCRNCju3YjNtXyDvsz3E2l3eMYxA";
        Ember.$.getJSON(youtubeUrl).then(function(responceYoutube){
          console.log(responceYoutube.items[0].contentDetails.relatedPlaylists.uploads);
          var playlistUrl = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+responceYoutube.items[0].contentDetails.relatedPlaylists.uploads+"&key=AIzaSyBfS3lQCRNCju3YjNtXyDvsz3E2l3eMYxA";
          Ember.$.getJSON(playlistUrl).then(function(responsePlaylist){
            console.log(responsePlaylist);
          });
        });
      }
    });
  }
});
