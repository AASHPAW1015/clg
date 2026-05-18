#include <iostream>
using namespace std;

class Node {
public:
  int data;
  Node *next;

  Node(int data) {
    this->data = data;
    this->next = nullptr;
  }
};

int main() {
  Node *node1 = new Node(10);
  Node *node2 = new Node(20);
  Node *node3 = new Node(30);

  node1->next = node2;
  node2->next = node3;
  node3->next = node1;

  Node *temp = node1;
  int count = 0;
  while (count < 10) { // Stop after 10 iterations
    cout << temp->data << " -> ";
    temp = temp->next;
    count++;
  }
  cout << "..." << endl;

  delete node1;
  delete node2;
  delete node3;

  return 0;
}
