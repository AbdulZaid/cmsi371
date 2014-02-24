public class Die {
    //create private variables.
    private int faceValue;
    private int numOfFaces;
    //consturctor for a single die with sides numbered. 1,2,...,n
    public Die (int nSides) {
        setValue(nSides);
        roll();
        value();
    }
    
    public void roll() {
        faceValue = ((int)(Math.random()*faceValue))+1;
        
    }
    
    public int value() {
        return faceValue;
    }
    public void setValue(int k) {
        faceValue = k;
    }
    
    public static void main (String [] args) {
        int numberOfSides = Integer.parseInt(args[0]);
        if(numberOfSides <= 0) {
            System.out.println("Choose another value > 0");
        }
        else {
        Die tester = new Die(numberOfSides);
        int result = tester.value();
        System.out.println(result);
        }
    }
}