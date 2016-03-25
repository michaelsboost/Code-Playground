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
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
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
  var previewFrame = document.getElementById("preview")
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document
  preview.open()
  preview.write("<!DOCTYPE html>\n<html>\n  <head>\n    <title>site title</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta name=\"description\" content=\"Saved to gist\">\n    <style>\n" + cssEditor.getValue() + "\n    </style>\n  </head>\n  <body>\n" + htmlEditor.getValue() + "\n\n    <scr" + "ipt>\n      " + jsEditor.getValue() + "\n    </scr" + "ipt>\n  </body>\n</html>")
  preview.close()
}
setTimeout(updatePreview, 300)

$(document).ready(function() {
  // Splitter Theme
  $("#splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
    theme: "metro"
  })

  // Splitter Grid
  var BoxSplitter = function() {
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
  }
  BoxSplitter()
})
