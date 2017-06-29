JC = javac

FLAGS = -cp

SRCS = JsoupPrintMetadata.java

CLASS = $(SRCS:.java=.class)

LIBS = /home/biga/codes/java_libs/jsoup-1.10.2.jar

all: main

main:
	$(JC) $(FLAGS) $(LIBS) $(SRCS)

exe:
	java -cp .:$(LIBS) JsoupPrintMetadata

clean:
	@/bin/rm -f *~ *#

fclean:
	@/bin/rm -f $(CLASS)

re: 	clean all
