#!/usr/bin/env bash
# bash day4_1.sh ckczppom 000000 3938036 3938039
BASE=$1
pattern=${2:-000000}
i=${3:-0}
limit=${4:-10}

run_md5() {
	echo -n "${BASE}${i}" | md5sum -
}

until [[ $md5 == ${pattern}* ]] || [ $i -gt $limit ]; do
	md5=$(run_md5)
	echo "${i} ${md5}";
	((i++))
done
