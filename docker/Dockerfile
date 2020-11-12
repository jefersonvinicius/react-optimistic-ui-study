FROM golang:1.14

ADD ./ /go/src/todolist 

WORKDIR /go/src/todolist

RUN ls .

RUN go mod download

RUN go build -o todolist main.go

RUN ls .

CMD ["/go/src/todolist/todolist"]