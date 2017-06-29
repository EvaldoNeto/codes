JC = javac

FLAGS = -cp

SRCS = JsoupPrintLinks.java

CLASS = $(SRCS:.java=.class)

LIBS = /home/biga/codes/java_libs/jsoup-1.10.2.jar

all: main

main:
	$(JC) $(FLAGS) $(LIBS) $(SRCS)

exe:
	java -cp .:$(LIBS) JsoupPrintLinks

clean:
	@/bin/rm -f *~ *#

fclean:
	@/bin/rm -f $(CLASS)

re: 	clean all
