#include <iostream>
using namespace std;

class Node {
public:
  int data;
  Node *next;
  Node *prev;

  Node(int data) {
    this->data = data;
    this->next = nullptr;
    this->prev = nullptr;
  }
};

int main() {
  Node *node1 = new Node(10);
  Node *node2 = new Node(20);
  Node *node3 = new Node(30);

  node1->next = node2;
  node2->next = node3;

  node2->prev = node1;
  node3->prev = node2;

  cout << "Forward: ";
  Node *temp = node1;
  while (temp != nullptr) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }
  cout << "None" << endl;

  cout << "Backward: ";
  temp = node3;
  while (temp != nullptr) {
    cout << temp->data << " -> ";
    temp = temp->prev;
  }
  cout << "None" << endl;

  delete node1;
  delete node2;
  delete node3;

  return 0;
}
