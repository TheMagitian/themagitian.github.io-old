---
title: Activity selection, backtracking, string matching, convex hull
published: 2024-01-21
description: Code for Algorithms problems
tags: [Algorithms, DAA]
keywords: [Algorithms, C++]
category: Algorithms
draft: false
---

# Activity Selection sorting - recursive

Given a set 'S' of 'n' activities, implement the recursive greedy algo to select a subset of activities from S by selecting the task that finishes first. Sort them in ascending order based on finish time and then select the activities.

## Input:
- Number of activities
- _n_ lines contain details of activities such as name, start and finish time

## Output:
Name of activites that are selected separated by a space

## Code:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Activity {
  string name;
  int start, finish;
};

bool compareFinishTime(const Activity& a, const Activity& b) {
  return a.finish < b.finish;
}

void selectActivities(vector<Activity>& activities, int n, vector<Activity>& selected, int lastFinishTime) {
  if (n==0) return;
  int nextActivity =-1;
  for (int i=0; i<activities.size(); i++) {
	if (activities[i].start >= lastFinishTime) {
	  nextActivity = i;
	  break;
	}
  }

  if (nextActivity==-1) return;
  selected.push_back(activities[nextActivity]);
  selectActivities(activities, n-1, selected, activities[nextActivity].finish);
}

int main() {
  int n;
  cin >> n;
  vector<Activity> activities(n);
  for (int i=0; i<n; i++) {
	cin >> activities[i].name >> activities[i].start >> activities[i].finish;
  }
  sort(activities.begin(), activities.end(), compareFinishTime);

  vector<Activity> selected;
  selectActivities(activities, n, selected, 0);

  for (const auto& activity: selected) {
	cout << activity.name << " ";
  }
  cout << endl;
  return 0;
}
```

---

# String matching - Rabin-Karp algorithm

```cpp
#include<iostream>
using namespace std;
#include<string>
#include<math.h>
int valueOf(char ch)
{
    return (ch-'0');
}
bool check_characters(string T, string P, int s)
{
    int n,m,i;
    n = T.length();
    m = P.length();
    for(i=0;i<m;i++)
    {
        if(P[i]!=T[s+i+1])
            return false;
    }
    return true;
}
void rabin_karp_matcher(string T, string P, int d, int q)
{
    int n, m, h, p, t0, i,s;
    n = T.length();
    m = P.length();
    h = (int)pow(d,m-1)%q;
    cout<<"h value is "<<h<<endl;
    p = 0;
    t0 = 0;
    for(i=0;i<m;i++)
    {
        p = (d*p + valueOf(P[i]))%q;
        t0 = (d*t0 + valueOf(T[i]))%q;
    }
    for(s=-1;s<n-m;s++)
    {
        cout<<p<<" "<<t0<<endl;
        if(p==t0)
        {
           if (check_characters(T,P,s))
                cout<<s+1<<endl;
        }
        if(s<n-m)
            t0 = (d*(t0-valueOf(T[s+1])*h)+valueOf(T[s+m+1]))%q;
    }
}
```

---


# Rabin-Karp matching - with wildcards in pattern
Given a text string _T_ and a wildcard pattern string _P_, where the wildcard character `*` can match zero or more characters, implement a wildcard matching algorithm using the Rabin-Karp algorithm to determine if the pattern matches any substring of the text.

## Input:
- A text string _T_
- A wildcard pattern string _P_ of length `m`
- _T_ and _P_ are given on different lines.

## Output:
- Print **Match found** if the pattern string matches any substring of the text string, considering the wildcard character `*`.
- Print **No match found** otherwise.

## Eg input:
abacabadabacaba
aba*a

## Eg output:
Match found

## Code:
```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

bool wildCardMatch(const string& text, const string& pattern) {
    int n = text.length();
    int m = pattern.length();
    
    // Initialize dp table
    vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));
    dp[0][0] = true;

    // Fill the first row
    for (int j = 1; j <= m; ++j) {
        if (pattern[j - 1] == '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    // Fill the dp table
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            if (pattern[j - 1] == '*') {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            } else if (pattern[j - 1] == '?' || text[i - 1] == pattern[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[n][m];
}

int main() {
    string text, pattern;
    cout << "Enter the text string: ";
    cin >> text;
    cout << "Enter the wildcard pattern string: ";
    cin >> pattern;

    if (wildCardMatch(text, pattern)) {
        cout << "Match found" << endl;
    } else {
        cout << "No match found" << endl;
    }

    return 0;
}
```
---

# Love Diagonal Hate 3 Queen Game
Love diagonal hate 3 queen is a game in which we have to place min(m, n) queens on a mxn rectangular board. The rows and columns are numbered from 1 to m and 1 to n resp. We cannot place a queen on a cell if sum if their row and column indices is divisible by 3, eg: (1, 2), (5, 1) etc. A queen is attacked by another queen if they are on the same row or in the same column. For example, if the dimensions of the rectangular board is 4x5, then one of the solution is:

	1 0 0 0 0
	0 1 0 0 0
	0 0 0 1 0
	0 0 1 0 0

There are 6 such possible solutions for this board dimension. Given the dimension of the rectangular board, develop a recursive algorithm using backtracking technique to find different solutions.

## Input:
- 1st line contains number of rows `m`
- 2nd line contains number of cols `n`

## Output:
- Number of solutions

## Code:
```cpp
#include <iostream>
#include <vector>
using namespace std;

int m, n;

bool isSafe(int row, int col, vector<vector<int>>& board) {
 if ((row+1 + col+1) % 3==0) {
    return false;
 }

 for (int i=0; i<row; i++) {
    if (board[i][col] == 1) return false;
 }
 return true;
}

void printBoard(vector<vector<int>>& board) {
 for (const auto& row : board) {
    for (int val : row) {
      cout << val << " ";
    }
    cout << endl;
 }
 cout << "------------------------" << endl;
}

void place(int row, vector<vector<int>>& board) {
 if (row == min(m, n)) {
    printBoard(board); // Print the board configuration
    return;
 }

 for (int col=0; col<n; col++) {
    if (isSafe(row, col, board)) {
      board[row][col] = 1;
      place(row+1, board);
      board[row][col] = 0; // backtracking
    }
 }
}

int main() {
 cin >> m >> n;
 vector<vector<int>> board(m, vector<int>(n, 0));
 place(0, board);
 return 0;
}
```

--- 

# Convex Hull Construction

Given a set of points in the 2D plane, compute the convex hull of the points.

## Input:
- The first line contains an integer 𝑁, the number of points.
- 𝑁 lines follow, each containing two integers 𝑥 and 𝑦, the coordinates of a point.

## Output:
- The convex hull in counter-clockwise order.

## Sample Input:
6

1 1

2 2

2 4

3 3

4 2

4 4

## Sample Output:
1 1

2 2

4 2

4 4

2 4

## Code:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    int x, y;
};

// Returns cross product of vectors p1p2 and p1p3
int crossProduct(const Point &p1, const Point &p2, const Point &p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

// Sort points lexicographically first by x-coordinate and then by y-coordinate
bool compare(const Point &p1, const Point &p2) {
    return (p1.x < p2.x) || (p1.x == p2.x && p1.y < p2.y);
}

// Computes the convex hull of a set of points
vector<Point> convexHull(vector<Point> &points) {
    int n = points.size();
    sort(points.begin(), points.end(), compare);

    vector<Point> hull;
    // Lower hull
    for (int i = 0; i < n; ++i) {
        while (hull.size() >= 2 && crossProduct(hull[hull.size() - 2], hull[hull.size() - 1], points[i]) <= 0)
            hull.pop_back();
        hull.push_back(points[i]);
    }

    // Upper hull
    for (int i = n - 2, t = hull.size() + 1; i >= 0; --i) {
        while (hull.size() >= t && crossProduct(hull[hull.size() - 2], hull[hull.size() - 1], points[i]) <= 0)
            hull.pop_back();
        hull.push_back(points[i]);
    }

    // Remove duplicate points
    hull.pop_back();
    if (hull.size() > 1 && hull.front().x == hull.back().x && hull.front().y == hull.back().y)
        hull.pop_back();

    return hull;
}

int main() {
    int n;
    cin >> n;
    vector<Point> points(n);
    for (int i = 0; i < n; ++i)
        cin >> points[i].x >> points[i].y;

    vector<Point> convexH = convexHull(points);
    for (const auto &point: convexH)
        cout << point.x << " " << point.y << endl;
    return 0;
}
```

---

# Intersecting segments problem

## Input:
- `n` - number of line segments
- Each line consists of _a1_, _b1_, _a2_, _b2_, where the line segment is (a1, b1) -> (a2, b2).

## Output:
- List of all intersecting points in a separate line each.

## Code:
```cpp
#include <iostream>
#include <vector>

using namespace std;

struct Point {
    double x, y;
};

struct Segment {
    Point start, end;
};

double crossProduct(const Point& a, const Point& b, const Point& c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

bool onSegment(const Point& p, const Point& q, const Point& r) {
    return q.x <= max(p.x, r.x) && q.x >= min(p.x, r.x) &&
           q.y <= max(p.y, r.y) && q.y >= min(p.y, r.y);
}

bool intersect(const Segment& s1, const Segment& s2, Point& intersection) {
    double d1 = crossProduct(s1.start, s1.end, s2.start);
    double d2 = crossProduct(s1.start, s1.end, s2.end);
    double d3 = crossProduct(s2.start, s2.end, s1.start);
    double d4 = crossProduct(s2.start, s2.end, s1.end);

    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
        double t = d1 / (d1 - d2);
        intersection.x = s2.start.x + t * (s2.end.x - s2.start.x);
        intersection.y = s2.start.y + t * (s2.end.y - s2.start.y);
        return true;
    }

    if (d1 == 0 && onSegment(s1.start, s2.start, s1.end)) {
        intersection = s2.start;
        return true;
    }
    if (d2 == 0 && onSegment(s1.start, s2.end, s1.end)) {
        intersection = s2.end;
        return true;
    }
    if (d3 == 0 && onSegment(s2.start, s1.start, s2.end)) {
        intersection = s1.start;
        return true;
    }
    if (d4 == 0 && onSegment(s2.start, s1.end, s2.end)) {
        intersection = s1.end;
        return true;
    }

    return false;
}

int main() {
    int n;
    cout << "Enter the number of line segments: ";
    cin >> n;

    vector<Segment> segments(n);
    cout << "Enter the endpoints of each line segment (x1 y1 x2 y2):" << endl;
    for (int i = 0; i < n; ++i) {
        cin >> segments[i].start.x >> segments[i].start.y >> segments[i].end.x >> segments[i].end.y;
    }

    vector<Point> intersections;
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            Point intersection;
            if (intersect(segments[i], segments[j], intersection)) {
                intersections.push_back(intersection);
            }
        }
    }

    if (!intersections.empty()) {
        cout << "Intersecting points found:" << endl;
        for (const Point& p : intersections) {
            cout << "(" << p.x << ", " << p.y << ")" << endl;
        }
    } else {
        cout << "No intersecting points found." << endl;
    }

    return 0;
}
```

---

# Closest pair of points
Given a set of _n_ points in a 2D plane, find the pair of points with the smallest Euclidean distance between them.

## Input:
- The input consists of an integer _n_ (2≤ _n_ ≤ 10^5) representing the number of points.
- _n_ lines follow, each containing two space-separated floating-point numbers _x_ and _y_ representing the coordinates of the points.

## Output:
- Two space-separated pairs of floating-point numbers representing the coordinates of the two points that have the smallest Euclidean distance between them.

## Code:
```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <limits>

using namespace std;

struct Point {
    double x, y;
};

double euclideanDistance(const Point& p1, const Point& p2) {
    return sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

bool sortByX(const Point& a, const Point& b) {
    return a.x < b.x;
}

bool sortByY(const Point& a, const Point& b) {
    return a.y < b.y;
}

pair<Point, Point> closestPairUtil(const vector<Point>& pointsSortedByX, const vector<Point>& pointsSortedByY) {
    int n = pointsSortedByX.size();

    if (n <= 3) {
        double minDist = numeric_limits<double>::max();
        pair<Point, Point> closestPair;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                double dist = euclideanDistance(pointsSortedByX[i], pointsSortedByX[j]);
                if (dist < minDist) {
                    minDist = dist;
                    closestPair = {pointsSortedByX[i], pointsSortedByX[j]};
                }
            }
        }
        return closestPair;
    }

    int mid = n / 2;
    vector<Point> leftX(pointsSortedByX.begin(), pointsSortedByX.begin() + mid);
    vector<Point> rightX(pointsSortedByX.begin() + mid, pointsSortedByX.end());

    vector<Point> leftY, rightY;
    for (const Point& p : pointsSortedByY) {
        if (p.x <= pointsSortedByX[mid].x)
            leftY.push_back(p);
        else
            rightY.push_back(p);
    }

    pair<Point, Point> leftClosest = closestPairUtil(leftX, leftY);
    pair<Point, Point> rightClosest = closestPairUtil(rightX, rightY);

    double minDist = min(euclideanDistance(leftClosest.first, leftClosest.second),
                         euclideanDistance(rightClosest.first, rightClosest.second));
    pair<Point, Point> closestPair = minDist == euclideanDistance(leftClosest.first, leftClosest.second) ? leftClosest : rightClosest;

    vector<Point> strip;
    double midX = pointsSortedByX[mid].x;
    for (const Point& p : pointsSortedByY) {
        if (abs(p.x - midX) < minDist)
            strip.push_back(p);
    }

    int stripSize = strip.size();
    for (int i = 0; i < stripSize; ++i) {
        for (int j = i + 1; j < min(i + 7, stripSize); ++j) {
            double dist = euclideanDistance(strip[i], strip[j]);
            if (dist < minDist) {
                minDist = dist;
                closestPair = {strip[i], strip[j]};
            }
        }
    }

    return closestPair;
}

pair<Point, Point> closestPair(vector<Point>& points) {
    vector<Point> pointsSortedByX = points;
    vector<Point> pointsSortedByY = points;
    sort(pointsSortedByX.begin(), pointsSortedByX.end(), sortByX);
    sort(pointsSortedByY.begin(), pointsSortedByY.end(), sortByY);
    return closestPairUtil(pointsSortedByX, pointsSortedByY);
}

int main() {
    int n;
    cout << "Enter the number of points: ";
    cin >> n;

    vector<Point> points(n);
    cout << "Enter the coordinates of each point (x y):" << endl;
    for (int i = 0; i < n; ++i) {
        cin >> points[i].x >> points[i].y;
    }

    pair<Point, Point> closest = closestPair(points);
    cout << "Closest pair of points: (" << closest.first.x << ", " << closest.first.y << ") and (" 
         << closest.second.x << ", " << closest.second.y << ")" << endl;

    return 0;
}
```

---

# KMP Algorithm

## Code:
```cpp
// C++ program for implementation of KMP pattern searching
// algorithm

#include <bits/stdc++.h>

void computeLPSArray(char* pat, int M, int* lps);

// Prints occurrences of pat[] in txt[]
void KMPSearch(char* pat, char* txt)
{
	int M = strlen(pat);
	int N = strlen(txt);

	// create lps[] that will hold the longest prefix suffix
	// values for pattern
	int lps[M];

	// Preprocess the pattern (calculate lps[] array)
	computeLPSArray(pat, M, lps);

	int i = 0; // index for txt[]
	int j = 0; // index for pat[]
	while ((N - i) >= (M - j)) {
		if (pat[j] == txt[i]) {
			j++;
			i++;
		}

		if (j == M) {
			printf("Found pattern at index %d ", i - j);
			j = lps[j - 1];
		}

		// mismatch after j matches
		else if (i < N && pat[j] != txt[i]) {
			// Do not match lps[0..lps[j-1]] characters,
			// they will match anyway
			if (j != 0)
				j = lps[j - 1];
			else
				i = i + 1;
		}
	}
}

// Fills lps[] for given pattern pat[0..M-1]
void computeLPSArray(char* pat, int M, int* lps)
{
	// length of the previous longest prefix suffix
	int len = 0;

	lps[0] = 0; // lps[0] is always 0

	// the loop calculates lps[i] for i = 1 to M-1
	int i = 1;
	while (i < M) {
		if (pat[i] == pat[len]) {
			len++;
			lps[i] = len;
			i++;
		}
		else // (pat[i] != pat[len])
		{
			// This is tricky. Consider the example.
			// AAACAAAA and i = 7. The idea is similar
			// to search step.
			if (len != 0) {
				len = lps[len - 1];

				// Also, note that we do not increment
				// i here
			}
			else // if (len == 0)
			{
				lps[i] = 0;
				i++;
			}
		}
	}
}

// Driver code
int main()
{
	char txt[] = "ABABDABACDABABCABAB";
	char pat[] = "ABABCABAB";
	KMPSearch(pat, txt);
	return 0;
}
```
---

# Rabin-Karp - CLRS

## Code:
```cpp
/* Following program is a C++ implementation of Rabin Karp
Algorithm given in the CLRS book */
#include <bits/stdc++.h>
using namespace std;

// d is the number of characters in the input alphabet
#define d 256

/* pat -> pattern
	txt -> text
	q -> A prime number
*/
void search(char pat[], char txt[], int q)
{
	int M = strlen(pat);
	int N = strlen(txt);
	int i, j;
	int p = 0; // hash value for pattern
	int t = 0; // hash value for txt
	int h = 1;

	// The value of h would be "pow(d, M-1)%q"
	for (i = 0; i < M - 1; i++)
		h = (h * d) % q;

	// Calculate the hash value of pattern and first
	// window of text
	for (i = 0; i < M; i++) {
		p = (d * p + pat[i]) % q;
		t = (d * t + txt[i]) % q;
	}

	// Slide the pattern over text one by one
	for (i = 0; i <= N - M; i++) {

		// Check the hash values of current window of text
		// and pattern. If the hash values match then only
		// check for characters one by one
		if (p == t) {
			/* Check for characters one by one */
			for (j = 0; j < M; j++) {
				if (txt[i + j] != pat[j]) {
					break;
				}
			}

			// if p == t and pat[0...M-1] = txt[i, i+1,
			// ...i+M-1]

			if (j == M)
				cout << "Pattern found at index " << i
					<< endl;
		}

		// Calculate hash value for next window of text:
		// Remove leading digit, add trailing digit
		if (i < N - M) {
			t = (d * (t - txt[i] * h) + txt[i + M]) % q;

			// We might get negative value of t, converting
			// it to positive
			if (t < 0)
				t = (t + q);
		}
	}
}

/* Driver code */
int main()
{
	char txt[] = "GEEKS FOR GEEKS";
	char pat[] = "GEEK";

	// we mod to avoid overflowing of value but we should
	// take as big q as possible to avoid the collison
	int q = INT_MAX;

	// Function Call
	search(pat, txt, q);
	return 0;
}
```

---

# Longest common subsequence - LCS

## Input:
- OldSite:GeeksforGeeks.org
- NewSite:GeeksQuiz.com

## Output:
Length of Longest Common Substring is 10

Longest Common Substring is: Site:Geeks

## Code:
```cpp
#include <iostream>
#include <string.h>
using namespace std;

// Function to find the length of the longest common substring
// and also print the longest common substring
void LCSubStr(char* X, char* Y, int m, int n) {
    int LCSuff[m + 1][n + 1];
    int result = 0; // To store length of the longest common substring
    int end = 0; // To store the ending index of the longest common substring in X

    // Following steps build LCSuff[m+1][n+1] in bottom up fashion.
    for (int i = 0; i <= m; i++) 
    {
        for (int j = 0; j <= n; j++) 
        {
            if (i == 0 || j == 0)
                LCSuff[i][j] = 0;
            else if (X[i - 1] == Y[j - 1]) {
                LCSuff[i][j] = LCSuff[i - 1][j - 1] + 1;
                if (LCSuff[i][j] > result) {
                    result = LCSuff[i][j];
                    end = i - 1; // Update the ending index of the longest common substring
                }
            }
            else
                LCSuff[i][j] = 0;
        }
    }

    // Print the longest common substring
    cout << "Length of Longest Common Substring is " << result << endl;
    cout << "Longest Common Substring is: ";
    for (int i = end - result + 1; i <= end; i++)
        cout << X[i];
    cout << endl;
}

// Driver code
int main()
{
    char X[] = "OldSite:GeeksforGeeks.org";
    char Y[] = "NewSite:GeeksQuiz.com";

    int m = strlen(X);
    int n = strlen(Y);

    LCSubStr(X, Y, m, n);
    return 0;
}
```
---

# Levenshtein algorithm - edit distance between 2 strings

## Input:
- String _a_
- String _b_

## Output:
- Edit distance
- Steps to edit

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
using namespace std;

const int MAX_N = 1000;

// Function to calculate the length of the Longest Common Subsequence (LCS)
int lcs_length(char X[], char Y[], int n, int m, string& operations)
{
    int dp[n + 1][m + 1];

    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= m; j++) {
            if (i == 0 || j == 0)
                dp[i][j] = 0;
            else if (X[i - 1] == Y[j - 1])
                dp[i][j] = 1 + dp[i - 1][j - 1];
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    // Track the individual operations
    int i = n, j = m;
    while (i > 0 && j > 0) {
        if (X[i - 1] == Y[j - 1]) {
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            operations += "Delete '" + string(1, X[i - 1]) + "' from first string\n";
            i--;
        } else {
            if (dp[i - 1][j - 1] + 1 == dp[i][j]) {
                operations += "Replace '" + string(1, X[i - 1]) + "' in first string with '" + string(1, Y[j - 1]) + "'\n";
                i--;
                j--;
            } else {
                operations += "Insert '" + string(1, Y[j - 1]) + "' into first string\n";
                j--;
            }
        }
    }

    while (i > 0) {
        operations += "Delete '" + string(1, X[i - 1]) + "' from first string\n";
        i--;
    }

    while (j > 0) {
        operations += "Insert '" + string(1, Y[j - 1]) + "' into first string\n";
        j--;
    }

    reverse(operations.end(), operations.begin());

    return dp[n][m];
}

// Function to calculate Levenshtein Distance
int levenshtein_distance(char X[], char Y[], int n, int m, string& operations)
{
    // Length of LCS
    int lcs_len = lcs_length(X, Y, n, m, operations);

    // Levenshtein Distance = sum of lengths of both strings - 2 * length of LCS
    return (n + m - 2 * lcs_len);
}

// Main function
int main()
{
    char X[] = "kitten";
    char Y[] = "sitting";
    int n = strlen(X);
    int m = strlen(Y);

    // Track the individual operations
    string operations = "";

    // Calculate Levenshtein Distance and get operations
    int distance = levenshtein_distance(X, Y, n, m, operations);

    cout << "Levenshtein Distance: " << distance << endl;
    cout << "Operations to modify string:" << endl << operations;

    return 0;
}
```

---

# Maximum sum subarray problem

## Input:
- Elements of array

## Output:
- Maximum sum of subarray
- Subarray which produces max sum

## Code:
```cpp
#include <iostream>
#include <vector>
#include <limits>
using namespace std;

// Function to find the maximum sum crossing subarray
int maxCrossingSum(vector<int>& arr, int low, int mid, int high, int& leftIndex, int& rightIndex) {
    int leftSum = numeric_limits<int>::min();
    int rightSum = numeric_limits<int>::min();
    
    int sum = 0;
    int maxLeftIndex = mid;
    for (int i = mid; i >= low; --i) {
        sum += arr[i];
        if (sum > leftSum) {
            leftSum = sum;
            maxLeftIndex = i;
        }
    }
    
    sum = 0;
    int maxRightIndex = mid + 1;
    for (int i = mid + 1; i <= high; ++i) {
        sum += arr[i];
        if (sum > rightSum) {
            rightSum = sum;
            maxRightIndex = i;
        }
    }
    
    leftIndex = maxLeftIndex;
    rightIndex = maxRightIndex;
    
    return leftSum + rightSum;
}

// Function to find the maximum sum subarray using divide-and-conquer
int maxSubarraySum(vector<int>& arr, int low, int high, int& leftIndex, int& rightIndex) {
    if (low == high) {
        leftIndex = low;
        rightIndex = high;
        return arr[low];
    }
    
    int mid = low + (high - low) / 2;
    
    int leftLow, leftHigh, rightLow, rightHigh, crossLow, crossHigh;
    int leftMax = maxSubarraySum(arr, low, mid, leftLow, leftHigh);
    int rightMax = maxSubarraySum(arr, mid + 1, high, rightLow, rightHigh);
    int crossingMax = maxCrossingSum(arr, low, mid, high, crossLow, crossHigh);
    
    if (leftMax >= rightMax && leftMax >= crossingMax) {
        leftIndex = leftLow;
        rightIndex = leftHigh;
        return leftMax;
    } else if (rightMax >= leftMax && rightMax >= crossingMax) {
        leftIndex = rightLow;
        rightIndex = rightHigh;
        return rightMax;
    } else {
        leftIndex = crossLow;
        rightIndex = crossHigh;
        return crossingMax;
    }
}

// Main function
int main() {
    vector<int> arr = {2, -3, 4, -1, -2, 1, 5, -3};
    int n = arr.size();
    
    int leftIndex, rightIndex;
    int maxSum = maxSubarraySum(arr, 0, n - 1, leftIndex, rightIndex);
    
    cout << "Maximum sum subarray: ";
    for (int i = leftIndex; i <= rightIndex; ++i) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    cout << "Sum of maximum sum subarray: " << maxSum << endl;
    
    return 0;
}
```

## Code (Kadane):
```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find the maximum sum subarray using Kadane's algorithm
int maxSubarraySum(vector<int>& arr, int& leftIndex, int& rightIndex) {
    int maxSum = arr[0];
    int currentSum = arr[0];
    leftIndex = 0;
    int tempIndex = 0;

    for (int i = 1; i < arr.size(); ++i) {
        if (arr[i] > currentSum + arr[i]) {
            currentSum = arr[i];
            tempIndex = i;
        } else {
            currentSum += arr[i];
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
            leftIndex = tempIndex;
            rightIndex = i;
        }
    }

    return maxSum;
}

// Main function
int main() {
    vector<int> arr = {2, -3, 4, -1, -2, 1, 5, -3};
    int n = arr.size();
    
    int leftIndex, rightIndex;
    int maxSum = maxSubarraySum(arr, leftIndex, rightIndex);
    
    cout << "Maximum sum subarray: ";
    for (int i = leftIndex; i <= rightIndex; ++i) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    cout << "Sum of maximum sum subarray: " << maxSum << endl;
    
    return 0;
}
```

---

# Matrix Chain multiplication

## Code:
```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

void printParentheses(vector<vector<int>>& bracket, int i, int j, char& name) {
    if (i == j) {
        cout << name++;
        return;
    }
    cout << "(";
    printParentheses(bracket, i, bracket[i][j], name);
    printParentheses(bracket, bracket[i][j] + 1, j, name);
    cout << ")";
}

void matrixChainOrder(vector<pair<int, int>>& matrices) {
    int n = matrices.size();
    vector<vector<int>> dp(n, vector<int>(n, INT_MAX));
    vector<vector<int>> bracket(n, vector<int>(n, -1));
    for (int i = 1; i < n; ++i) dp[i][i] = 0;
    for (int len = 2; len < n; ++len) {
        for (int i = 1; i < n - len + 1; ++i) {
            int j = i + len - 1;
            for (int k = i; k < j; ++k) {
                int cost = dp[i][k] + dp[k + 1][j] + matrices[i - 1].first * matrices[k].second * matrices[j].second;
                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                    bracket[i][j] = k;
                }
            }
        }
    }
    cout << "Minimum number of scalar multiplications: " << dp[1][n - 1] << endl;
    cout << "Order of multiplication: ";
    char name = 'A';
    printParentheses(bracket, 1, n - 1, name);
    cout << endl;
}

int main() {
    vector<pair<int, int>> matrices = {{30, 35}, {35, 15}, {15, 5}, {5, 10}, {10, 20}, {20, 25}};
    matrixChainOrder(matrices);
    return 0;
}
```

---

# Subset Sum problem
Given a set of non-negative integers and a value sum, the task is to check if there is a subset of the given set whose sum is equal to the given sum. 

## Code:
```cpp
// A Dynamic Programming solution
// for subset sum problem
#include <bits/stdc++.h>
using namespace std;

// Returns true if there is a subset of set[]
// with sum equal to given sum
bool isSubsetSum(int set[], int n, int sum)
{
    // The value of subset[i][j] will be true if
    // there is a subset of set[0..j-1] with sum
    // equal to i
    bool subset[n + 1][sum + 1];

    // If sum is 0, then answer is true
    for (int i = 0; i <= n; i++)
        subset[i][0] = true;

    // If sum is not 0 and set is empty,
    // then answer is false
    for (int i = 1; i <= sum; i++)
        subset[0][i] = false;

    // Fill the subset table in bottom up manner
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= sum; j++) {
            if (j < set[i - 1])
                subset[i][j] = subset[i - 1][j];
            if (j >= set[i - 1])
                subset[i][j] = subset[i - 1][j] || subset[i - 1][j - set[i - 1]];
        }
    }

    return subset[n][sum];
}

// Driver code
int main()
{
    int set[] = { 3, 34, 4, 12, 5, 2 };
    int sum = 9;
    int n = sizeof(set) / sizeof(set[0]);
    if (isSubsetSum(set, n, sum) == true)
        cout << "Found a subset with given sum";
    else
        cout << "No subset with given sum";
    return 0;
}
```

# Fractional Knapsack problem

## Code - greedy:
```cpp
// C++ program to solve fractional Knapsack Problem

#include <bits/stdc++.h>
using namespace std;

// Structure for an item which stores weight and
// corresponding value of Item
struct Item {
	int profit, weight;

	// Constructor
	Item(int profit, int weight)
	{
		this->profit = profit;
		this->weight = weight;
	}
};

// Comparison function to sort Item 
// according to profit/weight ratio
static bool cmp(struct Item a, struct Item b)
{
	double r1 = (double)a.profit / (double)a.weight;
	double r2 = (double)b.profit / (double)b.weight;
	return r1 > r2;
}

// Main greedy function to solve problem
double fractionalKnapsack(int W, struct Item arr[], int N)
{
	// Sorting Item on basis of ratio
	sort(arr, arr + N, cmp);

	double finalvalue = 0.0;

	// Looping through all items
	for (int i = 0; i < N; i++) {
		
		// If adding Item won't overflow, 
		// add it completely
		if (arr[i].weight <= W) {
			W -= arr[i].weight;
			finalvalue += arr[i].profit;
		}

		// If we can't add current Item, 
		// add fractional part of it
		// REMOVE TO MAKE IT 0/1 KNAPSACK PROBLEM
		else {
			finalvalue
				+= arr[i].profit
				* ((double)W / (double)arr[i].weight);
			break;
		}
	}

	// Returning final value
	return finalvalue;
}

// Driver code
int main()
{
	int W = 50;
	Item arr[] = { { 60, 10 }, { 100, 20 }, { 120, 30 } };
	int N = sizeof(arr) / sizeof(arr[0]);

	// Function call
	cout << fractionalKnapsack(W, arr, N);
	return 0;
}
```

---

# Graph colouring problem
Graph coloring refers to the problem of coloring vertices of a graph in such a way that no two adjacent vertices have the same color. This is also called the vertex coloring problem. If coloring is done using at most m colors, it is called m-coloring.

## Code:
```cpp
// C++ program for solution of M
// Coloring problem using backtracking

#include <bits/stdc++.h>
using namespace std;

// Number of vertices in the graph
#define V 4

void printSolution(int color[]);

/* A utility function to check if
   the current color assignment
   is safe for vertex v i.e. checks
   whether the edge exists or not
   (i.e, graph[v][i]==1). If exist
   then checks whether the color to
   be filled in the new vertex(c is
   sent in the parameter) is already
   used by its adjacent
   vertices(i-->adj vertices) or
   not (i.e, color[i]==c) */
bool isSafe(int v, bool graph[V][V], int color[], int c)
{
    for (int i = 0; i < V; i++)
        if (graph[v][i] && c == color[i])
            return false;

    return true;
}

/* A recursive utility function
to solve m coloring problem */
bool graphColoringUtil(bool graph[V][V], int m, int color[],
                       int v)
{

    /* base case: If all vertices are
       assigned a color then return true */
    if (v == V)
        return true;

    /* Consider this vertex v and
       try different colors */
    for (int c = 1; c <= m; c++) {

        /* Check if assignment of color
           c to v is fine*/
        if (isSafe(v, graph, color, c)) {
            color[v] = c;

            /* recur to assign colors to
               rest of the vertices */
            if (graphColoringUtil(graph, m, color, v + 1)
                == true)
                return true;

            /* If assigning color c doesn't
               lead to a solution then remove it */
            color[v] = 0;
        }
    }

    /* If no color can be assigned to
       this vertex then return false */
    return false;
}

/* This function solves the m Coloring
   problem using Backtracking. It mainly
   uses graphColoringUtil() to solve the
   problem. It returns false if the m
   colors cannot be assigned, otherwise
   return true and prints assignments of
   colors to all vertices. Please note
   that there may be more than one solutions,
   this function prints one of the
   feasible solutions.*/
bool graphColoring(bool graph[V][V], int m)
{

    // Initialize all color values as 0.
    // This initialization is needed
    // correct functioning of isSafe()
    int color[V];
    for (int i = 0; i < V; i++)
        color[i] = 0;

    // Call graphColoringUtil() for vertex 0
    if (graphColoringUtil(graph, m, color, 0) == false) {
        cout << "Solution does not exist";
        return false;
    }

    // Print the solution
    printSolution(color);
    return true;
}

/* A utility function to print solution */
void printSolution(int color[])
{
    cout << "Solution Exists:"
         << " Following are the assigned colors"
         << "\n";
    for (int i = 0; i < V; i++)
        cout << " " << color[i] << " ";

    cout << "\n";
}

// Driver code
int main()
{

    /* Create following graph and test
       whether it is 3 colorable
      (3)---(2)
       |   / |
       |  /  |
       | /   |
      (0)---(1)
    */
    bool graph[V][V] = {
        { 0, 1, 1, 1 },
        { 1, 0, 1, 0 },
        { 1, 1, 0, 1 },
        { 1, 0, 1, 0 },
    };

    // Number of colors
    int m = 3;

    // Function call
    graphColoring(graph, m);
    return 0;
}
```

# M-colouring problem
Given an undirected graph and a number m, the task is to color the given graph with at most m colors such that no two adjacent vertices of the graph are colored with the same color

Note: Here coloring of a graph means the assignment of colors to all vertices

## Code:
```cpp
// C++ program for solution of M
// Coloring problem using backtracking

#include <bits/stdc++.h>
using namespace std;

// Number of vertices in the graph
#define V 4

void printSolution(int color[]);

/* A utility function to check if
the current color assignment
is safe for vertex v i.e. checks
whether the edge exists or not
(i.e, graph[v][i]==1). If exist
then checks whether the color to
be filled in the new vertex(c is
sent in the parameter) is already
used by its adjacent
vertices(i-->adj vertices) or
not (i.e, color[i]==c) */
bool isSafe(int v, bool graph[V][V], int color[], int c)
{
	for (int i = 0; i < V; i++)
		if (graph[v][i] && c == color[i])
			return false;

	return true;
}

/* A recursive utility function
to solve m coloring problem */
bool graphColoringUtil(bool graph[V][V], int m, int color[],
					int v)
{

	/* base case: If all vertices are
	assigned a color then return true */
	if (v == V)
		return true;

	/* Consider this vertex v and
	try different colors */
	for (int c = 1; c <= m; c++) {

		/* Check if assignment of color
		c to v is fine*/
		if (isSafe(v, graph, color, c)) {
			color[v] = c;

			/* recur to assign colors to
			rest of the vertices */
			if (graphColoringUtil(graph, m, color, v + 1)
				== true)
				return true;

			/* If assigning color c doesn't
			lead to a solution then remove it */
			color[v] = 0;
		}
	}

	/* If no color can be assigned to
	this vertex then return false */
	return false;
}

/* This function solves the m Coloring
problem using Backtracking. It mainly
uses graphColoringUtil() to solve the
problem. It returns false if the m
colors cannot be assigned, otherwise
return true and prints assignments of
colors to all vertices. Please note
that there may be more than one solutions,
this function prints one of the
feasible solutions.*/
bool graphColoring(bool graph[V][V], int m)
{

	// Initialize all color values as 0.
	// This initialization is needed
	// correct functioning of isSafe()
	int color[V];
	for (int i = 0; i < V; i++)
		color[i] = 0;

	// Call graphColoringUtil() for vertex 0
	if (graphColoringUtil(graph, m, color, 0) == false) {
		cout << "Solution does not exist";
		return false;
	}

	// Print the solution
	printSolution(color);
	return true;
}

/* A utility function to print solution */
void printSolution(int color[])
{
	cout << "Solution Exists:"
		<< " Following are the assigned colors"
		<< "\n";
	for (int i = 0; i < V; i++)
		cout << " " << color[i] << " ";

	cout << "\n";
}

// Driver code
int main()
{

	/* Create following graph and test
	whether it is 3 colorable
	(3)---(2)
	| / |
	| / |
	| / |
	(0)---(1)
	*/
	bool graph[V][V] = {
		{ 0, 1, 1, 1 },
		{ 1, 0, 1, 0 },
		{ 1, 1, 0, 1 },
		{ 1, 0, 1, 0 },
	};

	// Number of colors
	int m = 3;

	// Function call
	graphColoring(graph, m);
	return 0;
}

// This code is contributed by Shivani
```

---

# Hamiltonian Cycle
Hamiltonian Cycle or Circuit in a graph G is a cycle that visits every vertex of G exactly once and returns to the starting vertex. If graph contains a Hamiltonian cycle, it is called Hamiltonian graph otherwise it is non-Hamiltonian. Finding a Hamiltonian Cycle in a graph is a well-known NP-complete problem, which means that there’s no known efficient algorithm to solve it for all types of graphs. However, it can be solved for small or specific types of graphs. The Hamiltonian Cycle problem has practical applications in various fields, such as logistics, network design, and computer science.

## Code:
```cpp
/* C++ program for solution of Hamiltonian 
Cycle problem using backtracking */
#include <bits/stdc++.h>
using namespace std;

// Number of vertices in the graph 
#define V 5 

void printSolution(int path[]); 

/* A utility function to check if 
the vertex v can be added at index 'pos' 
in the Hamiltonian Cycle constructed 
so far (stored in 'path[]') */
bool isSafe(int v, bool graph[V][V], 
			int path[], int pos) 
{ 
	/* Check if this vertex is an adjacent 
	vertex of the previously added vertex. */
	if (graph [path[pos - 1]][ v ] == 0) 
		return false; 

	/* Check if the vertex has already been included. 
	This step can be optimized by creating
	an array of size V */
	for (int i = 0; i < pos; i++) 
		if (path[i] == v) 
			return false; 

	return true; 
} 

/* A recursive utility function 
to solve hamiltonian cycle problem */
bool hamCycleUtil(bool graph[V][V], 
				int path[], int pos) 
{ 
	/* base case: If all vertices are 
	included in Hamiltonian Cycle */
	if (pos == V) 
	{ 
		// And if there is an edge from the 
		// last included vertex to the first vertex 
		if (graph[path[pos - 1]][path[0]] == 1) 
			return true; 
		else
			return false; 
	} 

	// Try different vertices as a next candidate 
	// in Hamiltonian Cycle. We don't try for 0 as 
	// we included 0 as starting point in hamCycle() 
	for (int v = 1; v < V; v++) 
	{ 
		/* Check if this vertex can be added 
		// to Hamiltonian Cycle */
		if (isSafe(v, graph, path, pos)) 
		{ 
			path[pos] = v; 

			/* recur to construct rest of the path */
			if (hamCycleUtil (graph, path, pos + 1) == true) 
				return true; 

			/* If adding vertex v doesn't lead to a solution, 
			then remove it */
			path[pos] = -1; 
		} 
	} 

	/* If no vertex can be added to 
	Hamiltonian Cycle constructed so far, 
	then return false */
	return false; 
} 

/* This function solves the Hamiltonian Cycle problem 
using Backtracking. It mainly uses hamCycleUtil() to 
solve the problem. It returns false if there is no 
Hamiltonian Cycle possible, otherwise return true 
and prints the path. Please note that there may be 
more than one solutions, this function prints one 
of the feasible solutions. */
bool hamCycle(bool graph[V][V]) 
{ 
	int *path = new int[V]; 
	for (int i = 0; i < V; i++) 
		path[i] = -1; 

	/* Let us put vertex 0 as the first vertex in the path.
	If there is a Hamiltonian Cycle, then the path can be 
	started from any point of the cycle as the graph is undirected */
	path[0] = 0; 
	if (hamCycleUtil(graph, path, 1) == false ) 
	{ 
		cout << "\nSolution does not exist"; 
		return false; 
	} 

	printSolution(path); 
	return true; 
} 

/* A utility function to print solution */
void printSolution(int path[]) 
{ 
	cout << "Solution Exists:"
			" Following is one Hamiltonian Cycle \n"; 
	for (int i = 0; i < V; i++) 
		cout << path[i] << " "; 

	// Let us print the first vertex again
	// to show the complete cycle 
	cout << path[0] << " "; 
	cout << endl;
} 

// Driver Code 
int main() 
{ 
	/* Let us create the following graph 
		(0)--(1)--(2) 
		|	 / \ | 
		| /	 \ | 
		| /	 \ | 
		(3)-------(4) */
	bool graph1[V][V] = {{0, 1, 0, 1, 0}, 
						{1, 0, 1, 1, 1}, 
						{0, 1, 0, 0, 1}, 
						{1, 1, 0, 0, 1}, 
						{0, 1, 1, 1, 0}}; 
	
	// Print the solution 
	hamCycle(graph1); 
	
	/* Let us create the following graph 
		(0)--(1)--(2) 
		|	 / \ | 
		| /	 \ | 
		| /	 \ | 
		(3)	 (4) */
	bool graph2[V][V] = {{0, 1, 0, 1, 0}, 
						{1, 0, 1, 1, 1}, 
						{0, 1, 0, 0, 1}, 
						{1, 1, 0, 0, 0}, 
						{0, 1, 1, 0, 0}}; 

	// Print the solution 
	hamCycle(graph2); 

	return 0; 
} 

// This is code is contributed by rathbhupendra
```

# Huffman Encoding

## Code:
```cpp
// C++(STL) program for Huffman Coding with STL 
#include <bits/stdc++.h> 
using namespace std; 

// A Huffman tree node 
struct MinHeapNode { 

	// One of the input characters 
	char data; 

	// Frequency of the character 
	unsigned freq; 

	// Left and right child 
	MinHeapNode *left, *right; 

	MinHeapNode(char data, unsigned freq) 

	{ 

		left = right = NULL; 
		this->data = data; 
		this->freq = freq; 
	} 
}; 

// For comparison of 
// two heap nodes (needed in min heap) 
struct compare { 

	bool operator()(MinHeapNode* l, MinHeapNode* r) 

	{ 
		return (l->freq > r->freq); 
	} 
}; 

// Prints huffman codes from 
// the root of Huffman Tree. 
void printCodes(struct MinHeapNode* root, string str) 
{ 

	if (!root) 
		return; 

	if (root->data != '$') 
		cout << root->data << ": " << str << "\n"; 

	printCodes(root->left, str + "0"); 
	printCodes(root->right, str + "1"); 
} 

// The main function that builds a Huffman Tree and 
// print codes by traversing the built Huffman Tree 
void HuffmanCodes(char data[], int freq[], int size) 
{ 
	struct MinHeapNode *left, *right, *top; 

	// Create a min heap & inserts all characters of data[] 
	priority_queue<MinHeapNode*, vector<MinHeapNode*>, 
				compare> 
		minHeap; 

	for (int i = 0; i < size; ++i) 
		minHeap.push(new MinHeapNode(data[i], freq[i])); 

	// Iterate while size of heap doesn't become 1 
	while (minHeap.size() != 1) { 

		// Extract the two minimum 
		// freq items from min heap 
		left = minHeap.top(); 
		minHeap.pop(); 

		right = minHeap.top(); 
		minHeap.pop(); 

		// Create a new internal node with 
		// frequency equal to the sum of the 
		// two nodes frequencies. Make the 
		// two extracted node as left and right children 
		// of this new node. Add this node 
		// to the min heap '$' is a special value 
		// for internal nodes, not used 
		top = new MinHeapNode('$', 
							left->freq + right->freq); 

		top->left = left; 
		top->right = right; 

		minHeap.push(top); 
	} 

	// Print Huffman codes using 
	// the Huffman tree built above 
	printCodes(minHeap.top(), ""); 
} 

// Driver Code 
int main() 
{ 

	char arr[] = { 'a', 'b', 'c', 'd', 'e', 'f' }; 
	int freq[] = { 5, 9, 12, 13, 16, 45 }; 

	int size = sizeof(arr) / sizeof(arr[0]); 

	HuffmanCodes(arr, freq, size); 

	return 0; 
} 

// This code is contributed by Aditya Goel
```

---

# Longest increasing subsequence
## Code:
```cpp
// Dynamic Programming C++ implementation
// of LIS problem
#include <bits/stdc++.h>
using namespace std;

// lis() returns the length of the longest
// increasing subsequence in arr[] of size n
int lis(int arr[], int n)
{
	int lis[n];

	lis[0] = 1;

	// Compute optimized LIS values in
	// bottom up manner
	for (int i = 1; i < n; i++) {
		lis[i] = 1;
		for (int j = 0; j < i; j++)
			if (arr[i] > arr[j] && lis[i] < lis[j] + 1)
				lis[i] = lis[j] + 1;
	}

	// Return maximum value in lis[]
	return *max_element(lis, lis + n);
}

// Driver program to test above function
int main()
{
	int arr[] = { 10, 22, 9, 33, 21, 50, 41, 60 };
	int n = sizeof(arr) / sizeof(arr[0]);

	// Function call
	printf("Length of lis is %d\n", lis(arr, n));
	return 0;
}
```

# Activity selection - minimum number of time slots
Given a set of activities, each with a start time and a finish time, the goal is to find the minimum number of time slots needed to accommodate all the activities. Activities may overlap, but you can't perform two activities simultaneously in the same slot.

## Input:
- A set of activities represented as a vector of pairs, where each pair consists of a start time and a finish time.

## Output:
- An integer representing the minimum number of time slots needed to accommodate all activities.

## Code:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Structure to represent an activity
struct Activity {
    int start, finish;
};

// Function to compare activities based on their finish time
bool activityCompare(const Activity& a, const Activity& b) {
    return (a.finish < b.finish);
}

// Function to find the minimum number of slots needed
int findMinimumSlots(vector<Activity>& activities) {
    // Sort activities based on their finish times
    sort(activities.begin(), activities.end(), activityCompare);

    int slots = 1; // Initialize the number of slots needed
    int last_finish_time = activities[0].finish;

    // Iterate through the activities
    for (int i = 1; i < activities.size(); i++) {
        // If the current activity's start time is after the last activity's finish time,
        // then it can be accommodated in the same slot
        if (activities[i].start >= last_finish_time) {
            last_finish_time = activities[i].finish; // Update last finish time
        } else {
            // If the current activity overlaps with the previous one,
            // then it needs a new slot
            slots++;
        }
    }

    return slots;
}

int main() {
    // Example usage
    vector<Activity> activities = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
    int minSlots = findMinimumSlots(activities);
    cout << "Minimum number of slots needed: " << minSlots << endl;
    return 0;
}
```

---

# Sudoku solver - 9x9 sudoku

## Code:
```cpp
#include <iostream>
#include <vector>

using namespace std;

bool isSafe(vector<vector<int>>& board, int row, int col, int num) {
    // Check the row
    for (int x = 0; x <= 8; x++)
        if (board[row][x] == num)
            return false;

    // Check the column
    for (int x = 0; x <= 8; x++)
        if (board[x][col] == num)
            return false;

    // Check the box
    int startRow = row - row % 3, startCol = col - col % 3;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (board[i + startRow][j + startCol] == num)
                return false;

    return true;
}

bool solveSudoku(vector<vector<int>>& board, int row, int col) {
    if (row == 8 && col == 9)
        return true;

    if (col == 9) {
        row++;
        col = 0;
    }

    if (board[row][col] > 0)
        return solveSudoku(board, row, col + 1);

    for (int num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board, row, col + 1))
                return true;
        }

        board[row][col] = 0;
    }
    return false;
}

void printSudoku(vector<vector<int>>& board) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++)
            cout << board[i][j] << " ";
        cout << endl;
    }
}

int main() {
    vector<vector<int>> board = {
        {5, 3, 0, 0, 7, 0, 0, 0, 0},
        {6, 0, 0, 1, 9, 5, 0, 0, 0},
        {0, 9, 8, 0, 0, 0, 0, 6, 0},
        {8, 0, 0, 0, 6, 0, 0, 0, 3},
        {4, 0, 0, 8, 0, 3, 0, 0, 1},
        {7, 0, 0, 0, 2, 0, 0, 0, 6},
        {0, 6, 0, 0, 0, 0, 2, 8, 0},
        {0, 0, 0, 4, 1, 9, 0, 0, 5},
        {0, 0, 0, 0, 8, 0, 0, 7, 9}
    };

    if (solveSudoku(board, 0, 0))
        printSudoku(board);
    else
        cout << "No solution exists" << endl;

    return 0;
}
```
