#!/usr/bin/env bash
REPEAT='([a-z])\1'
VOWELS='[aeiou].*[aeiou].*[aeiou]'
IGNORE='(ab|cd|pq|xy)'

grep -E "${REPEAT}" | grep -E "${VOWELS}" | grep -Ev "${IGNORE}"
