/**
 * Created by cate on 27/03/2017.
 */

    //get a new dataset
//var numbers = [10,30,60,100,250,80,134,42,99];
    var numbers=[];

/*GENERO IL DATASET AUTOMATICAMENTE: MODO 1*/
var n = Math.round(Math.random()*15); //prendi l'intero più vicino di un numero da 0 a 15. Mi serve per decidere quanti numeri voglio mettere nel dataset
/*Math.random() ritorna un numero tra 0 e 1*/
/*for(var i = 0; i < n; i++){
    var r = Math.round(Math.random()*250);
    numbers.push(r);
}
*/

/*GENERO IL DATASET AUTOMATICAMENTE: MODO 2*/
//range crea un insieme di numeri che va da 0 (o 1) fino ad n; con map applico a tutti una funzione
numbers = d3.range(n).map(function(d){
    return Math.round(Math.random()*250);
});


var svg = d3.select("#viz")
    .append("svg")
    .attr("width",600)
    .attr("height",400);

/*
svg.selectAll("line")
 .data(numbers)
 .enter()
 .append("line")
 .attr("x1",10)
 .attr("y1",function(d,i){
 return 10*i;
 })
 .attr("y2",function(d,i){
 return 10*i;
 })
 .attr("x2",function(d){
 return 10 + d;
 })
 .attr("stroke","black")
 .attr("stroke-width",4);
 */
var gs = svg.selectAll("g")
    .data(numbers)
    .enter()
    .append("g")
    .attr("transform",function (d,i) {
        return "translate(10,"+(i*14+10)+")";
    });
gs.append("line")
    .attr("x2",function(d){
        return d;
    }) //x1 y1 e y2 prendono il valore di default che è 0, perchè non sono definiti
    .attr("stroke","black")
    .attr("stroke-width",4);
gs.append("text")
    .attr("x",function(d){//coordinata x a cui inserire la scritta
        return d + 4;
    })
    .text(function(d){return d});
