var boxes = []
var defaulteasy = [
    [".", ".", "9", "2", ".", "6", ".", "1", "."],
    ["2", ".", "1", ".", ".", "9", ".", ".", "6"],
    ["4", ".", "6", "1", ".", "8", "9", ".", "2"],
    ["5", ".", ".", "9", "6", "8", "1", "3", "2"],
    ["8", "2", "3", "1", "7", "4", "9", "6", "5"],
    ["6", "1", "9", "3", "2", "5", ".", "4", "7"],
    ["4", "8", "5", "6", "2", "1", "7", "9", "."],
    ["3", "9", "7", "4", "5", "8", ".", "1", "2"],
    ["2", "6", ".", "7", "9", "3", "5", "8", "4"]
];
var defaultmedium = [
    ["8", "6", "2", "9", "5", "7", "4", "3", "1"],
    [".", "4", ".", "8", "3", "1", ".", "6", "2"],
    [".", ".", "1", "4", "6", "2", "8", ".", "."],
    ["3", "1", "8", "2", "7", "5", "6", "9", "4"],
    ["4", "5", "7", "6", "9", "3", "2", "1", "8"],
    [".", ".", ".", ".", "4", "8", "5", "7", "3"],
    ["5", "4", ".", "1", "2", ".", "7", "8", "."],
    ["1", "8", ".", ".", ".", ".", ".", "2", "."],
    [".", ".", ".", ".", ".", ".", ".", "1", "."]
];
var defaulthard = [
    [".", ".", "4", ".", "3", "9", "5", ".", "."],
    [".", "3", ".", "6", ".", ".", ".", "4", "."],
    ["6", ".", "1", "5", "4", "2", "9", ".", "."],
    ["4", ".", "6", "1", ".", "5", "2", "9", "."],
    ["5", "2", "3", ".", ".", "9", "8", "7", "1"],
    [".", ".", "9", "2", ".", ".", "4", "6", "5"],
    [".", "1", "8", ".", "5", ".", ".", ".", "."],
    [".", "5", "4", ".", ".", "6", "1", ".", "."],
    ["7", "2", "6", ".", "9", "4", ".", "5", "."]
];
var sudokuID = ""

function getBoxes() {
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
            };
            sudokuID = "-1";
        })
        .then(function () {
            var sudoku_board = document.getElementById("sudoku_board");
            var sudoku_id = document.getElementById("sudokuId");
            sudoku_id.innerHTML = sudokuID;
            sudoku_board.innerHTML = "";
            var colors = ["#DACFEF", "#EFD4D0", "#E9EFD0", "#CFEBEF", "#CFEFD6"];
            var shades = ["#E9E1F5", "#F6E4E3", "#F1F6E3", "#E1F4F5", "#E3F6E7"];
            var random_number = Math.floor(Math.random()*colors.length);
            var randomcolor = colors[random_number];
            var randomshade = shades[random_number];
            for (let index = 0; index < 9; index++) {
                var outer_div = document.createElement("div");
                outer_div.style.display = "flex";
                outer_div.style.flexWrap = "wrap";
                outer_div.style.justifyContent = "space-between";
                outer_div.style.height = "150px";
                outer_div.style.width = "150px";
                outer_div.className = "container_" + index;
                sudoku_board.appendChild(outer_div);
                for (let cellindex = 0; cellindex < 9; cellindex++) {
                    var inputbox = document.createElement("input");
                    inputbox.style.width = "50px";
                    inputbox.style.height = "50px";
                    inputbox.style.background = randomcolor;
                    inputbox.style.color = "white";
                    inputbox.style.border = "none";
                    inputbox.style.flex =  "1 1 50px";
                    inputbox.style.fontSize = "36px";
                    inputbox.style.textAlign = "center";
                    inputbox.style.textShadow = "0px 0px 1px #000000";
                    inputbox.type = "number";
                    inputbox.value = boxes[index][cellindex];
                    if (inputbox.value === boxes[index][cellindex]) {
                        inputbox.disabled = "True";
                        inputbox.style.backgroundColor = randomshade;
                    }
                    inputbox.id = "cell"+index+cellindex;
                    inputbox.className = "cell" + index + cellindex;
                    outer_div.appendChild(inputbox);
                };
            };
        });
}