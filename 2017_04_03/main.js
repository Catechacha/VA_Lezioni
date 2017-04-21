/**
 * Created by cate on 03/04/2017.
 */

/*voglio che ad ogni click sul bottone rimuovo gli elementi grafici presenti prima in svg, e ci metto quelli nuovi*/

var svg = d3.select("#viz")
    .append("svg")
    .attr("width",600)
    .attr("height",400);

var xAxis = d3.svg.axis()
    .orient("top");

svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(10,40)")
    .call(xAxis)

var gnumbers = svg.append("g")
    .attr("class","numbers")
    .attr("transform","translate(10,60)");

function generateNumbers(){
    var numbers=[];
    var n = Math.round(Math.random()*15); //prendi l'intero più vicino di un numero da 0 a 15. Mi serve per decidere quanti numeri voglio mettere nel dataset

    numbers = d3.range(n).map(function(d){
        return Math.round(Math.random()*2500);
    });
    console.log("numbers", numbers);
    return numbers;
}

function visualizeNumbers(myNumbers){
    var gs = gnumbers.selectAll("g.number")
        .data(myNumbers);

    //exit
    var gsToRemove = gs.exit().remove();

    //append
    var gsToAdd = gs
        .enter()
        .append("g")
        .attr("class","number")
        .attr("transform",function (d, i){
            return "translate(10,"+(i*14+10)+")";
        });
    gsToAdd.append("line").attr("x2",0).attr("stroke","black");
    gsToAdd.append("text").attr("x",0);

    //update
    var scale = d3.scale.linear()
        .domain([0,d3.max(myNumbers)])
        .range([0,580]);

    xAxis.scale(scale);

    svg.select("g.axis")
        .call(xAxis);

    var cScale = d3.scale.linear()
        .domain([0,d3.max(myNumbers)])
        //.range(["#fff", "#f00"]);
        //.range(["#fee0d2","#fc9272","#de2d26"]);//red 3-classes da color brewer
        //ora uso direttamente la lib colorbrewer messa con npm
        .range(colorbrewer['Reds'][5]);

    gs.select("line")
        .transition()//x mettere la transizione da uno shuffle ad un altro
        .duration(1500)//x la durata della transizione
        .attr("x2",scale)
        .attr("stroke",cScale);

    gs.select("text")
        .transition()//x mettere la transizione da uno shuffle ad un altro
        .duration(1500)//x la durata della transizione
        .attr("x",function(d){return scale(d)+4})
        .text(function(d){return d});
}

var numbers = generateNumbers();

visualizeNumbers(numbers);

d3.select("#shuffle")
    .on('click',function(d){
        console.log("click");
        visualizeNumbers(generateNumbers())
    });
