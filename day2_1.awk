# for i in $(cat day2.txt); do echo "$i" | awk -Fx -f day2_1.awk; done | paste -sd+ | bc
BEGIN {
  min = 0;
  total = 0;
}

{
  for(i = 1; i <= NF; i++) {
    side2 = i+1;
    if (side2 > NF) {
      side2 = 1;
    }
    side = $i * $side2
    sides[i] = side

    if(min == 0 || side < min) {
      min = side;
    }
  }
}

END {
  printf "(%d", min
  for(i = 1; i <= NF; i++) {
    printf "+(2*%d)",sides[i];
  }
  print ")"
}
