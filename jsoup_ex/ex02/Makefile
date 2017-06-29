JC = javac

SRCS = JsoupPrintTitleFromHtml.java

CLASS = $(SRCS:.java=.class)

FLAGS = -cp

LIBS = /home/biga/codes/java_libs/jsoup-1.10.2.jar

all: main

main:
	$(JC) $(FLAGS) $(LIBS) $(SRCS)

exe:
	java -cp .:$(LIBS) JsoupPrintTitleFromHtml

clean:
	@/bin/rm -f *~ *#

fclean:
	@/bin/rm -f $(CLASS)

re: 	clean all
