ArrayList<ArrayList<Tile>> maze = new ArrayList<ArrayList<Tile>>();

class Tile {
  int row, col;
  boolean topWall = true;
  boolean rightWall = true;
  boolean bottomWall = true;
  boolean leftWall = true;
  boolean seen = false;
  
  Tile(int rowIndex, int colIndex) {
    row = rowIndex;
    col = colIndex;
  }
}

int[] checkNeighbors(ArrayList<ArrayList<Tile>> maze,int row,int col) {
    ArrayList<Tile> neighbors = new ArrayList<Tile>();

    Tile left;
    Tile right;
    Tile top;
    Tile bottom;

    if (row-1 < 0) {
      top = null;
    } else {
      top = maze.get(row-1).get(col);
    }
    if (col-1 < 0) {
      left = null;
    } else {
      left = maze.get(row).get(col-1);
    }
    if (row+2 > maze.size()) {
      bottom = null;
    } else {
      bottom = maze.get(row+1).get(col);
    }
    if (col+2 > maze.get(row).size()) {
      right = null;
    } else {
      right = maze.get(row).get(col+1);
    }

    if (top != null && !top.seen) {
      neighbors.add(top);
    }
    if (right != null && !right.seen) {
      neighbors.add(right);
    }
    if (bottom != null && !bottom.seen) {
      neighbors.add(bottom);
    }
    if (left != null && !left.seen) {
      neighbors.add(left);
    }

    if (neighbors.size() > 0) {
      int r = floor(random(0, neighbors.size()));      
      int[] returnArray = new int[2];
      returnArray[0] = neighbors.get(r).row;
      returnArray[1] = neighbors.get(r).col;
      return returnArray;
    } else {
      return null;
    }
  }

void showMaze(ArrayList<ArrayList<Tile>> maze) {
  for (int rowIndex = 0; rowIndex < maze.size(); ++rowIndex) {
    for (int colIndex = 0; colIndex < maze.get(rowIndex).size(); ++colIndex) {
      int xPos = rowIndex*tileSize;
      int yPos = colIndex*tileSize;
      
      if (maze.get(rowIndex).get(colIndex).seen) {
        noStroke();
        fill(0,200,200,100);
        rect(xPos,yPos,tileSize,tileSize);
      }
      
      stroke(255);
      strokeWeight(2);
      if (maze.get(rowIndex).get(colIndex).topWall) {
        line(xPos,yPos,xPos+tileSize,yPos);
      }
      if (maze.get(rowIndex).get(colIndex).rightWall) {
        line(xPos+tileSize,yPos,xPos+tileSize,yPos+tileSize);
      }
      if (maze.get(rowIndex).get(colIndex).bottomWall) {
        line(xPos+tileSize,yPos+tileSize,xPos,yPos+tileSize);
      }
      if (maze.get(rowIndex).get(colIndex).leftWall) {
        line(xPos,yPos+tileSize,xPos,yPos);
      }
    }
  } 
}

boolean checkFinished(ArrayList<ArrayList<Tile>> maze) {
  for (int rowIndex = 0; rowIndex < maze.size(); ++rowIndex) {
    for (int colIndex = 0; colIndex < maze.get(rowIndex).size(); ++colIndex) {
      if (maze.get(rowIndex).get(colIndex).seen == false) {
        return false;
      }
    }
  }
  return true;
}


int tileSize = 10;
Tile start;
ArrayList<Tile> stack = new ArrayList<Tile>();
int posX;
int posY;
int speed = tileSize/4;
int size = tileSize/2;
float angle;

boolean wPressed = false;
boolean aPressed = false;
boolean sPressed = false;
boolean dPressed = false;
boolean finished = false;
PFont f;

PShape s;

void setup() {
  frameRate(60);
  //size(500, 500, P2D);
  size(500, 500);
  posX = size;
  posY = size;
  int col = floor(width/tileSize);
  int row = floor(height/tileSize);

  for (int rowIndex = 0; rowIndex < row; ++rowIndex) {
    ArrayList <Tile> newRow = new ArrayList <Tile>();
    for (int colIndex = 0; colIndex < col; ++colIndex) {
      newRow.add(new Tile(rowIndex,colIndex));
    }
    maze.add(newRow);
  }
    
  start = maze.get(0).get(0);
  start.seen = true;
  while (!checkFinished(maze)) {
    
    int[] nextTilePos = checkNeighbors(maze,start.row,start.col);
    if (nextTilePos != null) {
      Tile next = maze.get(nextTilePos[0]).get(nextTilePos[1]);
      next.seen = true;
  
      stack.add(start);
  
      int x = start.row - next.row;
      if (x == 1) {
        start.leftWall = false;
        next.rightWall = false;
      } else if (x == -1) {
        start.rightWall = false;
        next.leftWall = false;
      }
      int y = start.col - next.col;
      if (y == 1) {
        start.topWall = false;
        next.bottomWall = false;
      } else if (y == -1) {
        start.bottomWall = false;
        next.topWall = false;
      }
  
      start = next;
    } else if (stack.size() > 0) {
      start = stack.remove(stack.size()-1);
    }
  }
  
}

void draw() {
  if (finished) {
    background(#AAFFEE);
    fill(#FFAA88);
    f = createFont("Arial",64,true);
    textFont(f);
    textAlign(CENTER);
    text("You win!",width/2,height / 2);
  }
  else {
    showMaze(maze);
    
    if (wPressed && posY > size) {
      boolean foundWall = false;
      for (int xCheck = posX-(size/2); xCheck < (posX+(size/2)); xCheck+=1) {
        for (int yCheck = posY-(size/2); yCheck >= (posY-(size/2))-speed; yCheck-=1) {
          if (get(xCheck,yCheck) == color(255)) {
            foundWall = true;
            break;
          }
        }
      }
      if (!foundWall) {
        posY -= speed;
      }
    }
    if (aPressed && posX > size) {
      boolean foundWall = false;
      for (int yCheck = posY-(size/2); yCheck < (posY+(size/2)); yCheck+=1) {
        for (int xCheck = posX-(size/2); xCheck >= (posX-(size/2))-speed; xCheck-=1) {
          if (get(xCheck,yCheck) == color(255)) {
            foundWall = true;
            break;
          }
        }
      }
      if (!foundWall) {
        posX -= speed;
      }
    }
    if (sPressed && posY < height-size-size/2) {
      boolean foundWall = false;
      for (int xCheck = posX-(size/2); xCheck < (posX+(size/2)); xCheck+=1) {
        for (int yCheck = posY+(size/2); yCheck <= (posY+(size/2))+speed; yCheck+=1) {
          if (get(xCheck,yCheck) == color(255)) {
            foundWall = true;
            break;
          }
        }
      }
      if (!foundWall) {
        posY += speed;
      }
    }
    if (dPressed && posX < height-size-size/2) {
      boolean foundWall = false;
      for (int yCheck = posY-(size/2); yCheck < (posY+(size/2)); yCheck+=1) {
        for (int xCheck = posX+(size/2); xCheck <= (posX+(size/2))+speed; xCheck+=1) {
          if (get(xCheck,yCheck) == color(255)) {
            foundWall = true;
            break;
          }
        }
      }
      if (!foundWall) {
        posX += speed;
      }
    }
    
    if (get(posX,posY) == color(0,255,0)) {
      finished = true;
    }
    
    float deltaX = mouseX-posX;
    float deltaY = mouseY-posY;
    angle = degrees(atan2(deltaY,deltaX));
    //line(posX, posY, (cos(radians(angle+60))*50)+posX, (sin(radians(angle+60))*50)+posY);
    //line(posX, posY, (cos(radians(angle-60))*50)+posX, (sin(radians(angle-60))*50)+posY);
    //fill(255,255,255,100);
    //arc(posX, posY, 100, 100, (radians(angle-60)), (radians(angle+60)));
    
    //hidden.beginDraw();
    s = createShape();
    s.beginShape();
    s.noStroke();
    s.fill(0);
    
    s.vertex(0,0);
    s.vertex(width,0);
    s.vertex(width,height);
    s.vertex(0,height);
    s.vertex(0,0);
    
    s.beginContour();
    s.vertex(posX,posY);
    s.vertex((cos(radians(angle+60))*60)+posX,(sin(radians(angle+60))*60)+posY);
    s.vertex((cos(radians(angle+30))*70)+posX,(sin(radians(angle+30))*70)+posY);
    s.vertex((cos(radians(angle))*80)+posX,(sin(radians(angle))*80)+posY);
    s.vertex((cos(radians(angle-30))*70)+posX,(sin(radians(angle-30))*70)+posY);
    s.vertex((cos(radians(angle-60))*60)+posX,(sin(radians(angle-60))*60)+posY);
    s.vertex(posX,posY);
    s.endContour();
    
    s.endShape(CLOSE);
    shape(s);
    
    fill(0,0,255);
    stroke(255);
    ellipse(posX, posY, size, size);
    
    fill(0,255,0);
    noStroke();
    rect(width-tileSize,height-tileSize,tileSize,tileSize);
  }
}

void keyPressed() {
  if (key == 'w') {
    wPressed = true;
  }
  if (key == 'a') {
    aPressed = true;
  }
  if (key == 's') {
    sPressed = true;
  }
  if (key == 'd') {
    dPressed = true;
  }
}

void keyReleased() {
  if (key == 'w') {
    wPressed = false;
  }
  if (key == 'a') {
    aPressed = false;
  }
  if (key == 's') {
    sPressed = false;
  }
  if (key == 'd') {
    dPressed = false;
  }
}
