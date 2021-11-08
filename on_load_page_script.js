const containerListItems = `ul.tw-grid`
const itemContainerClass = `li.tw-h-80.tw-rounded-lg.tw-bg-black.tw-bg-opacity-10.tw-border.tw-border-gray-900`;
const itemBottomEnd = `.tw-items-end`;

const myPlantsListItems = `div.tw-grid.grid.tw-grid-cols-2.tw-gap-x-1`

//colors = ['transparent', 'DarkSlateGray', 'Teal', 'MediumAquaMarin', 'ForestGreen', 'Crimson']
//colors = ['transparent', 'Red', 'FireBrick', 'GoldenRod', 'Orange', 'DarkSlateGray', 'ForestGreen', 'LimeGreen', 'Lime']
colors = ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'DarkSlateGray', 'Teal', 'FireBrick', 'ForestGreen', 'Crimson']

console.log("PVU Marketplace Assistent was injected successfuly")

const intervalToUpdatePlants = setInterval(() => { 
    loadScripts(); 
}, 400);

function loadScripts(){
    var containerMarket = $(containerListItems)
    var containerInventory = $(myPlantsListItems).children()
	
    if(containerMarket.length > 0){
        // clearInterval(intervalToUpdatePlants)
        show5ElementsPerRow()
        showLEPerHourOnMarket()
    }
    else if(containerInventory.length > 0){
        showLEPerHourOnInvetory()
    }
    else{
        console.log("Aguardando dados das plantas do servidor")
    }
}

function show5ElementsPerRow(){
    var container = $(containerListItems)
    container.removeClass("xl:tw-grid-cols-4").addClass("xl:tw-grid-cols-5")
}

function showLEPerHourOnMarket(){
    var itemListOnMarket = $(itemContainerClass)
	
	itemListOnMarket.each(function(){
        var itemContainer = $(this).children('a').find(itemBottomEnd).children('div')
		var lePointsBox = itemContainer.children('div.le.tw-text-center')
		var lePoints = lePointsBox[0]

        lePointsBox.find('.LEPH').remove()

		// var msg = $(this).find('.'+userMsg).attr('title')
		var onlyText = lePoints.textContent
            .replace('LE:', '')
            .replace('Hour', '').trim()
        
        var resultPoint = parseInt(evaluation(onlyText))
        
        // add new element
        var element = $("<span>")
            .addClass('LEPH')
            .css({background: getColor(resultPoint), padding: "1px 5px", margin:"3px", "border-radius": "10px"})
            .html(`<b>${resultPoint}</b> <span style="color:white">LE/h:</span><br>`);
        lePointsBox.prepend(element)

        // lePointsContainer.innerHTML += `<span>(LE: ${resultPoint}/h)</span>`

        showLEPriceRate(itemContainer, resultPoint)
	});
}

function showLEPriceRate(itemContainer, resultPoint){
	
	//var priceBox = itemContainer[1].children[0]// .children('div.tw-flex.tw-justify-end')//.children('p')
	var priceContainer = itemContainer.eq(1)//.children('tw-ml-4.tw-col-end-7.tw-col-span-3')
	var priceBox = itemContainer.children('div.tw-flex')
    var price = priceBox.children('p')[0]

    priceContainer.find('.PRICE').remove()
    console.log(priceContainer)

    var priceOnlyText = price.textContent.trim()
    var costVsBenefit = resultPoint / parseInt(priceOnlyText)
    
    // add new element
    var element = $("<span>")
        .addClass('PRICE')
        // .css({background: getColor(12), padding: "1px 4px", margin:"8px", "border-radius": "10px"})
        .html(`<span style="color:white;font-size:11px;float:right">CB: <b>${costVsBenefit.toFixed(2)}</b></span><br>`);
    priceContainer.prepend(element)
}

function showLEPerHourOnInvetory(){
    var itemListOnInventory = $(myPlantsListItems).children()

    itemListOnInventory.each(function(){
        var lePointsBox = $(this).children('p.stat.tw-mb-1')
        var lePoints = lePointsBox[0]

        lePointsBox.find('.LEPH').remove()

        var onlyText = lePoints.textContent
            .replace('LE:', '')
            .replace('hour', '').trim()
        
        var resultPoint = parseInt(evaluation(onlyText))
        
        console.log(resultPoint)
        // add new element
        var element = $("<span>")
            .addClass('LEPH')
            .css({background: getColor(resultPoint), padding: "1px 5px", "line-height": "2.5", "border-radius": "10px"})
            .html(`<b><span style="color:white">${resultPoint}</span></b> <span style="color:lightgray">LE/h</span><br>`);
        lePointsBox.prepend(element)
    })
}

function evaluation(s){
    let i = s.indexOf('/')
    let partOne = parseInt(s.slice(0, i).trim())
    let partTwo = parseInt(s.slice(i+1, s.length).trim())
    return partOne / partTwo
}

function getColor(resultPoint){
    var color = colors[0]

    if (resultPoint >= 15){
        color = colors[10]
    }else if (resultPoint >= 14){
        color = colors[9]
    }else if (resultPoint >= 13){
        color = colors[8]
    }else if (resultPoint >= 12){
        color = colors[7]
    }else if (resultPoint >= 11){
        color = colors[6]
    }else if (resultPoint >= 10){
        color = colors[5]
    }else if (resultPoint >= 9){
        color = colors[4]
    }else if (resultPoint >= 8){
        color = colors[3]
    }else if (resultPoint >= 7){
        color = colors[2]
    }else if (resultPoint >= 6){
        color = colors[1]
    }
    return color
}