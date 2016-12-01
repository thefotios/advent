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
  echo $line
  printf "%b\n" $line
  escaped=$(printf "%q" $line)
  numChars=$(echo -n "$escaped" | wc -c)
  memChars=$[$memChars + $numChars + 2]
done

echo $[$memChars-$strChars]
