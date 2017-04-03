/**
 * Created by cate on 03/04/2017.
 */

var svg = d3.select("#viz")
    .append("svg")
    .attr("width",600)
    .attr("height",400);

function generateNumbers(){
    var numbers=[];
    var n = Math.round(Math.random()*15); //prendi l'intero più vicino di un numero da 0 a 15. Mi serve per decidere quanti numeri voglio mettere nel dataset

    numbers = d3.range(n).map(function(d){
        return Math.round(Math.random()*250);
    });
    return numbers;
}

function visualizeNumbers(myNumbers){
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
}

var numbers = generateNumbers();
console.log('numbers',numbers);
visualizeNumbers(numbers);

d3.select("#shuffle")
    .on('click',function(){
        visualizeNumbers(generateNumbers())
    });