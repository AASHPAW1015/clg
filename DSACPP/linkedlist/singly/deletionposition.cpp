#include <iostream>
using namespace std;

class Node {
public:
  int data;
  Node *next;

  // Constructor
  Node(int value) {
    data = value;
    next = NULL;
  }
};

int main() {

  // Creating nodes
  Node *head = new Node(10);
  Node *second = new Node(30);
  Node *third = new Node(40);

  // Linking nodes
  head->next = second;
  second->next = third;

  // Delete middle node (30)
  Node *temp = head;

  temp->next = third;

  delete second;

  // Traversal
  temp = head;

  while (temp != NULL) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }

  cout << "None";

  return 0;
}
