JC = -javac

FLAGS = -cp

LIBS = /home/biga/codes/java_libs/jsoup-1.10.2.jar

SRCS = JsoupPrintImages.java

CLASS = $(SRCS:.java=.class)

all: main

main:
	$(JC) $(FLAGS) $(LIBS) $(SRCS)

exe:
	java -cp .:$(LIBS) JsoupPrintImages

clean:
	@/bin/rm -f *~ *#

fclean:
	@/bin/rm -f $(CLASS)

re: 	clean all
