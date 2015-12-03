BEGIN {
  FS = ""
  x = 0
  y = 0
}

{
  houses[x " " y]++
  for (i = 1; i <= NF; i++) {
    switch($i) {
      case "^":
        y++
        break
      case "v":
        y--
        break
      case ">":
        x++
        break
      case "<":
        x--
        break
    }
    houses[x " " y]++
  }
}

END {
  num_houses=0
  for(key in houses) {
    num_houses++
  }
  print num_houses
}
