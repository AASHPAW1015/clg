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

// Print the linked list
void printList(Node *head) {
  Node *temp = head;
  while (temp != NULL) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }
  cout << "NULL" << endl;
}

// 1. INSERT AT START
Node *insertAtStart(Node *head, int value) {
  Node *newNode = new Node(value);
  newNode->next = head;
  head = newNode;
  return head;
}

// 2. INSERT AT END
Node *insertAtEnd(Node *head, int value) {
  Node *newNode = new Node(value);

  if (head == NULL) {
    return newNode;
  }

  Node *temp = head;
  while (temp->next != NULL) {
    temp = temp->next;
  }
  temp->next = newNode;
  return head;
}

// 3. INSERT AT POSITION
Node *insertAtPosition(Node *head, int value, int position) {
  Node *newNode = new Node(value);

  if (position == 1) {
    newNode->next = head;
    return newNode;
  }

  Node *temp = head;
  for (int i = 1; i < position - 1 && temp != NULL; i++) {
    temp = temp->next;
  }

  if (temp == NULL) {
    cout << "Invalid position!" << endl;
    delete newNode;
    return head;
  }

  newNode->next = temp->next;
  temp->next = newNode;
  return head;
}

int main() {
  // Create initial list: 5 -> 10 -> 15 -> NULL
  Node *head = new Node(5);
  head->next = new Node(10);
  head->next->next = new Node(15);

  cout << "Original list: ";
  printList(head);

  // Insert at start
  head = insertAtStart(head, 1);
  cout << "After insert at start (1): ";
  printList(head);

  // Insert at end
  head = insertAtEnd(head, 20);
  cout << "After insert at end (20): ";
  printList(head);

  // Insert at position 3
  head = insertAtPosition(head, 7, 3);
  cout << "After insert at position 3 (7): ";
  printList(head);

  return 0;
}
