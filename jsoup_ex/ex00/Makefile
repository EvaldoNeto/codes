JC = javac

SRCS = test.java

CLASS = $(SRCS:.java=.class)

all: main

main:
	$(JC) $(SRCS)

clean:
	@/bin/rm -f *~ *#

fclean:
	@/bin/rm -f $(CLASS)

re: 	clean all	

