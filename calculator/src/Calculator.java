import java.util.*;

public class Calculator {

    private List<Character> DELIMITER = new ArrayList<>();
    private List<Character> FORBIDDEN = Arrays.asList('-');
    private List<String> DEL = new ArrayList<>();

    public int Add(String numbers){
        List<Integer> indexes;
        List<Integer> intList = new Vector<>();
        Integer aux;

        numbers = SetDelimiter(numbers);
        if(numbers.length() == 0)
            return 0;
        if(indexOfPluses(numbers).isEmpty())
            return Integer.parseInt(numbers);

        indexes = indexOfPluses(numbers);
        if(numbers.charAt(0) != '-' && numbers.charAt(0) != '+') {
            aux = Integer.parseInt(numbers.substring(0, indexes.get(0)));
            if(aux > 1000)
                aux = 0;
            intList.add(aux);
        }

        for(int i = 0; i < indexes.size() - 1; i++){
            aux = Integer.parseInt(numbers.substring(indexes.get(i) + 1, indexes.get(i + 1)));
            if(aux > 1000 && numbers.charAt(indexes.get(i)) != '-')
                aux = 0;
            intList.add(aux);
            if(numbers.charAt(indexes.get(i)) == '-')
                System.out.println(aux);
        }
        aux = Integer.parseInt(numbers.substring(indexes.get(indexes.size() - 1) + 1, numbers.length()));
        if(aux > 1000 && numbers.charAt(indexes.get(indexes.size() - 1)) != '-')
            aux = 0;
        intList.add(aux);
        if(numbers.charAt(indexes.get(indexes.size() - 1)) == '-')
            System.out.println(aux);

        if(checkForbidden(numbers))
            return 0;

        return sumList(intList);
    }

    public List<Integer> indexOfPluses(String numbers){
        List<Integer> indexes = new Vector<>();

        for(int i = 0; i < numbers.length(); i++){
            if(DELIMITER.contains(numbers.charAt(i)))
                indexes.add(i);
        }

        return indexes;
    }

    public int sumList(List<Integer> lst){
        int sum;

        sum = 0;
        for(Integer x : lst)
            sum += x;
        return sum;
    }

    public String SetDelimiter(String numbers){
        if(!numbers.contains("//")){
            DELIMITER.add('+');
            DELIMITER.add('\n');
            DELIMITER.add(',');
            DELIMITER.add('-');
            return numbers;
        } else {
            DELIMITER.add(numbers.charAt(2));
            if(numbers.charAt(3) == '['){

            }
            numbers = numbers.substring(4);
            return numbers;
        }
    }

    public Boolean checkForbidden(String numbers){
        if(numbers.contains("-"))
            return Boolean.TRUE;
        return Boolean.FALSE;
    }
}
