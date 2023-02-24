const markdownpdf = require("markdown-pdf");
const split = require("split"),
  through = require("through"),
  duplexer = require("duplexer");

function preProcessMd() {
  var splitter = split();
  var replacer = through(function (data) {
    this.queue(data.replace(/\(\.\.\/\.\.\/assets\//g, "(../assets/") + "\n");
  });
  splitter.pipe(replacer);
  return duplexer(splitter, replacer);
}

const mdDocs = [
  "Kapitel-01/Kapitel-01 - Daten importieren.md",
  "Kapitel-02/Kapitel-02 - App erstellen.md",
  "Kapitel-03/Kapitel-03 - Views.md",
  "Kapitel-04/Kapitel-04 - Interactive Grid.md",
  "Kapitel-05/Kapitel-05 - Master-Detail-Detail.md",
  "Kapitel-06/Kapitel-06 - Charts.md",
  "Kapitel-07/Kapitel-07 - Features für mobile Endgeräte.md",
  "Kapitel-08/Kapitel-08 - Cards Region.md",
  "Kapitel-09/Kapitel-09 - Faceted Search.md",
  "Kapitel-10/Kapitel-10 - Smart Filters.md",
  "Kapitel-11/Kapitel-11 - Optische Anpassungen.md",
  "Kapitel-12/Kapitel-12 - Plug-ins.md",
  "Kapitel-13/Kapitel-13 - Rest Data Sources.md",
  "Kapitel-14/Kapitel-14 - Exkurs.md",
  "Kapitel-15/Kapitel-15 - Karten erstellen.md",
  "Kapitel-16/Kapitel-16 - Genehmigungsprozess .md",
  "Kapitel-17/Kapitel-17 - Application Search.md",
  "Kapitel-18/Kapitel-18 - Invoke API Process Type.md",
];
const outFile = "../out/test_output.pdf";

markdownpdf({
  preProcessMd: preProcessMd,
})
  .concat.from(mdDocs)
  .to(outFile, function () {
    console.log("Created", outFile);
  });
