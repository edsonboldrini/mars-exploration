const fs = require('fs')
var canvasLength = {}

const directions = {
  'N': {
    'L': 'W',
    'R': 'E',
    'A': 'y 1'
  },
  'W': {
    'L': 'S',
    'R': 'N',
    'A': 'x -1'
  },
  'E': {
    'L': 'N',
    'R': 'S',
    'A': 'x 1'
  },
  'S': {
    'L': 'E',
    'R': 'W',
    'A': 'y -1'
  },
}

function moveShip(firstPositionLine, stepsLine) {
  var firstPosition = firstPositionLine.split(' ')

  var shipPosition = {
    x: parseInt(firstPosition[0]),
    y: parseInt(firstPosition[1]),
    direction: firstPosition[2],
  }  
  
  const steps = stepsLine.split('')
  for (step of steps){
    if (step != 'M'){      
      shipPosition.direction = directions[shipPosition.direction][step]
    }
    else{
      var action = directions[shipPosition.direction]['A'].split(' ')
      axis = action[0]
      movement = parseInt(action[1])
      var resultMove = shipPosition[axis] + movement      
      if (resultMove >= canvasLength[axis]['b'] && resultMove <= canvasLength[axis]['e']){
        shipPosition[axis] = resultMove
      }
    }
  }
  
  console.log(`${shipPosition.x} ${shipPosition.y} ${shipPosition.direction}`)
}

try {
  const fileName = process.argv[2] ? process.argv[2] : './input.txt'
  
  if (!fs.existsSync(fileName) ){
    throw 'File does not exists'
  }  

  const data = fs.readFileSync(fileName, 'utf8')
  const lines = data.split('\n')

  const canvasSplit = lines[0].split(' ')

  canvasLength = {
    'x': {
      'b': 0,
      'e': parseInt(canvasSplit[0])
    },
    'y': {
      'b': 0,
      'e': parseInt(canvasSplit[1])
    },
  }

  for (var i = 1; i+1 < lines.length; i+=2){
    moveShip(lines[i], lines[i+1])
  }

    
} catch (err) {
  console.error(err)
}