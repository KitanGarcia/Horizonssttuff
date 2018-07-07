function getRandomInt(max)
{
  return Math.floor(Math.random() * Math.floor(max));
}

function printBoard(board)
{
  var formattedBoard = board.map(function(row)
  {
    return row.join(",");//concatenate all together with ,
  }).join("\n");
  console.log(formattedBoard);
}

function dropBomb(board, row, col)
{
  board[row][col] = "B";
}




/*function numAdjacentBombs (board, row, col)*/
function numAdjacentBombs (board, row, col)
{
  var count = 0;
  var size = Number($("#game-size").val()) - 1;
  if ((row == 0) && (col == 0))//TOP LEFT CORNER
  {
    console.log("top left corner");
    if (board[row + 1][col + 1] == "B")
    {
      count++;
    }
    if (board[row][col + 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col] == "B")
    {
      count++;
    }
  }
  else if ((row == size) && (col == size))//BOTTOM RIGHT CORNER
  {
    console.log("bottom right corner");
    if (board[row - 1][col - 1] == "B")
    {
      count++;
    }
    if (board[row][col - 1] == "B")
    {
      count++;
    }
    if (board[row - 1][col] == "B")
    {
      count++;
    }
  }
  else if ((row == size) && (col == 0))//BOTTOM LEFT CORNER
  {
    console.log("bottom left corner");
    if (board[row - 1][col] == "B")
    {
      count++;
    }
    if (board[row - 1][col + 1] == "B")
    {
      count++;
    }
    if (board[row][col + 1] == "B")
    {
      count++;
    }
  }
  else if ((row == 0) && (col == size))//TOP RIGHT CORNER
  {
    console.log("top right corner");
    if (board[row][col - 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col - 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col] == "B")
    {
      count++;
    }
  }
  else if (col == 0)//LEFT COLUMN
  {
    console.log("left column");
    if (board[row - 1][col] == "B")
    {
      count++;
    }
    if (board[row - 1][col + 1] == "B")
    {
      count++;
    }
    if (board[row][col + 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col + 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col] == "B")
    {
      count++;
    }
  }
  else if (col == size)//RIGHT COLUMN
  {
    console.log("right column");
    if (board[row - 1][col] == "B")
    {
      count++;
    }
    if (board[row - 1][col - 1] == "B")
    {
      count++;
    }
    if (board[row][col - 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col - 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col] == "B")
    {
      count++;
    }
  }
  else if (row == size)//BOTTOM ROW
  {
    console.log("Bottom row");
    if (board[row][col + 1] == "B")
    {
      count++;
    }
    if (board[row][col - 1] == "B")
    {
      count++;
    }
    if (board[row - 1][col - 1] == "B")
    {
      count++;
    }
    if (board[row - 1][col + 1] == "B")
    {
      count++;
    }
    if (board[row - 1][col] == "B")
    {
      count++;
    }
  }
  else if (row == 0)//TOP ROW
  {
    console.log("top row");
    if (board[row][col + 1] == "B")
    {
      count++;
    }
    if (board[row][col - 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col - 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col + 1] == "B")
    {
      count++;
    }
    if (board[row + 1][col] == "B")
    {
      count++;
    }
  }
  else//ALL CELLS NOT ON THE PERIMETER
  {
    console.log("not on perimeter");
    if (board[row - 1][col] == "B")//DIRECTLY ABOVE
    {
      count++;
    }
    if (board[row - 1][col - 1] == "B")//DIAGONAL UP LEFT
    {
      count++;
    }
    if (board[row - 1][col + 1] == "B")//DIAGONAL UP RIGHT
    {
      count++;
    }
    if (board[row][col - 1] == "B")//LEFT
    {
      count++;
    }
    if (board[row][col + 1] == "B")//RIGHT
    {
      count++;
    }
    if (board[row + 1][col] == "B")//DIRECTLY BELOW
    {
      count++;
    }
    if (board[row + 1][col + 1] == "B")//DIAGONAL DOWN RIGHT
    {
      count++;
    }
    if (board[row + 1][col - 1] == "B")//DIAGONAL DOWN LEFT
    {
      count++;
    }
  }
  return count;
}

function reveal(row, col, board)
{

  debugger;
  if (row < 0 || row >= board.length)
  {
    return;
  }
  else if (col < 0 || col >= board[row].length)
  {
    return;
  }


  var el = $("div[row = "+row+"][col = "+col+"]");
  if (el.text().trim() == "")
  {
    return;
  }


  if (board[row][col] == "B")
  {
    console.log("Game Over");
    alert("rekt...");
  }
  else if (board[row][col] != "B")
  {
    var number = board[row][col];
/*    var el = $("div[row = "+row+"][col = "+col+"]");
    el.text(number);*///THIS MAKES IT HAVE ?S INSTEAD OF NUMBERS

    if (number == 0)
    {
      reveal(row - 1, col - 1, board);
      reveal(row - 1, col, board);
      reveal(row - 1, col + 1, board);
      reveal(row, col - 1, board);
      reveal(row, col + 1, board);
      reveal(row + 1, col - 1, board);
      reveal(row + 1, col, board);
      reveal(row + 1, col + 1, board);
    }
  }
}


function drawBoard(board)
{
  var boardEl = $("#game-board");
  for (var i = 0; i < board.length; i++)
  {
    var rowEl = $('<div class ="row"></div>');

    for (var j = 0; j < board.length; j++)
    {
      var cellEl = $(`<div row = "${i}" col = "${j}" state = "${board[i][j]}" class = "cell">&nbsp;</div>`);
      cellEl.on("click", function(event)
      {
        var el = $(this);
        console.log(el.attr("row"), el.attr("col"), el.attr("state"));
        if (el.attr("state") == "B")
        {
          $(this).addClass("red");
          alert("BOOM! You just stepped on a bomb. Get rekt...");
          alert("Refresh the page to play again!");
          $("#game-board").hide();//probably better to remove and add the class?
          $(".ui").hide();
        }
        else
        {
          $(this).addClass("grey");//search and make the others grey
          var adjacentBombsCount = numAdjacentBombs(board, +el.attr("row"), +el.attr("col"));//The + makes it a number as opposed to string
          console.log("Number of adjacent bombs: ", adjacentBombsCount);
          $(this).text(adjacentBombsCount);
        }
        reveal(+el.attr("row"), +el.attr("col"), board);
      })
      rowEl.append(cellEl);
    }
    boardEl.append(rowEl);
  }
}


$(document).ready(function() {
/*$("body").on("click", ".cell", function(event)
{
  event.preventDefault();
  if (el.attr("state") == "B")
  {
    $(this).toggleClass("red");
  }
});*/
  $("#start-game").on("click", function()
  {
    var size = Number($("#game-size").val());
    var mineCount = Number($("#mine-count").val());
    var gameBoard =  [];
    for (var i = 0; i < size; i++)
    {
      var row = [];//row
      gameBoard[i] = row;
      for (var j = 0; j < size; j++)
      {
        row[j] = "?";
      }
    }

//write here
  while (mineCount --)
  {
    var bombX = getRandomInt(size);
    var bombY = getRandomInt(size);
    //check for duplicates!
    dropBomb(gameBoard, bombX, bombY);
  }
  console.log(gameBoard);
  printBoard(gameBoard);
  drawBoard(gameBoard);
  });
});
