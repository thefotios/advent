#!/usr/bin/env bash

FILE=$1
chars=$(\
# Replace all trailing newlines
sed ':a;N;$!ba;s/\n//g' ${FILE} | \
# Count chars
wc -c \
)

# Remove the last new line from the count
strChars=$[$chars - 1]

LINES=$(< ${FILE})

memChars=0
for line in $LINES; do
  # echo $line

  escapeRE='\\[^x]'
  escaped=$(echo "${line}" | grep -oE "${escapeRE}" | wc -l)
  # printf "  Escaped %s\n" $escaped
  line=$(echo "${line}" | sed "s;${escapeRE};;g")

  hexRE='\\x[[:xdigit:]]{2}'
  hex=$(echo "${line}" | grep -oE "${hexRE}" | wc -l)
  # printf "  Hex %s\n" $hex
  line=$(echo "${line}" | sed 's;\\x[[:xdigit:]]\{2\};;g')

  total=$[$(echo "${line}" | wc -c)-3]
  # printf "  Total %s\n" $total

  evaluated=$[$total + $hex + $escaped]
  #printf "  Evaluated %s\n" $evaluated
  #echo
  memChars=$[$evaluated + $memChars]
done

echo $[$strChars-$memChars]
