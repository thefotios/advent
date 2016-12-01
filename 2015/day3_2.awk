BEGIN {
  FS = ""
  x[0] = 0
  y[0] = 0
  x[1] = 0
  y[1] = 0
}

{
  houses[x[0] " " y[0]]++
  for (i = 1; i <= NF; i++) {
    person= i % 2
    switch($i) {
      case "^":
        y[person]++
        break
      case "v":
        y[person]--
        break
      case ">":
        x[person]++
        break
      case "<":
        x[person]--
        break
    }
    houses[x[person] " " y[person]]++
  }
}

END {
  num_houses=0
  for(key in houses) {
    num_houses++
  }
  print num_houses
}
