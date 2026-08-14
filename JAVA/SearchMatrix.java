public class SearchMatrix {
  public static void main(String[] args) {
    int [][] matrix = {
      {10,20,30},
      {40,50,60},
      {70,80,90}
    };

    int search = 50;
    boolean found = false;

    for (int i = 0; i < matrix.length;i++){
      for (int j = 0; j < matrix[i].length;j++){
        if (matrix[i][j] == search) {
          System.out.println("found at row " + i + ", column " + j);
          found = true;
          break;
        }
      }
      if (found){
        break;
      }
    }
    if (!found) {
      System.out.println("number not found!!!");
    }
  }
}
