#include <iostream>
using namespace std;

// Node structure
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
  Node *second = new Node(20);
  Node *third = new Node(30);

  // Linking nodes
  head->next = second;
  second->next = third;

  Node *temp = head;

  // Move to second last node
  while (temp->next->next != NULL) {
    temp = temp->next;
  }

  // Delete last node
  delete temp->next;
  temp->next = NULL;

  // Traversal
  temp = head;

  while (temp != NULL) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }

  return 0;
}
