Linux Set-up
====================

Download from:
https://drive.google.com/folderview?id=0BzudLt22BqGRWEtNeEQ5UW9MaG8&usp=sharing&tid=0BzudLt22BqGRbW9WTHMtOWMzNjQ#list

Getting the sandbox:

Download depot_tools from chromium repo

follow instructions to add them to your path


to build sandobx:

run fetch --nohooks --no-history chromium

build/install-build-deps.sh

gclient runhooks

ninja -C out/Debug chrome chrome-sandbox

build/update-linux-sandbox.sh


Now unzip the file downloaded from google docs

and run chrome using ./chrome

this 'should' (trademark) work
