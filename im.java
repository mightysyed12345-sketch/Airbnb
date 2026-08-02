public class Im  {
    public String palindrome(int n)  {
        int t=n;
        int sum=0;
        while(n>0) {
            int d=n%10;
            sum=sum*10+d;
            n/=10;
        }
        if(sum==t)  {
            return "palindrome";
        }else {
            return "not palindrome";
        }
    }
    public static void main(String[] args) {
        System.out.println(new Im().palindrome(121));
    }
}