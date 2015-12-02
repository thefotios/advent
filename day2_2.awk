# for i in $(cat day2.txt); do echo "$i" | awk -Fx -f day2_2.awk; done | paste -sd+ | bc
BEGIN {
  max = 0;
  volume = 1;
}

{
  for(i = 1; i <= NF; i++) {
    side = $i
    volume *= side;

    if(max == 1 || side > max) {
      max = side;
    }
  }
}

END {
  printf "((2*%d + 2*%d + 2*%d - 2*%d) + %d)\n",$1,$2,$3,max,volume
}
