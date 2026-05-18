#include <iostream>
using namespace std;

class Node {
public:
  int data;
  Node *next;
  Node(int value) {
    data = value;
    next = nullptr;
  }
};

int main() {
  Node *head = new Node(5);
  Node *second = new Node(10);
  Node *third = new Node(15);
  Node *fourth = new Node(20);
  Node *fifth = new Node(25);

  head->next = second;
  second->next = third;
  third->next = fourth;
  fourth->next = fifth;

  // Delete first node
  Node *tempDelete = head;
  head = head->next;
  delete tempDelete;

  Node *temp = head;
  cout << "After deleting the first node: ";
  while (temp != NULL) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }
  cout << "NULL" << endl;

  // Delete last node
  temp = head;
  while (temp->next->next != NULL) {
    temp = temp->next;
  }
  delete temp->next;
  temp->next = NULL;

  temp = head;
  cout << "After deleting the last node: ";
  while (temp != NULL) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }
  cout << "NULL" << endl;

  // Delete specific node (let's delete node with value 15)
  temp = head;
  while (temp->next != NULL && temp->next->data != 15) {
    temp = temp->next;
  }
  if (temp->next != NULL) {
    Node *deleteNode = temp->next;
    temp->next = temp->next->next;
    delete deleteNode;
  }

  temp = head;
  cout << "After deleting specific node: ";
  while (temp != NULL) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }
  cout << "NULL" << endl;

  return 0;
}
