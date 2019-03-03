var boxes = []
var defaulteasy = [
    ["5", "6", "4", ".", ".", "3", "2", ".", "1"],
    ["8", "7", "2", ".", "1", ".", "3", "9", "."],
    ["3", "9", "1", ".", ".", ".", ".", ".", "5"],
    ["4", "2", "9", "6", "5", "7", "3", "1", "8"],
    [".", ".", "8", "2", "3", "1", "9", "4", "7"],
    ["7", "1", "3", "8", "4", "9", "5", "2", "6"],
    [".", ".", "6", ".", "3", "5", "8", "4", "2"],
    ["4", "2", "3", "7", "8", "9", "1", ".", "."],
    [".", "5", "8", "2", "6", "4", "9", "3", "7"]
];
var defaultmedium = [
    ["8", "7", ".", ".", "4", ".", "6", "2", "5"],
    ["4", "5", ".", ".", "2", ".", ".", "1", "."],
    ["2", "1", ".", "8", "5", ".", ".", "9", "."],
    ["7", "6", ".", "5", ".", "4", ".", "8", "."],
    ["9", "3", "1", "8", "6", "2", "5", ".", "7"],
    ["5", "4", "8", "3", ".", "1", "9", "6", "2"],
    ["2", ".", "7", "9", "5", "8", "4", ".", "6"],
    [".", "9", "4", "6", "7", "3", "2", ".", "5"],
    [".", ".", "5", "1", ".", "4", ".", ".", "."]
];
var defaulthard = [
    ["4", ".", ".", "9", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "4", ".", ".", ".", "."],
    ["5", "3", "9", "6", ".", "1", "7", ".", "4"],
    [".", "9", "6", ".", "4", "7", ".", ".", "."],
    [".", "7", "8", "5", ".", "2", "1", "9", "6"],
    ["2", "5", "3", "9", "1", "6", "8", "4", "7"],
    [".", ".", "1", ".", "8", "4", "2", ".", "."],
    [".", "8", ".", ".", ".", ".", ".", "5", "4"],
    ["4", ".", "2", "3", ".", "5", "1", "7", "8"]
];
var sudokuID = ""

function doAjax() {
    //Prepare the parameter value for 'myParam'
    var paramValue = document.getElementById("difficultySelector").value;

    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { difficulty: paramValue })
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);
            boxes = response.data.board.boxes;
            sudokuID = response.data.board._id;
            console.log(boxes)
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
            if (paramValue === "easy") {

                boxes = defaulteasy;

            } else if (paramValue === "medium") {

                boxes = defaultmedium;
            } else {
                
                boxes = defaulthard;
            }
            sudokuID = "-1";
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
            // Loops through the arrays and get values for each table cell
            for (var i=0; i < boxes.length; i++){

                for(var k=0; k < boxes[i].length; k++){

                    var cellData = document.getElementById('cell'+ i + k )

                    value = boxes[i][k]

                    // if value is not a number, can be changed.
                    // if value is not a number, will remain as blank (prevent refilling while regenerating)
                    // if value is a number, change is not permitted.
                    // if value is a number, change the class name to be able to change background color. 

                    if (value == '.'){

                        cellData.removeAttribute('readonly')
                        cellData.value = ""
                        cellData.className = "cell"

                    } else {

                        cellData.value = value
                        cellData.setAttribute('readonly','')
                        cellData.className = "cell background-grey"
                    }
                }
            } 
        })
    }

var validateBoard = function() {
    var isValid = true;
    var sudokuTable = document.getElementsByClassName('sudoku-table')[0];

    var rowCol = getRowCol(sudokuTable);

    for (var m=0; m < 9; m++) {
        for (var n = 0; n < 9; n++) {
            var cellId = sudokuTable.rows[m].cells[n].firstChild.id;
            var newElement = document.getElementById(cellId);
            if (newElement.className !== "cell background-grey") {
                if (newElement.value !== ''){
                    if(newElement.value < 1 || newElement.value > 9){
                        isValid = false;
                        document.getElementById(cellId).className = 'cell background-red';
                    }
                    else{
                        var rowColumnValid = validateRowColumn(rowCol, newElement.value, n, m);
                        var boxValid = validateBox(boxes, newElement.value, cellId[4], cellId[5]);
                        if (rowColumnValid && boxValid ){
                            document.getElementById("resultMsg").firstChild.nodeValue = 'Sudoku Valid!';
                        }
                        else {
                            isValid = false;
                            document.getElementById(cellId).className = 'cell background-red';
                        }
                    }
                }
                else{
                    isValid = false;
                    document.getElementById(cellId).className = 'cell background-yellow';
                }

            }
        }
    }

    console.log("Is the board valid: " + isValid);
    return isValid
};

var getRowCol = function(htmlTable) {

    var rowsColumns = [];
    for (var i = 0; i < 9; i++) {
        rowsColumns[i] = [];
        for (var j = 0; j < 9; j++) {
            var cellId = htmlTable.rows[i].cells[j].firstChild.id;
            var newElement = document.getElementById(cellId);
            rowsColumns[i][j] = newElement.value;
        }
    }
    return rowsColumns
};


var validateRowColumn = function(table, value, x, y){
    // Validate row
    var rowValid = true;
    for (var i = 0; i < 9; i++) {
        if(table[y][i] === value && i !== x){
            rowValid = false
        }
    }

    // Validate column
    var columnValid = true;
    for (var j = 0; j < 9; j++) {
        if(table[j][x] === value && j !== y){
            columnValid = false
        }
    }
    return rowValid || columnValid
};

var validateBox = function(boxes, value, boxNR, boxPlace){
    var boxValid = true;
    for(var i = 0; i < 9; i++){
        if(boxes[boxNR][i] === value && i !== boxPlace){
            boxValid = false
        }
    }
    return boxValid
};