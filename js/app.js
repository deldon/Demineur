
let game = {
    sizeGame: {
        y: 5,
        x: 5,
    },
    nbOfBomb: 5,
    bomb: [],
    nbOfClick: 0,
    nbMaxClick: 0,
    gameOver: false,
    init: () => {
        game.gameOver = false
        game.nbOfClick = 0;
        const cellOfGame = game.sizeGame.x * game.sizeGame.y;
        game.nbMaxClick = (cellOfGame - game.nbOfBomb);




        game.bomb = [];
        game.generateBomb(game.nbOfBomb);

        game.generateBoard();
        
        const smiley = document.querySelector('#smiley')
        
        smiley.classList.remove('gameOver')
        smiley.classList.remove('gameWin')
        smiley.classList.add('gameOk')

        smiley.addEventListener('click', game.init);
        



        let board = document.getElementById('game');

        board.addEventListener('click', game.myClick);

        board.oncontextmenu = () => false ;

        board.addEventListener('contextmenu', game.myClickRight);

    },
    
    getRandomInt: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    generateBomb: (nb) => {
        let i = 0;
        while (i <= (nb-1)) {

            let newBomb = [game.getRandomInt(0, game.sizeGame.x),game.getRandomInt(0, game.sizeGame.y)]
            let bombExist = false;
                for (let arr = 0; arr < game.bomb.length; arr++) {
               
                    if (newBomb[0] === game.bomb[arr][0] && newBomb[1] === game.bomb[arr][1]) {                       
                        bombExist = true
                    }
                }

                if (!bombExist) {
                    game.bomb.push(newBomb)

                    i++;
                }
                
        }
        //console.log('av',game.bomb);
       
 

    },
    generateBoard: () => {

        let board = document.getElementById('game');
        board.innerHTML = "";


        for (let y = 0; y < game.sizeGame.y; y++) {
            let row = document.createElement('div');
            board.appendChild(row);

            for (let x = 0; x < game.sizeGame.x; x++) {

                let cell = document.createElement('div');
                cell.classList.add('cell--box');
                cell.dataset.y = y;
                cell.dataset.x = x;
                cell.dataset.click = true;
                row.appendChild(cell);

            }

        }

    },
    isBomb: (x, y) => {
        let explosion = false;

        for (let m = 0; m < game.bomb.length; m++) {
            //console.log("isbonb-x",game.bomb[0][m]);

            if (x == game.bomb[m][0] && y == game.bomb[m][1]) {
                explosion = true;


            }
        }
        return explosion;
    },

    isProxi: (x, y) => {

        let nbBomb = 0;
        // A
        if (game.isBomb(x - 1, y - 1)) { nbBomb++; }
        // B
        if (game.isBomb(x - 1, y)) { nbBomb++; }
        // C
        if (game.isBomb(x - 1, y + 1)) { nbBomb++; }
        // D
        if (game.isBomb(x, y - 1)) { nbBomb++; }
        // F
        if (game.isBomb(x, y + 1)) { nbBomb++; }
        // G
        if (game.isBomb(x + 1, y - 1)) { nbBomb++; }
        // H
        if (game.isBomb(x + 1, y)) { nbBomb++; }
        // I
        if (game.isBomb(x + 1, y + 1)) { nbBomb++; }

        return nbBomb;

    },

    myClick: (event) => {
       // console.log(event);

        const cell = event.target;


        if (cell.classList.contains('cell--box') 
                        && game.gameOver === false
                        && !cell.classList.contains('flag')) {

            if (event.target.dataset.click === 'true') {

                game.nbOfClick++;  
                game.winGame()
                event.target.dataset.click = 'false';
            }

            if (game.isBomb(event.target.dataset.x, event.target.dataset.y)) {
                event.target.classList.add('bomb');
                game.overGame();

            } else {
                let nbDeBomb = game.isProxi(parseInt(event.target.dataset.x), parseInt(event.target.dataset.y))
                
                event.target.classList.add('safe');

                if (nbDeBomb === 0) {
                    game.erase(event.target.dataset.x,event.target.dataset.y);
                }
                if (nbDeBomb > 0) {
                    event.target.innerHTML = nbDeBomb;
                }

                event.target.classList.add(game.colorNumber(nbDeBomb));


            }
        }
    },
    colorNumber: (nbDeBomb) => {


        if (nbDeBomb === 1) {
            return 'blue';
            
        }
        if (nbDeBomb === 2) {
            return 'green';
            
        }
        if (nbDeBomb === 3) {
            return 'red';
           
        }

    },
    erase: (x,y) => {
        

    },

    cssList: (x,y) => {

        const cell = document.getElementsByClassName('cell--box');

        for (let i = 0; i < cell.length; i++) {
            
            //console.log(parseInt(cell[i].dataset.x));
            //console.log('argu',x);

            if (parseInt(cell[i].dataset.x) == x && parseInt(cell[i].dataset.y) == y) {
               
                console.log(cell[i].classList.add('safe'));
        
            }
        }  
    },

    myClickRight: (event) => {

        if (!event.target.classList.contains('safe') && game.gameOver === false) {
            event.target.classList.toggle('flag');
        }

    },

    winGame: () => {

       //console.log(game.nbOfClick);
        if (game.nbOfClick === game.nbMaxClick) {
            game.gameOver = true;
            const board = document.querySelector('#board');
            //board.innerHTML = '<p>Win</p>'
            game.smiley('win');
            
        }
        

    },
    overGame: () => {
        game.gameOver = true;
        const board = document.querySelector('#board');
        //board.innerHTML = '<p>Game Over</p>'
        game.smiley('over');
    },

    smiley: (etat) => {
        //console.log(etat);
        const smiley = document.querySelector('#smiley')
        if (etat == 'win') {
            smiley.classList.add('gameWin')
        }
        if (etat == 'over') {
            smiley.classList.add('gameOver')
        }

    },

}

game.init();




