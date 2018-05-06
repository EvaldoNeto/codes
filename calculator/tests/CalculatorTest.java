import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class CalculatorTest {

    Calculator calc;

    @Before
    public void setUp() throws Exception {
        calc = new Calculator();
    }

    @Test
    public  void testAdd(){
        assertEquals(42, calc.Add("10+32"));
        assertEquals(42, calc.Add("10\n11\n12\n9"));
        assertEquals(42, calc.Add("10,11,12,9"));
        assertEquals(0, calc.Add(""));
        assertEquals(42, calc.Add("42"));
        assertEquals(42, calc.Add("10+11,12\n9+1001"));
        assertEquals(17,calc.Add("//;\n1;3;6;7"));
        assertEquals(0,calc.Add("1+2-2+5-4-7+10-8000-9"));
        assertEquals(0,calc.Add("-1+3+5"));

    }
}