$("[data-action=save]").click(function() {
  var htmlValue = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>site title</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta name=\"description\" content=\"Saved to gist\">\n    <link rel=\"stylesheet\" href=\"css/style.css\" />\n  </head>\n  <body>\n" + document.getElementById("htmlEditor").value + "\n\n    <scr" + "ipt src=\"js/script.js\"></scr" + "ipt>\n  </body>\n</html>"
  var htmlVal   = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>site title</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta name=\"description\" content=\"Saved to gist\">\n    <link rel=\"stylesheet\" href=\"css/style.css\" />\n  </head>\n  <body>\n" + htmlEditor.getValue() + "\n\n    <scr" + "ipt src=\"js/script.js\"></scr" + "ipt>\n  </body>\n</html>"
  var cssValue  = document.getElementById("cssEditor").value
  var cssVal    = cssEditor.getValue()
  var jsValue   = document.getElementById("jsEditor").value
  var jsVal     = jsEditor.getValue()

  var data = {
    // Description of the gist
    "description": "My exported snippet",
    // public or private?
    "public": true,
    // This gist has a html file, named index.html
    "files": {
      "index.html": {
        "content": htmlVal
      },
      "style.css": {
        "content": cssVal
      },
      "script.js": {
        "content": jsVal
      }
    }
  }
  // Post on Github via JQuery Ajax
  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(data)
  })
  .success(function(e) {
    $("[data-action=saved]").text(e.html_url)
    $("[data-action=saved]").attr("href", e.html_url)
                            .attr("target", "_blank")
  })
  .error(function(e) {
    console.warn("gist save error", e)
    $("[data-action=saved]").text("gist save error", e)
  })
})
