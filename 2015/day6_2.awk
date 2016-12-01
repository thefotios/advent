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

  #printf "LINE: %s (%d, %d), (%d, %d)\n", action, x1, y1, x2, y2

  for(x = x1; x <= x2; x++) {
    for(y = y1; y <= y2; y++) {
      val=lights[x][y]
      if(action == "turn off") {
        if(val > 0) {
          val--
        }
      } else if(action == "turn on") {
        val++
      } else {
        val+=2
      }
      lights[x][y]=val
    }
  }
}

END {
  for(x = 0; x <= max_x; x++) {
    for(y = 0; y <= max_y; y++) {
      #printf "%3s ", lights[x][y]
      sum+=lights[x][y]
    }
    #print "\n"
  }
  print sum
}
