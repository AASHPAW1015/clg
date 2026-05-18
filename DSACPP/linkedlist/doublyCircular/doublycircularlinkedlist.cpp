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
  node3->next = node1;

  node2->prev = node1;
  node3->prev = node2;
  node1->prev = node3;

  cout << "Forward (10 steps): ";
  Node *temp = node1;
  for (int i = 0; i < 10; i++) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }
  cout << "..." << endl;

  cout << "Backward (10 steps): ";
  temp = node1;
  for (int i = 0; i < 10; i++) {
    cout << temp->data << " -> ";
    temp = temp->prev;
  }
  cout << "..." << endl;

  return 0;
}
