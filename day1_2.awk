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

    if (floors < 0) {
      print i
      break
    }
  }
}

END {
  print floors
}
