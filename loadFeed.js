// load atom feed to body

function makeBlogPost() {
  var postElem = document.createElement("div")
  var CSSattr = document.createAttribute("class")
  CSSattr.value = "clean-blog-post"
  postElem.setAttributeNode(CSSattr)
  return postElem;
}
function fetchPosts() {
  var request = new XMLHttpRequest();
  const ATOM_FEED_URL = "https://maths-club.github.io/feed.xml";
  const ERROR_MSG = "Uh Oh: Cannot load posts at the moment :("
  request.open("GET", ATOM_FEED_URL, true);

  request.send();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText)
      loadPosts(this.responseXML);
    } else if (this.readyState == 4) {
      var txtbox = makeBlogPost();
      txtbox.innerHTML = ERROR_MSG;
      document.querySelector("body > main > section > div > div.block-content").appendChild(postElem)
    }
  };
}


function loadPosts(feedXml) {
//console.log(feedXml.getElementsByTagName("feed")[0])
 var listPosts = feedXml.getElementsByTagName("feed")[0].getElementsByTagName("entry");
// console.log(listPosts.length)
 //posts are ordered from most recent to least
 for (var i=0; i<listPosts.length; i++) {
   post = listPosts.item(i); //get ith post
   var link = post.getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
   //mother of god why
   var excerpt = post.getElementsByTagName("summary")[0].textContent;
   var title = post.getElementsByTagName("title")[0].textContent;
   var published = post.getElementsByTagName("published")[0].textContent;
   published = published.substring(0, 10).replaceAll("-","/") //clean to YYYY-MM-DD
   //console.log(excerpt, title, published, link)
   var postElem = makeBlogPost();
   postElem.innerHTML = "<h3>" + title + '</h3><div class=\"info\"><span class=\"text-muted\">' + published + "</span></div><p>"+excerpt +'</p><a class="btn btn-outline-primary btn-sm" role="button" href="'+link+'" style="border-color: #d72631;color: #d72631;">Read More</a>'
   document.querySelector("body > main > section > div > div.block-content").appendChild(postElem)
 }
}
fetchPosts()
