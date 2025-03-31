public class Multiplier {
    public static void main(String[] args) {
        if (args.length > 0) {
            try {
                int num = Integer.parseInt(args[0]);
                int result = num * 10;
                System.out.println(result);
            } catch (NumberFormatException e) {
                System.out.println("Invalid number format");
            }
        } else {
            System.out.println("Please provide a number as an argument");
        }
    }
}
