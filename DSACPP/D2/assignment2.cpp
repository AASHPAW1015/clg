#include <iostream>
#include <string>
using namespace std;

struct Data {
  int studentID;
  string name;
};

class Node {
public:
  Data data;
  Node *next;

  Node(Data dataN) {
    this->data = dataN;
    this->next = nullptr;
  }
};

Node *createNode(Data data) {
  Node *newnode = new Node(data);
  return newnode;
}

string garbageCollect(Node *head) {
  Node *temp = head;
  Node *temppt;

  if (head->next == nullptr) {
    delete temp;
    return "The head was deleted, the only node in the linked list was the "
           "head.";
  }
  while (temp->next != nullptr) {
    temp->next = temppt;
    delete temp;
    temp = temppt;
  }
  delete temp;
  return "The linked list was removed from the computer's memory!";
}

Node *insertBeginning(Node *head, Data data) {
  Node *newnode = createNode(data);
  newnode->next = head;
  return newnode;
}

Node *insertEnd(Node *head, Data data) {
  Node *newnode = createNode(data);
  if (head->next == nullptr) {
    return newnode;
  }
  Node *temp = head;
  while (temp->next != nullptr) {
    temp = temp->next;
  }
  temp->next = newnode;
  return head;
}

Node *insertPosition(Node *head, Data data, int position) {
  Node *newnode = createNode(data);
  Node *temp = head;
  Node *atposition = head;
  for (int i = 0; i <= position;
       i++) { // !wont be <= because we are processing using the node before the
              // "current" position! but then the != wont work, we anyways have
              // the previous one at temp, perfect
    if (temp->next == nullptr) {
      cout << "Out of bounds!!!" << endl;
      return head;
      break;
    }
    if (i != position) {
      temp = temp->next;
    } else {
      temp = temp->next;
      newnode->next = temp;
      temp->next = newnode;
      return head;
    }
  }
}
// TODO insertPosition

Node *deleteID(Node *head) {}

int main() {
  Data info;

  cout << "Please input the student ID";
  cin >> info.studentID;

  cout << "Please input the name of the studnet";
  cin >> info.name;

  Node *head = nullptr;
  Node a = insertBeginning(head, data);

  for (Data i : a) {
  }
}
