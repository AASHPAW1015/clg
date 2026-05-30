#include <iostream>
using namespace std;

class Node {
public:
  int data;
  Node *left;
  Node *right;
  Node(int value) {
    data = value;
    left = NULL;
    right = NULL;
  }
};

Node *insert(Node *root, int value) {
  if (root == NULL) {
    return new Node(value);
  }
  if (value < root->data) {
    root->left = insert(root->left, value);
  } else {
    root->right = insert(root->right, value);
  }
  return root;
}

int height(Node *root) {
  if (root == NULL)
    return 0;
  int leftheight = height(root->left);
  int rightheight = height(root->right);
  if (leftheight > rightheight) {
    return leftheight + 1;
  } else {
    return rightheight + 1;
  }
}

Node *findMin(Node *root) {
  while (root->left != NULL) {
    root = root->left;
  }
  return root;
}

Node *findMax(Node *root) {
  while (root->right != NULL) {
    root = root->right;
  }
  return root;
}

Node *deleteNode(Node *root, int key) {
  if (root == NULL)
    return NULL;

  if (key < root->data) {
    root->left = deleteNode(root->left, key);
  } else if (key > root->data) {
    root->right = deleteNode(root->right, key);
  } else {
    // Node found!

    // Case 1: No children
    if (root->left == NULL && root->right == NULL) {
      delete root;
      return NULL;
    }

    // Case 2: One child
    if (root->left == NULL) {
      Node *temp = root->right;
      delete root;
      return temp;
    }
    if (root->right == NULL) {
      Node *temp = root->left;
      delete root;
      return temp;
    }

    // Case 3: Two children - height based selection
    int leftheight = height(root->left);
    int rightheight = height(root->right);

    if (leftheight > rightheight) {
      // Left is taller: use predecessor
      Node *predecessor = findMax(root->left);
      root->data = predecessor->data;
      root->left = deleteNode(root->left, predecessor->data);
    } else {
      // Right is taller or equal: use successor
      Node *successor = findMin(root->right);
      root->data = successor->data;
      root->right = deleteNode(root->right, successor->data);
    }
  }
  return root;
}

void inorder(Node *root) {
  if (root == NULL)
    return;
  inorder(root->left);
  cout << root->data << " ";
  inorder(root->right);
}

int main() {
  Node *root = NULL;
  root = insert(root, 50);
  insert(root, 30);
  insert(root, 70);
  insert(root, 20);
  insert(root, 40);
  insert(root, 60);
  insert(root, 80);
  insert(root, 10);
  insert(root, 35);
  insert(root, 45);

  cout << "Inorder Traversal: ";
  inorder(root);
  cout << endl;

  cout << "Deleting 30..." << endl;
  root = deleteNode(root, 30);

  cout << "Inorder Traversal: ";
  inorder(root);
  cout << endl;

  return 0;
}
