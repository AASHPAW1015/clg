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

//  INSERTION

Node *insertAtBeginning(Node *head, int data) {
  Node *newNode = new Node(data);
  newNode->next = head;
  return newNode;
}

Node *insertAtEnd(Node *head, int data) {
  Node *newNode = new Node(data);

  if (head == nullptr) {
    return newNode;
  }

  Node *temp = head;
  while (temp->next != nullptr) {
    temp = temp->next;
  }
  temp->next = newNode;
  return head;
}

Node *insertAtPosition(Node *head, int data, int position) {
  if (position == 1) {
    return insertAtBeginning(head, data);
  }

  Node *newNode = new Node(data);
  Node *temp = head;

  for (int i = 1; i < position - 1 && temp != nullptr; i++) {
    temp = temp->next;
  }

  if (temp == nullptr) {
    cout << "Position out of range!" << endl;
    delete newNode;
    return head;
  }

  newNode->next = temp->next;
  temp->next = newNode;
  return head;
}

//  DELETION

Node *deleteFromBeginning(Node *head) {
  if (head == nullptr) {
    cout << "List is empty!" << endl;
    return nullptr;
  }

  Node *temp = head;
  head = head->next;
  delete temp;
  return head;
}

Node *deleteFromEnd(Node *head) {
  if (head == nullptr) {
    cout << "List is empty!" << endl;
    return nullptr;
  }

  if (head->next == nullptr) { // Only one node
    delete head;
    return nullptr;
  }

  Node *temp = head;
  while (temp->next->next != nullptr) {
    temp = temp->next; // Go to second last node
  }

  delete temp->next;
  temp->next = nullptr;
  return head;
}

Node *deleteAtPosition(Node *head, int position) {
  if (head == nullptr) {
    cout << "List is empty!" << endl;
    return nullptr;
  }

  if (position == 1) {
    return deleteFromBeginning(head);
  }

  Node *temp = head;
  for (int i = 1; i < position - 1 && temp != nullptr; i++) {
    temp = temp->next;
  }

  if (temp == nullptr || temp->next == nullptr) {
    cout << "Position out of range!" << endl;
    return head;
  }

  Node *toDelete = temp->next;
  temp->next = temp->next->next;
  delete toDelete;
  return head;
}

Node *deleteByValue(Node *head, int value) {
  if (head == nullptr) {
    cout << "List is empty!" << endl;
    return nullptr;
  }

  if (head->data == value) { // If head has the value
    Node *temp = head;
    head = head->next;
    delete temp;
    return head;
  }

  Node *temp = head;
  while (temp->next != nullptr && temp->next->data != value) {
    temp = temp->next;
  }

  if (temp->next == nullptr) {
    cout << "Value not found!" << endl;
    return head;
  }

  Node *toDelete = temp->next;
  temp->next = temp->next->next;
  delete toDelete;
  return head;
}

//  UPDATE

void updateAtPosition(Node *head, int position, int newData) {
  Node *temp = head;

  for (int i = 1; i < position && temp != nullptr; i++) {
    temp = temp->next;
  }

  if (temp == nullptr) {
    cout << "Position out of range!" << endl;
  } else {
    temp->data = newData;
    cout << "Updated position " << position << " to " << newData << endl;
  }
}

void updateByValue(Node *head, int oldValue, int newValue) {
  Node *temp = head;

  while (temp != nullptr && temp->data != oldValue) {
    temp = temp->next;
  }

  if (temp == nullptr) {
    cout << "Value not found!" << endl;
  } else {
    temp->data = newValue;
    cout << "Updated " << oldValue << " to " << newValue << endl;
  }
}

//  DISPLAY

void display(Node *head) {
  if (head == nullptr) {
    cout << "List is empty!" << endl;
    return;
  }

  Node *temp = head;
  while (temp != nullptr) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }
  cout << "nullptr" << endl;
}

//  MAIN

int main() {
  Node *head = nullptr;

  // Insertions
  cout << "=== INSERTIONS ===" << endl;
  head = insertAtEnd(head, 10);
  head = insertAtEnd(head, 20);
  head = insertAtEnd(head, 30);
  display(head); // 10 -> 20 -> 30

  head = insertAtBeginning(head, 5);
  display(head); // 5 -> 10 -> 20 -> 30

  head = insertAtPosition(head, 15, 3);
  display(head); // 5 -> 10 -> 15 -> 20 -> 30

  // Updates
  cout << "\n=== UPDATES ===" << endl;
  updateAtPosition(head, 2, 99);
  display(head); // 5 -> 99 -> 15 -> 20 -> 30

  updateByValue(head, 15, 100);
  display(head); // 5 -> 99 -> 100 -> 20 -> 30

  // Deletions
  cout << "\n=== DELETIONS ===" << endl;
  head = deleteFromBeginning(head);
  display(head); // 99 -> 100 -> 20 -> 30

  head = deleteFromEnd(head);
  display(head); // 99 -> 100 -> 20

  head = deleteAtPosition(head, 2);
  display(head); // 99 -> 20

  head = deleteByValue(head, 99);
  display(head); // 20

  return 0;
}
