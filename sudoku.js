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

    var newBoxes = []

    for (var i=0; i < 9; i++){

        newBoxes[i] = []

        for(var k=0; k < 9; k++){

            var newElement = document.getElementById('cell'+ i + k)
            var newValue = newElement.value
            newBoxes[i][k] = newValue

            if (newValue == ""){
                newElement.className = "cell background-yellow"
            }
        }
    }
    validateArray(newBoxes)
    console.log(newBoxes)
        
}

function validateArray(boxes){
    for (var i = 0; i < 9; i++) {

        for(var k = 0; k < 9; k++){

            if (boxes[i][k] != "") {

                for (var j = k + 1; j < boxes[i].length; j++) {

                    if (boxes[i][k] == boxes[i][j]) {

                        console.log("ik: " + boxes[i][k]);
                        console.log("ij: " + boxes[i][j]);
                        console.log("duplicate found");
                        console.log(document.getElementById("cell" + i + k));

                        var currenCell = document.getElementById("cell" + i + k);
                        var otherCell =  document.getElementById("cell" + i + j);

                        if (!currenCell.hasAttribute("readonly")) {
                            currenCell.className = "cell background-red"
                        }
                        if (!otherCell.hasAttribute("readonly")) {
                            otherCell.className = "cell background-red"
                        }
                    }
                }
            }
        }
    }
}


 
    


