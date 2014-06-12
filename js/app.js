var bestPictures = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=vjejqk3x245pnergu7bt6dzs&q=bond&page_limit=10&callback=?'
});
 
bestPictures.initialize();
 
$('#remote .typeahead').typeahead(null, {
  name: 'best-pictures',
  displayKey: 'movies.title',
  source: bestPictures.ttAdapter()
});
alert('hello');