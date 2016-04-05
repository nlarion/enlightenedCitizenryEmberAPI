import Ember from 'ember';


export default Ember.Route.extend({
  model: function(params) {
    var url = 'http://congress.api.sunlightfoundation.com/legislators/locate?apikey=ead3432ff97d4c36b01cc6ce3c787482&zip=' + params.zip;
    var cast = Ember.RSVP.Promise.cast.bind(Ember.RSVP.Promise);
    return  cast(Ember.$.getJSON(url))
    .then(function(response) {
        console.log(response);
        var youtubeUrl = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername="+response.results[0].youtube_id+"&key=AIzaSyBfS3lQCRNCju3YjNtXyDvsz3E2l3eMYxA";
        var cast = Ember.RSVP.Promise.cast.bind(Ember.RSVP.Promise);
        return  cast(Ember.$.getJSON(youtubeUrl))
    })
    .then(function(response) {
        console.log(response);
        var playlistUrl = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+response.items[0].contentDetails.relatedPlaylists.uploads+"&key=AIzaSyBfS3lQCRNCju3YjNtXyDvsz3E2l3eMYxA";
        var cast = Ember.RSVP.Promise.cast.bind(Ember.RSVP.Promise);
        return  cast(Ember.$.getJSON(playlistUrl))
    });
  }
});
