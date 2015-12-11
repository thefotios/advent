BEGIN {
  max_x=0
  max_y=0
  lights[0][0] = 0
}

match($0, /(.*?) ([[:digit:]]{1,3}),([[:digit:]]{1,3}) through ([[:digit:]]{1,3}),([[:digit:]]{1,3})/, ary) {
  action=ary[1]
  x1=ary[2]
  y1=ary[3]
  x2=ary[4]
  y2=ary[5]

  max_x=(x2>max_x)?x2:max_x
  max_y=(y2>max_y)?y2:max_y

  for(x = x1; x <= x2; x++) {
    for(y = y1; y <= y2; y++) {
      if(action == "turn off") {
        new_val=0
      } else if(action == "turn on") {
        new_val=1
      } else {
        new_val=!lights[x][y]
      }
      lights[x][y]=new_val
    }
  }
}

END {
  for(x = 0; x <= max_x; x++) {
    for(y = 0; y <= max_y; y++) {
      sum+=lights[x][y]
    }
  }
  print sum
}
