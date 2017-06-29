JC = javac

JFLAGS = -cp

SRCS = FirstJsoupExample.java

LIB = ~/codes/java_libs/jsoup-1.10.2

CLASS = $(SRCS:.java=.class)

all: main

main:
	$(JC) $(JFLAGS) $(LIB) $(SRCS)

clean:
	@/bin/rm -f *~ *#

fclean:
	@/bin/rm -f $(CLASS)

re: 	clean all

exe:
	java -cp .:/home/biga/codes/java_libs/jsoup-1.10.2 FirstJsoupExample
