#include <cstring>
#include <iostream>
using namespace std;

class Node {
public:
  int index;
  char letter;
  Node *left;
  Node *right;
  Node(int i, char c) {
    index = i;
    letter = c;
    left = NULL;
    right = NULL;
  }
};

//  BST insert with index
Node *insert(Node *root, int index, char letter) {
  if (root == NULL) {
    return new Node(index, letter);
  }
  if (index < root->index) {
    root->left = insert(root->left, index, letter);
  } else {
    root->right = insert(root->right, index, letter);
  }
  return root;
}

// middle-first
void buildBalanced(Node *&root, const char *str, int low, int high) {
  if (low > high)
    return;
  int mid = (low + high) / 2;
  root = insert(root, mid, str[mid]);      // insert middle first
  buildBalanced(root, str, low, mid - 1);  // then left half
  buildBalanced(root, str, mid + 1, high); // then right half
}

void inorder(Node *root) {
  if (root == NULL)
    return;
  inorder(root->left);
  cout << root->letter; // print the character
  inorder(root->right);
}

int main() {
  const char *text = "hello world";
  int len = strlen(text);

  Node *root = NULL;
  buildBalanced(root, text, 0, len - 1);

  cout << "Printing via inorder traversal: ";
  inorder(root);
  cout << endl;

  return 0;
}
