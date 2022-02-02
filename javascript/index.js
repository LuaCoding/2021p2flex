function init()
{
    game = new Game ();
}

let game;

class Player
{
    constructor(index)
    {
        this.index = index;
        this.atTile = 0;
        this.pawn = document.getElementsByClassName("pawn"+index)[0];
        this.pawn.style.display = "block";
    }
}

// ik heb echt zoveel tijd verspilt omdat ik "Tile" misgespelt had als "Title"
// let op wat je doet!!! :(

class Tile
{
    constructor(div)
    {
        this.div = div;
        this.goto = -1;
    }
}

class Game
{
    constructor()
    {
        this.mainDiv = document.getElementsByClassName("main")[0];
        this.boardDiv = document.getElementsByClassName("board")[0];
        this.boardoverlayDiv = document.getElementsByClassName("boardoverlay")[0];
        this.selectplayersDiv = document.getElementsByClassName("selectplayers")[0];
        this.winnerDiv = document.getElementsByClassName("winner")[0];
        this.playerturnDiv = document.getElementsByClassName("playerturn")[0];
        this.rollDiv = document.getElementsByClassName("roll")[0];

        this.tiles = [];
        this.playerturn = 0;
        this.players = [];
        this.setupBoard();
    }

    setupBoard()
    {
        // 0 omhoog, 1 rechts, 3 links
        let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        let x = 0;
        let y = 10;
        let tileSize = 55;

        for (var i = 0; i < path.length; i++)
        {
            let cmd = path[i];
            if (cmd == 1)
            {
                x++;
            }
            else if (cmd == 3)
            {
                x--;
            }
            else if (cmd == 0)
            {
                y--;
            }

            let div = this.makeBoardDiv(x * tileSize, y * tileSize, i+1)

            let tile = new Tile(div);
            this.tiles.push(tile);
        }

        this.setupGotos();
    }
    setupGotos()
    {
        // ladders en slangen
        let goto = [[6, 14], [16, 4], [17, 23], [27, 33], [29, 10], [38, 43], [39, 20], [45, 34]];

        for (var i = 0; i < goto.length; i++)
        {
            let element = goto[i]; 

            let start = element[0] - 1;
            let end = element[1] - 1;

            let tile = this.tiles[start];
            tile.goto = end;
        }
    }
    start(amountOfPlayers)
    {
        this.selectplayersDiv.style.display = "none";
        this.winnerDiv.style.display = "none";
        this.mainDiv.style.display = "block";

        let pawns = document.getElementsByClassName("pawn");

        for (var i = 0; i < pawns.length; i++)
        {
            pawns[i].style.display="none";

        }

        for (var i = 0; i < amountOfPlayers.length; i++)
        {
            let player = new Player(i);
            this.players.push(player);
        }

        this.playerturn = -1;

        this.moveToNextPlayer();

    }
    moveToNextPlayer()
    {
        this.playerturn++;

        if (this.playerturn == this.players.length)
        {
            this.playerturn = 0;
        }

        this.draw();
    }
    draw()
    {   
        for (var i = 0; i < this.players.length; i++)
        {
            console.log("hi2");
            this.setPawn(i, this.players[i].atTile);
        }
    }
    roll()
    {

    }
    setPawn(playerI, atTile)
    {
        let tile = this.tiles[atTile];
        let player = this.players[playerI];
        player.pawn.style.left = tile.div.style.left;

        player.pawn.style.top = tile.div.style.top;

    }
    makeBoardDiv(x,y,tileDisplayNumber)
    {
        let div = document.createElement("div");

        div.className = "tile";
        div.style.left = x + "px";
        div.style.top = y + "px";
        div.textContent = tileDisplayNumber;

        this.boardDiv.appendChild(div);

        return div;
    }
}