#include <climits>
#include <iostream>
#include <vector>
using namespace std;

const int INF = INT_MAX;

// Adjacency matrix for 5 nodes (0-4)
int graph[5][5] = {{0, 4, 0, 0, 0},
                   {4, 0, 8, 0, 0},
                   {0, 8, 0, 7, 9},
                   {0, 0, 7, 0, 5},
                   {0, 0, 9, 5, 0}};

// Function to find minimum distance node not yet processed
int minDistance(vector<int> dist, bool visited[], int V) {
  int min = INF, min_index = -1;
  for (int v = 0; v < V; v++) {
    if (!visited[v] && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  }
  return min_index;
}

// Function to print result
void printSolution(vector<int> dist) {
  cout << "Node \t Distance from Source" << endl;
  for (int i = 0; i < 5; i++) {
    cout << i << "\t\t " << dist[i] << endl;
  }
}

void dijkstra(int src, int V) {
  vector<int> dist(V, INF);
  bool visited[5];

  for (int i = 0; i < V; i++)
    visited[i] = false;

  dist[src] = 0;

  for (int count = 0; count < V; count++) {
    int u = minDistance(dist, visited, V);

    if (u == -1)
      break;

    visited[u] = true;

    for (int v = 0; v < V; v++) {
      if (!visited[v] && graph[u][v] != 0 && dist[u] != INF) {
        if (dist[u] + graph[u][v] < dist[v]) {
          dist[v] = dist[u] + graph[u][v];
        }
      }
    }
  }

  printSolution(dist);
}

int main() {
  int src = 0; // Source node
  cout << "Dijkstra's Algorithm - Shortest Path from Node " << src << endl;
  dijkstra(src, 5);
  return 0;
}
