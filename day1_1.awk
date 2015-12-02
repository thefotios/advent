BEGIN {
  FS = ""
}

{
  for (i = 1; i <= NF; i++) {
    if ($i ~ /\(/) {
      floors++
    } else {
      floors--
    }
  }
}

END { 
  print floors
}
