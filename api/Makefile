
.PHONY: clean build deploy dev trans reg cleanfc

deploy: clean build
	sls --debug

trans: clean build
	sls --debug -n ChatTransGO

reg: clean build
	sls --debug -n ChatRegGO

cleanfc: clean build
	sls --debug -n ChatCleanGO

build:
	GOOS=linux GOARCH=amd64 go build -o ./bin/reg/reg ./reg/
	GOOS=linux GOARCH=amd64 go build -o ./bin/trans/trans ./trans/
	GOOS=linux GOARCH=amd64 go build -o ./bin/clean/clean ./clean/


clean:
	rm -rf ./bin/reg
	rm -rf ./bin/trans
	rm -rf ./bin/clean


