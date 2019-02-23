function create_sb() {
    var sudoku_board = document.getElementById("sudoku_board");
    var colors = ["#DACFEF", "#B2DEE6", "#EFD4D0", "#E9EFD0", "#CFEBEF", "#CFEFD6"]
    var randomcolor = colors[Math.floor(Math.random()*colors.length)];
    for (let index = 1; index < 10; index++) {
        var outer_div = document.createElement("div");
        outer_div.style.display = "flex";
        outer_div.style.flexWrap = "wrap";
        outer_div.style.justifyContent = "space-between";
        outer_div.style.height = "150px";
        outer_div.style.width = "150px";
        outer_div.className = "container_" + index;
        sudoku_board.appendChild(outer_div);
        for (let index = 1; index < 10; index++) {
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

window.onload = create_sb;