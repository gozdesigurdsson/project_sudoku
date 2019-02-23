var boxes = []

function getBoxes() {
    //Prepare the parameter value for 'myParam'
    var paramValue = "easy";

    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { difficulty: paramValue })
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);
            boxes = response.data.board.boxes
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            var sudoku_board = document.getElementById("sudoku_board");
            sudoku_board.innerHTML = ""
            var colors = ["#DACFEF", "#B2DEE6", "#EFD4D0", "#E9EFD0", "#CFEBEF", "#CFEFD6"]
            var randomcolor = colors[Math.floor(Math.random()*colors.length)];
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
                    inputbox.type = "number";
                    inputbox.value = boxes[index][cellindex];
                    inputbox.className = "cell" + index + cellindex;
                    outer_div.appendChild(inputbox);
                };
            }
        });
}

function create_sb() {
    var sudoku_board = document.getElementById("sudoku_board");
    var colors = ["#DACFEF", "#B2DEE6", "#EFD4D0", "#E9EFD0", "#CFEBEF", "#CFEFD6"]
    var randomcolor = colors[Math.floor(Math.random()*colors.length)];
    for (let index = 0; index < 9; index++) {
        var outer_div = document.createElement("div");
        outer_div.style.display = "flex";
        outer_div.style.flexWrap = "wrap";
        outer_div.style.justifyContent = "space-between";
        outer_div.style.height = "150px";
        outer_div.style.width = "150px";
        outer_div.className = "container_" + index;
        sudoku_board.appendChild(outer_div);
        for (let index = 0; index < 9; index++) {
            var inputbox = document.createElement("input");
            inputbox.style.width = "50px";
            inputbox.style.height = "50px";
            inputbox.style.background = randomcolor;
            inputbox.style.color = "white";
            inputbox.style.border = "none";
            inputbox.style.flex =  "1 1 50px";
            inputbox.style.fontSize = "36px";
            inputbox.style.textAlign = "center";
            inputbox.type = "text";
            inputbox.maxLength = "1";
            inputbox.className = "box_" + index;
            outer_div.appendChild(inputbox);
        };
    }
}