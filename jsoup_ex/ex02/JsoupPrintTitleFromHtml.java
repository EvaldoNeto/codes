//example from https://www.javatpoint.com/jsoup-example-print-title-from-html-file

//to make it work you gotta create an html file in the same directory as your source
//i created basics.html to text the example

import java.io.File;
import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class JsoupPrintTitleFromHtml
{
    public static void main (String[] args) throws IOException
    {
	Document doc = Jsoup.parse(new File("basics.html"), "UTF-8");
	String title = doc.title();
	System.out.println("title is: " + title);
    }
}
