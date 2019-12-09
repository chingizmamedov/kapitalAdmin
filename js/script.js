$(function() {

var allFilials = [];


 var svg = document.getElementById('baki-full'),  
     NS = svg.getAttribute('xmlns')
  
   // debugger
  // add a circle to the SVG
svg.addEventListener('click', function(e) {

   var
     t = e.target,
     x = e.clientX,
     y = e.clientY,
     target = (t == svg ? svg : t.parentNode),
     svgP = svgPoint(target, x, y),
     circle = document.createElementNS(NS, 'circle');
   
   circle.setAttributeNS(null, 'cx', Math.round(svgP.x));
   circle.setAttributeNS(null, 'cy', Math.round(svgP.y));
   circle.setAttributeNS(null, 'r', 2);
   target.appendChild(circle);
   

   allFilials.push({
      filialX: Math.round(svgP.x),
      filialY: Math.round(svgP.y),
      filialName: ''
   })
   document.getElementById('filial-pos').value = allFilials.length
   document.getElementById('filial-num').innerHTML = allFilials.length - 1
   
   
 }, false);

 // translate page to SVG co-ordinate
function svgPoint(element, x, y) {
  
   var pt = svg.createSVGPoint();
   pt.x = x;
   pt.y = y;
   return pt.matrixTransform(element.getScreenCTM().inverse());
   
 }

 document.getElementById('elave').addEventListener('click', function() {
   var elementNum = document.getElementById('filial-pos').value - 1,
   filialNameFromInput = document.getElementById('elave-input').value
  
   
   allFilials[elementNum].filialName = filialNameFromInput
   document.getElementById('elave-input').value = ''
   

   var listing = ''

   for(var i = 0; i < allFilials.length; i++) {

      var innString = '<div class="d-flex box" >'
      innString += '<span><strong>' + (i + 1) + ')</strong> <b> X</b>' + allFilials[i].filialX + '<b> y </b>' + allFilials[i].filialY + '<br><b>Filial name</b> ' + allFilials[i].filialName + '</div>';
      
      listing += innString
     


   }

   document.getElementById('listFull').innerHTML = listing
   console.log(allFilials)
   

 })




 $("#delete").click(function() {

   var elemId = $("#filial-pos").val() - 1
   
   allFilials.splice( elemId, 1)
   
   redrow()


  var listing = ''

   for(var i = 0; i < allFilials.length; i++) {

      var innString = '<div class="d-flex box" >'
      innString += '<span><strong>' + (i + 1) + ')</strong> <b> X</b>' + allFilials[i].filialX + '<b> y </b>' + allFilials[i].filialY + '<br><b>Filial adi</b> ' + allFilials[i].filialName + '</div>';      
      listing += innString
     


   }

   document.getElementById('listFull').innerHTML = listing

 })


 function redrow() {
  var target = document.getElementById('map-baki')


  var element = document.getElementsByTagName('circle' ), index;

  for (index = element.length - 1; index >= 0; index--) {
      element[index].parentNode.removeChild(element[index]);
  }
  
  for(var i = 0; i < allFilials.length; i++) {

    circle = document.createElementNS(NS, 'circle');
   
    circle.setAttributeNS(null, 'cx', allFilials[i].filialX);
    circle.setAttributeNS(null, 'cy', allFilials[i].filialY);
    circle.setAttributeNS(null, 'r', 2);
    target.appendChild(circle);

  }
  
  console.log(allFilials)
 }

})