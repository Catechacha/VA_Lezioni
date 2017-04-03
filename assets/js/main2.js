/**
 * Created by cate on 03/04/2017.
 */

/*voglio che ad ogni click sul bottone rimuovo gli elementi grafici presenti pria in svg, e ci metto quelli nuovi*/

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
        .data(myNumbers);

    //exit
    var gsToRemove = gs.exit().remove();

    //append
    var gsToAdd = gs
        .enter()
        .append("g")
        .attr("transform",function (d, i){
        return "translate(10,"+(i*14+10)+")";
    });
    gsToAdd.append("line");
    gsToAdd.append("text");

    //update
    gs.select("line")
        .transition()//x mettere la transizione da uno shuffle ad un altro
        .duration(1500)//x la durata della transizione
        .attr("x2",function(d){return d})
        .attr("stroke","black");
    gs.select("text")
        .transition()//x mettere la transizione da uno shuffle ad un altro
        .duration(1500)//x la durata della transizione
        .attr("x",function(d){return d+4})
        .text(function(d){return d});
}

var numbers = generateNumbers();
console.log('numbers',numbers);
visualizeNumbers(numbers);

d3.select("#shuffle")
    .on('click',function(){
        visualizeNumbers(generateNumbers())
    });