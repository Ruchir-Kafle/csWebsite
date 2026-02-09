import java.util.ArrayList;

public class levelUp {

    public static void problemTwo() {
        int previousfibonacciTerm = 1; 
        int currentfibonacciTerm = 1; 
        int sum = 0;
        
        while (currentfibonacciTerm < 4_000_000) {
            int temp = previousfibonacciTerm;

            previousfibonacciTerm = currentfibonacciTerm;
            currentfibonacciTerm += temp;

            if (currentfibonacciTerm % 2 == 0) {
                sum += currentfibonacciTerm;
            }
        }

        System.out.println(sum);

    }


    public static void main(String[] args) {
        
        problemTwo();
        
    }
    
}
