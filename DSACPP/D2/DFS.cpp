#include <iostream>
#include <vector>
using namespace std;

void DFS(int node, vector<vector<int>> &adj, vector<bool> visited) {
  visited[node] = true;
  cout << node << " ";

  for (int neighbour : adj[node]) {
    if (!visited[neighbour]) {
    }
  }
}
