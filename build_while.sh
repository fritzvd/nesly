#!/bin/sh

echo "rm .nes"
rm while.nes

echo "make asm"
./bin/nesly examples/test-while.js examples/while.s

echo "make nes rom"
node ./node_modules/nesly-assembler/cli ./examples/while.s while.nes

echo "run the motherfucker"
nes while.nes
