//import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/yeti.min.css';
import 'pdfjs-dist/web/pdf_viewer.css';
import './styles/main.css';

import $ from 'jquery';
import 'bootstrap';
import pdfjsLib from 'pdfjs-dist';
import { PDFPageView, DefaultAnnotationLayerFactory } from 'pdfjs-dist/web/pdf_viewer.js';
import Tesseract from 'tesseract.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'dist/pdf.worker.js';

function loadPDF(pdfData){
  let main = $('main');
  main.fadeOut(function(){
    main.html('');
    var loadingTask = pdfjsLib.getDocument({data: pdfData});
    loadingTask.promise.then(function(pdf){
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page){
        let pdfPageView = new PDFPageView({
          container: main[0],
          id: pageNumber,
          scale: 1.0,
          defaultViewport: page.getViewport(1.0),
          annotationLayerFactory: new DefaultAnnotationLayerFactory(),
          renderInteractiveForms: true
        });
        pdfPageView.setPdfPage(page);
        pdfPageView.draw().then(function(){
          main.fadeIn();
          Tesseract.recognize(main.find('canvas')[0]).then(function(result){
            console.log(result.text);
          });
        });
      });
    });
  });
}

$('#load').on('change', function(){
  if(!this.files.length) return;
  const reader = new FileReader();
  reader.onload = e => loadPDF(e.target.result);
  reader.readAsBinaryString(this.files[0]);
});

loadPDF(atob(
  'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
  'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
  'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
  'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
  'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
  'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
  'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
  'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
  'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
  'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
  'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
  'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
  'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G'));
