#!/bin/bash

if [ $0 != './scripts/generateListOfPages.sh' ] && [ $0 != 'scripts/generateListOfPages.sh' ]
then
    echo '==== Error ===='
    echo 'This script has to be executed from project root folder!'
    exit 1
fi

echo 'Started to generate the list of pages for d3 folder ...'

cd pages

# set the column at the first line.
echo 'page_path' > ../static/pages-list.csv

find d3/ -name '*.vue' >> ../static/pages-list.csv

echo 'List of pages is stored in file:'
echo 'static/pages-list.csv'
