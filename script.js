var delay

// Initialize CodeMirror editor
var htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlEditor"), {
  mode: "text/html",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop : true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
})
var cssEditor = CodeMirror.fromTextArea(document.getElementById("cssEditor"), {
  mode: "text/css",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop : true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
})
var jsEditor = CodeMirror.fromTextArea(document.getElementById("jsEditor"), {
  mode: "text/javascript",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop : true,
  lint: {
    options: {
      "asi": true
    }
  },
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
})

// Live preview
htmlEditor.on("change", function() {
  clearTimeout(delay)
  delay = setTimeout(updatePreview, 300)
})
cssEditor.on("change", function() {
  clearTimeout(delay)
  delay = setTimeout(updatePreview, 300)
})
jsEditor.on("change", function() {
  clearTimeout(delay)
  delay = setTimeout(updatePreview, 300)
})

function updatePreview() {
  $(".preview-editor").empty();
  var frame = document.createElement("iframe");
  frame.setAttribute("id", "preview");
  frame.setAttribute("sandbox", "allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts");
  document.querySelector(".preview-editor").appendChild(frame);
  var previewFrame = document.getElementById("preview");
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
  preview.open()
  preview.write("<!DOCTYPE html>\n<html>\n  <head>\n    <title>site title</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta name=\"description\" content=\"Saved to gist\">\n    <style>\n" + cssEditor.getValue() + "\n    </style>\n  </head>\n  <body>\n" + htmlEditor.getValue() + "\n\n    <scr" + "ipt>\n      " + jsEditor.getValue() + "\n    </scr" + "ipt>\n  </body>\n</html>")
  preview.close()
}
setTimeout(updatePreview, 300)

// Splitter Grid
$("#splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
  theme: "metro"
})
$("#splitContainer").jqxSplitter({
  height: "100%",
  width: "100%",
  orientation: "horizontal",
  showSplitBar: true,
  panels: [{ size: "50%",collapsible:false },
           { size: "50%" }]
})
$("#leftSplitter").jqxSplitter({
  height: "100%",
  width: "100%",
  orientation: "vertical",
  showSplitBar: true,
  panels: [{ size: "50%",collapsible:false },
           { size: "50%"}]
})
$("#rightSplitter").jqxSplitter({
  height: "100%",
  width: "100%",
  orientation: "vertical",
  showSplitBar: true,
  panels: [{ size: "50%"},
           { size: "50%",collapsible:false }]
})

// Save code online as github gist
$("[data-action=save]").click(function() {
  // var htmlCode  = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>site title</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta name=\"description\" content=\"Saved to gist\">\n    <link rel=\"stylesheet\" href=\"css/style.css\" />\n  </head>\n  <body>\n" + document.getElementById("htmlEditor").value + "\n\n    <scr" + "ipt src=\"js/script.js\"></scr" + "ipt>\n  </body>\n</html>"
  // var htmlCode  = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>site title</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta name=\"description\" content=\"Saved to gist\">\n    <link rel=\"stylesheet\" href=\"css/style.css\" />\n  </head>\n  <body>\n" + htmlEditor.getValue() + "\n\n    <scr" + "ipt src=\"js/script.js\"></scr" + "ipt>\n  </body>\n</html>"
  var htmlValue = document.getElementById("htmlEditor").value
  var htmlVal   = htmlEditor.getValue()
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
    window.location.hash = e.html_url.split("https://gist.github.com/").join("")
    hash = window.location.hash.replace(/#/g,"")
    $("[data-action=saved]").text(e.html_url)
    $("[data-action=saved]").attr("href", e.html_url)
                            .attr("target", "_blank")
  })
  .error(function(e) {
    console.warn("gist save error", e)
    $("[data-action=saved]").text("gist save error", e)
  })
})

// Retrieve github gist and load in editor
var hash = window.location.hash.substring(1);;
if (window.location.hash) {
  function loadgist(gistid) {
    $.ajax({
      url: "https://api.github.com/gists/" + gistid,
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback"
    }).success(function(gistdata) {
      var htmlVal = gistdata.data.files["index.html"]
      var cssVal  = gistdata.data.files["style.css"]
      var jsVal   = gistdata.data.files["script.js"]

      // Return the editor's values
      if (!htmlVal) {
        htmlEditor.setValue("")
      } else {
        htmlEditor.setValue(htmlVal.content)
      }
      if (!cssVal) {
        cssEditor.setValue("")
      } else {
        cssEditor.setValue(cssVal.content)
      }
      if (!jsVal) {
        jsEditor.setValue("")
      } else {
        jsEditor.setValue(jsVal.content)
      }
    }).error(function(e) {
      // ajax error
      console.warn("Error: Could not load weave!", e)
      alertify.error("Error: Could not load weave!")
    })
  }

  loadgist(hash)
}