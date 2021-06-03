<script>
    // load atom feed to body
    function fetchPosts() {
      var request = new XMLHttpRequest();
      const ATOM_FEED_URL = "https://maths-club.github.io/feed.xml";
      const ERROR_MSG = "Uh Oh: Cannot load posts at the moment :("
      request.open("GET", ATOM_FEED_URL, true);
   
      request.send();
      request.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
           console.log(this.responseText)
           loadPosts(this.responseXML);
         } else if (this.readyState == 4) {
           document.getElementById("feed").innerHTML = ERROR_MSG;
         }
       };
    }
   
    function loadPosts(feedXml) {
      console.log(feedXml.getElementsByTagName("feed")[0])
       var listPosts = feedXml.getElementsByTagName("feed")[0].getElementsByTagName("entry");
       console.log(listPosts.length)
       //posts are ordered from most recent to least
       for (var i=0; i<listPosts.length; i++) {
         post = listPosts.item(i); //get ith post
         var link = post.getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
         //mother of god why
         var excerpt = post.getElementsByTagName("summary")[0].textContent;
         var title = post.getElementsByTagName("title")[0].textContent;
         var published = post.getElementsByTagName("published")[0].textContent;
         published = published.substring(0, 10).replaceAll("-","/") //clean to YYYY-MM-DD
         console.log(excerpt, title, published, link)
         var postElem = document.createElement("div")
         var CSSattr = document.createAttribute("class")
         CSSattr.value = "rosella-textbox"
         postElem.setAttributeNode(CSSattr)
         postElem.innerHTML = "<h3>" + title + "<h3><h4> Date: " + published + "</h4><p>"+excerpt + "</p><br><br><a href='"+link+"'>READ MORE </a>"
         document.querySelector("body").appendChild(postElem)
       }
    }
    fetchPosts()
</script>