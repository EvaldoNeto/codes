//example from https://www.javatpoint.com/jsoup-tutorial
//creating a simple connection

import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class FirstJsoupExample
{
    public static void main(String[] args) throws IOException
    {
	Document doc = Jsoup.connect("http://www.javatpoint.com").get();
	String title = doc.title();
	System.out.println("title is: " + title);
    }
}
