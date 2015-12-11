#!/usr/bin/env bash
REPEAT='(?<group>[a-z]{2}).*(?P=group)'
SKIP='([a-z]).\1'

grep -P "${REPEAT}" | grep -E "${SKIP}"
