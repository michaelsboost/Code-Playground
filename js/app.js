let delay

HTMLHint.defaultRuleset = {
  "tagname-lowercase": true,
  "attr-lowercase": true,
  "attr-value-double-quotes": true,
  "doctype-first": false,
  "tag-pair": true,
  "spec-char-escape": true,
  "id-unique": true,
  "src-not-empty": true,
  "attr-no-duplication": true
}

// Initialize CodeMirror editor
const htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlEditor"), {
  mode: "text/html",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop : true,
  lint: true,
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
})
Inlet(htmlEditor)
emmetCodeMirror(htmlEditor)

// init css editor
const cssEditor = CodeMirror.fromTextArea(document.getElementById("cssEditor"), {
  mode: "text/css",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop : true,
  lint: true,
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
})
Inlet(cssEditor)
emmetCodeMirror(cssEditor)

// init js editor
const jsEditor = CodeMirror.fromTextArea(document.getElementById("jsEditor"), {
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
Inlet(jsEditor)
emmetCodeMirror(jsEditor)

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

updatePreview = () => {
  document.getElementById("previewElm").innerHTML = ""
  var frame = document.createElement("iframe")
  frame.setAttribute("id", "preview")
  frame.setAttribute("sandbox", "allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts")
  document.getElementById("previewElm").appendChild(frame)
  var previewFrame = document.getElementById("preview")
  var preview      =  previewFrame.contentDocument ||  previewFrame.contentWindow.document
  preview.open()
  preview.write(`<!DOCTYPE html>\n<html>\n  <head>\n    <title>a sample title</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta name=\"description\" content=\"A sample description\">\n    <link rel="stylesheet" href="libraries/normalize/normalize.css" />\n    <link rel="stylesheet" href="libraries/font-awesome/css/all.min.css" />\n    <style>\n${cssEditor.getValue()}\n    </style>\n  </head>\n  <body>\n${htmlEditor.getValue()}\n\n    <script>\n      ${jsEditor.getValue()}\n    </script>\n  </body>\n</html>`)
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